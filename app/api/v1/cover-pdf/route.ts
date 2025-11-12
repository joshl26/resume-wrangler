// app/api/cover-pdf/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import chrome from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { Buffer } from "buffer";
import type * as PuppeteerNamespace from "puppeteer-core";
import { withRateLimit } from "@/app/lib/rateLimit";

async function coverPdfHandler(req: NextRequest) {
  const params: Record<string, string> = {};
  for (const [k, v] of req.nextUrl.searchParams.entries()) {
    params[k] = v;
  }

  const coverLetterId = params.coverLetterId;
  const userEmail = params.userEmail;

  if (!coverLetterId) {
    return NextResponse.json(
      { message: "no coverLetterId provided" },
      { status: 400 },
    );
  }
  if (!userEmail) {
    return NextResponse.json(
      { message: "no userEmail provided" },
      { status: 400 },
    );
  }

  const sanitizedCoverId = coverLetterId.trim();
  const sanitizedEmail = userEmail.trim().toLowerCase();

  let browser: PuppeteerNamespace.Browser | null = null;

  try {
    const isAws = Boolean(process.env.AWS_REGION);

    const options: PuppeteerNamespace.LaunchOptions = isAws
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath(
            "https://github.com/Sparticuz/chromium/releases/download/v119.0.2/chromium-v119.0.2-pack.tar",
          ),
          headless: true,
        }
      : {
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
          ],
          executablePath:
            process.env.CHROME_PATH ?? "/usr/bin/chromium-browser",
        };

    browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    page.setDefaultTimeout(15000);
    await page.setViewport({ width: 1200, height: 800 });

    const baseUrl =
      process.env.DEPLOYMENT_URL ??
      `http://localhost:${process.env.PORT ?? 3000}`;
    const targetUrl = `${baseUrl}/cover-letter/${encodeURIComponent(sanitizedCoverId)}/${encodeURIComponent(sanitizedEmail)}`;

    await page.setExtraHTTPHeaders({
      "X-API-Key": process.env.INTERNAL_API_KEY || "development-key",
    });

    await page.goto(targetUrl, { waitUntil: "networkidle0", timeout: 15000 });
    await page.emulateMediaType("print");

    try {
      await page.evaluate(() =>
        Promise.race([
          document.fonts.ready,
          new Promise((res) => setTimeout(res, 3000)),
        ]),
      );
    } catch {
      /* ignore */
    }

    // Get PDF as Buffer
    const rawPdf = await page.pdf({
      displayHeaderFooter: false,
      format: "letter",
      printBackground: true,
      margin: { top: "0.4in", right: "0.4in", bottom: "0.4in", left: "0.4in" },
    });

    // Ensure we have a Node Buffer
    const pdfBuffer = Buffer.from(rawPdf);

    // Close browser early
    await browser.close();
    browser = null;

    // Convert to Uint8Array for Response body (ArrayBufferView)
    const uint8 = new Uint8Array(pdfBuffer);

    return new Response(uint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="cover-${sanitizedCoverId}.pdf"`,
        "Content-Length": String(pdfBuffer.byteLength),
        "Cache-Control": "public, max-age=3600",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
      },
    });
  } catch (error: any) {
    console.error("Cover PDF generation error:", {
      message: error.message,
      stack: error.stack,
      coverLetterId: sanitizedCoverId,
    });

    try {
      if (browser) await browser.close();
    } catch (closeErr) {
      console.error("Failed closing browser:", closeErr);
    }

    const status = error.message?.includes("timeout") ? 408 : 500;
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Please try again later",
      },
      { status },
    );
  }
}

export const GET = withRateLimit(coverPdfHandler, 10, 900);

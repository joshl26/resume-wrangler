// app/api/pdf/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import chrome from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { Buffer } from "buffer";
import type * as PuppeteerNamespace from "puppeteer-core";
import { withRateLimit } from "@/app/lib/rateLimit";

async function pdfHandler(req: NextRequest) {
  const params: Record<string, string> = {};
  for (const [k, v] of req.nextUrl.searchParams.entries()) {
    params[k] = v;
  }

  const resumeId = params.resumeId;
  const userEmail = params.userEmail;

  if (!resumeId) {
    return NextResponse.json(
      { message: "no resumeId provided" },
      { status: 400 },
    );
  }
  if (!userEmail) {
    return NextResponse.json(
      { message: "no userEmail provided" },
      { status: 400 },
    );
  }

  const sanitizedResumeId = String(resumeId).trim();
  const sanitizedUserEmail = String(userEmail).trim().toLowerCase();

  let browser: PuppeteerNamespace.Browser | null = null;

  try {
    const isAws = Boolean(process.env.AWS_REGION);

    const launchOptions: PuppeteerNamespace.LaunchOptions = isAws
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
            "--hide-scrollbars",
            "--disable-extensions",
            "--disable-background-timer-throttling",
          ],
          executablePath:
            process.env.CHROME_PATH ?? "/usr/bin/chromium-browser",
        };

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // Reasonable timeouts & viewport
    page.setDefaultTimeout(20000);
    await page.setViewport({ width: 1200, height: 900 });

    // Optional internal header for authenticated fetches (use in production only if safe)
    const internalKey = process.env.INTERNAL_API_KEY;
    if (internalKey) {
      await page.setExtraHTTPHeaders({ "X-API-Key": internalKey });
    }

    const baseUrl =
      process.env.DEPLOYMENT_URL ??
      `http://localhost:${process.env.PORT ?? 3000}`;
    const targetUrl = `${baseUrl}/resume/${encodeURIComponent(sanitizedResumeId)}/${encodeURIComponent(sanitizedUserEmail)}`;

    await page.goto(targetUrl, { waitUntil: "networkidle0", timeout: 20000 });

    await page.emulateMediaType("print");

    // Wait for fonts (but don't hang forever)
    try {
      await page.evaluate(() =>
        // Wait for document.fonts.ready or 3s fallback
        Promise.race([
          document.fonts?.ready ?? Promise.resolve(),
          new Promise((r) => setTimeout(r, 3000)),
        ]),
      );
    } catch {
      // ignore font timing errors
    }

    const rawPdf = await page.pdf({
      displayHeaderFooter: false,
      format: "letter",
      printBackground: true,
      margin: { top: "0.4in", right: "0.4in", bottom: "0.4in", left: "0.4in" },
    });

    // Normalize to Node Buffer, then to Uint8Array (ArrayBufferView) for Response
    const pdfBuffer = Buffer.from(rawPdf);
    const uint8 = new Uint8Array(pdfBuffer);

    // Close browser before sending response
    await browser.close();
    browser = null;

    return new Response(uint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="resume-${sanitizedResumeId}.pdf"`,
        "Content-Length": String(pdfBuffer.byteLength),
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=60",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
      },
    });
  } catch (error: any) {
    console.error("pdf generation error:", {
      message: error?.message ?? String(error),
      resumeId: sanitizedResumeId,
      userEmail: sanitizedUserEmail,
    });

    try {
      if (browser) await browser.close();
    } catch (closeErr) {
      console.error("failed closing browser:", closeErr);
    }

    const status = String(error?.message ?? "")
      .toLowerCase()
      .includes("timeout")
      ? 408
      : 500;
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        message:
          process.env.NODE_ENV === "development"
            ? error?.message
            : "Please try again later",
      },
      { status },
    );
  }
}

// Moderate rate limiting: 10 requests per 15 minutes (adjust as needed)
export const GET = withRateLimit(pdfHandler, 10, 900);

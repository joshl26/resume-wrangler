export const runtime = "nodejs";

// app/api/pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import chrome from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import type * as PuppeteerNamespace from "puppeteer-core";

export async function GET(req: NextRequest) {
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
            "--autoplay-policy=user-gesture-required",
            "--disable-background-networking",
            "--disable-background-timer-throttling",
            "--disable-backgrounding-occluded-windows",
            "--disable-breakpad",
            "--disable-client-side-phishing-detection",
            "--disable-component-update",
            "--disable-default-apps",
            "--disable-dev-shm-usage",
            "--disable-domain-reliability",
            "--disable-extensions",
            "--disable-features=AudioServiceOutOfProcess",
            "--disable-hang-monitor",
            "--disable-ipc-flooding-protection",
            "--disable-notifications",
            "--disable-offer-store-unmasked-wallet-cards",
            "--disable-popup-blocking",
            "--disable-print-preview",
            "--disable-prompt-on-repost",
            "--disable-renderer-backgrounding",
            "--disable-setuid-sandbox",
            "--disable-speech-api",
            "--disable-sync",
            "--hide-scrollbars",
            "--ignore-gpu-blacklist",
            "--metrics-recording-only",
            "--mute-audio",
            "--no-default-browser-check",
            "--no-first-run",
            "--no-pings",
            "--no-sandbox",
            "--no-zygote",
            "--password-store=basic",
            "--use-gl=swiftshader",
            "--use-mock-keychain",
          ],
          executablePath:
            process.env.CHROME_PATH ??
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        };

    browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    const baseUrl =
      process.env.DEPLOYMENT_URL ??
      `http://localhost:${process.env.PORT ?? 3000}`;
    const targetUrl = `${baseUrl}/resume/${encodeURIComponent(resumeId)}/${encodeURIComponent(
      userEmail,
    )}`;

    await page.goto(targetUrl, { waitUntil: "networkidle0" });

    await page.emulateMediaType("print");

    try {
      await page.evaluateHandle("document.fonts.ready");
    } catch {
      // ignore if not supported
    }

    const buffer = await page.pdf({
      displayHeaderFooter: false,
      format: "letter",
      printBackground: true,
    });

    // Close browser before building the response
    await browser.close();
    browser = null;

    // Convert buffer to plain ArrayBuffer to avoid SharedArrayBuffer typing issues
    const uint8 = buffer as Uint8Array;
    const copy = Uint8Array.from(uint8); // new copy backed by plain ArrayBuffer
    const arrayBuffer = copy.buffer;

    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        // optional: force download
        // "Content-Disposition": `attachment; filename="resume-${resumeId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("pdf generation error:", error);
    try {
      if (browser) await browser.close();
    } catch (closeErr) {
      console.error("failed closing browser:", closeErr);
    }
    return NextResponse.json(
      { error: (error as Error).message ?? String(error) },
      { status: 500 },
    );
  }
}

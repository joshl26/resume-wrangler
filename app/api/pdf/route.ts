// export const maxDuration = 60; // This function can run for a maximum of 5 seconds

// import Chromium from "chrome-aws-lambda";
import { NextRequest } from "next/server";
// import { PuppeteerNode } from "puppeteer";

import chrome from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

// export const dynamic = "force-dynamic";
// export const runtime = "edge";
//   puppeteer = require("puppeteer-core");
// import chrome from "chrome-aws-lambda";
// import puppeteer from "puppeteer-core";
// import puppeteer from "puppeteer";

// let chrome = { args: "", defaultViewport: null, executablePath: "" };
// let puppeteer: PuppeteerNode;

// console.log(process.env.DEPLOY === "true");

// if (process.env.DEPLOY == "true") {
//   // running on the Vercel platform.
//   chrome = require("chrome-aws-lambda");
//   puppeteer = require("puppeteer-core");
// } else {
//   // running locally.
//   puppeteer = require("puppeteer");
// }

//TODO simpler way of doing below, consider implementing
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const bodyFont = searchParams.get("bodyFont");

export async function GET(req: NextRequest) {
  const executablePath = await chrome.executablePath;

  // console.log(executablePath);

  let params: any = {};
  for (const [key, val] of req.nextUrl.searchParams.entries()) {
    params[key] = val;
  }

  try {
    const resumeId = params.resumeId as string;
    const userEmail = params.userEmail as string;

    const options = process.env.AWS_REGION
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath(
            "https://github.com/Sparticuz/chromium/releases/download/v119.0.2/chromium-v119.0.2-pack.tar"
          ),
          headless: true,
          ignoreHTTPSErrors: true,
        }
      : {
          headless: true,
          ignoreHTTPSErrors: true,
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
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        };

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    // await page.setUserAgent(
    //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    // );

    //   // await page.goto("http://localhost:3000/login");

    //   // await page.type("#email", "user@nextmail.com");
    //   // await page.type("#password", "123456");

    //   // await page.click("#submit");

    //   // await page.waitForNavigation(); // <------------------------- Wait for Navigation

    await page.goto(
      `${process.env.DEPLOYMENT_URL}/resume/${resumeId}/${userEmail}`,
      // `http://localhost:3000/resume/${resumeId}/${userEmail}`,

      {
        waitUntil: "networkidle0",
      }
    );

    await page.emulateMediaType("print");

    await page.evaluateHandle("document.fonts.ready");

    const buffer = await page.pdf({
      displayHeaderFooter: false,
      // format: "a4",
      format: "letter",
      printBackground: true,
    });

    browser.close();

    return new Response(buffer, { headers: { "content-type": "image/png" } });

    // Close browser **after** we returned the PDF to the caller.
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}

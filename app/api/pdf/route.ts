import { NextRequest } from "next/server";
import { PuppeteerNode } from "puppeteer";

// import puppeteer from "puppeteer";

let chrome = { args: "", defaultViewport: null, executablePath: "" };
let puppeteer: PuppeteerNode;

console.log(process.env.DEPLOY === "true");

if (process.env.DEPLOY == "true") {
  // running on the Vercel platform.
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  // running locally.
  puppeteer = require("puppeteer");
}

//TODO simpler way of doing below, consider implementing
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const bodyFont = searchParams.get("bodyFont");

export async function GET(req: NextRequest) {
  // console.log(req.nextUrl.searchParams);

  // let params: any = {};
  // for (const [key, val] of req.nextUrl.searchParams.entries()) {
  //   params[key] = val;
  // }

  try {
    //   const resumeId = params.resumeId as string;
    //   const userEmail = params.userEmail as string;

    //   const browser = await puppeteer.launch({
    //     // headless: true,
    //     // args: [
    //     //   "--no-sandbox",
    //     //   "--disable-web-security",
    //     //   "--font-render-hinting=none",
    //     //   "--force-color-profile=srgb",
    //     // ],
    //     args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
    //     defaultViewport: chrome.defaultViewport,
    //     executablePath: chrome.executablePath,
    //     headless: true,
    //     ignoreHTTPSErrors: true,
    //   });
    //   const page = await browser.newPage();
    //   await page.setUserAgent(
    //     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    //   );

    //   // await page.goto("http://localhost:3000/login");

    //   // await page.type("#email", "user@nextmail.com");
    //   // await page.type("#password", "123456");

    //   // await page.click("#submit");

    //   // await page.waitForNavigation(); // <------------------------- Wait for Navigation

    //   await page.goto(
    //     `http://${process.env.DEPLOYMENT_URL}/resume/${resumeId}/${userEmail}`,
    //     {
    //       waitUntil: "networkidle0",
    //     }
    //   );

    //   await page.emulateMediaType("print");

    //   await page.evaluateHandle("document.fonts.ready");

    //   const buffer = await page.pdf({
    //     displayHeaderFooter: false,
    //     // format: "a4",
    //     format: "letter",
    //     printBackground: true,
    //   });

    //   browser.close();

    return new Response("", { headers: { "content-type": "image/png" } });

    // Close browser **after** we returned the PDF to the caller.
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}

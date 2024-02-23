import { NextApiHandler } from "next";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

const pt = process.argv[2];
const widthPt = pt;
const heightPt = pt;

export async function GET(req: Request) {
  const pt = process.argv[2];
  const widthPt = pt;
  const heightPt = pt;

  try {
    console.log(pt);

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-web-security",
        "--font-render-hinting=none",
        "--force-color-profile=srgb",
      ],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    );
    // set the HTTP Basic Authentication credential

    await page.goto("http://localhost:3000/login");

    await page.type("#email", "user@nextmail.com");
    await page.type("#password", "123456");

    await page.click("#submit");

    await page.waitForNavigation(); // <------------------------- Wait for Navigation

    await page.goto("http://localhost:3000/dashboard/resume-templates", {
      waitUntil: "networkidle0",
    });

    await page.addStyleTag({
      url: "https://fonts.googleapis.com/css2?family=Roboto",
    });

    const items = await page.$eval("#resume", (element) => {
      return element.innerHTML;
    }); // Get DOM HTML elements

    await page.setContent(items);

    // await page.addStyleTag({ url: "../../ui/templates/Page.css" });

    await page.emulateMediaType("print");

    await page.evaluateHandle("document.fonts.ready");

    // // Create PDF Buffer
    const buffer = await page.pdf({
      displayHeaderFooter: false,
      landscape: false,
      format: "letter",
      preferCSSPageSize: true,
      printBackground: true,
    });
    // // Return pdf buffer to caller.
    // console.log(NextResponse.json({ buffer: buffer }));

    browser.close();

    // return Response.json(buffer);

    return new Response(buffer, { headers: { "content-type": "image/png" } });

    // return NextResponse.end(buffer);

    // Close browser **after** we returned the PDF to the caller.
  } catch (error) {}
  // await browser.close();

  // return Response.end(buffer);
}

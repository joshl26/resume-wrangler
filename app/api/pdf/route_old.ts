import puppeteer from "puppeteer";

export async function GET(req: Request) {
  try {
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

    await page.goto("http://localhost:3000/login");

    await page.type("#email", "user@nextmail.com");
    await page.type("#password", "123456");

    await page.click("#submit");

    await page.waitForNavigation(); // <------------------------- Wait for Navigation

    await page.goto("http://localhost:3000/dashboard/resume-templates", {
      waitUntil: "networkidle0",
    });

    const items = await page.$eval("#resume", (element) => {
      return element.innerHTML;
    });

    await page.setContent(items);

    await page.emulateMediaType("screen");

    // await page.addStyleTag({
    //   path: "./fonts/test.woff2",
    // });

    await page.evaluateHandle("document.fonts.ready");

    // await page.screenshot();

    const buffer = await page.pdf({
      displayHeaderFooter: false,
      landscape: false,
      format: "letter",
      preferCSSPageSize: true,
      printBackground: true,
    });

    browser.close();

    return new Response(buffer, { headers: { "content-type": "image/png" } });

    // Close browser **after** we returned the PDF to the caller.
  } catch (error) {}
}

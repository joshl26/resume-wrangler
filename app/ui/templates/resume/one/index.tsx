import type { NextPage } from "next";
import Page from "../../Page";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const One: NextPage = () => {
  return (
    <>
      <a href="/api/pdf" download="generated_pdf.pdf" className="downloadBtn">
        Download PDF
      </a>
      <div id="resume">
        <Page>
          <h1
            className={roboto.className}
            style={{
              fontSize: "1rem",
              fontWeight: "400",
              fontStyle: "normal",
            }}
          >
            Generated PDF
          </h1>
          <p>As you can see you can scroll without issues and select text.</p>
          <div
            style={{ width: "100px", height: "100px", backgroundColor: "red" }}
          ></div>
          <a href="http://www.google.ca">
            <p>Test Link</p>
          </a>
        </Page>
        <Page>
          <h1>Page 2</h1>
          <p>As you can see you can scroll without issues and select text.</p>
        </Page>
      </div>
    </>
  );
};

export default One;

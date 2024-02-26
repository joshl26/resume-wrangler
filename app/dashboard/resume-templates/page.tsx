"use client";

import { Suspense, useState } from "react";

import { resumeTemplates, bodyFonts, headerFonts } from "../../data/data";
import { user } from "../../data/user-details";
import Classic from "../../ui/resume/classic/page";
// import Cubic from "./components/templates/resume/cubic/page";

export default function ClassicResume() {
  const [headingFont, setHeadingFont] = useState("font-quicksand");
  const [bodyFont, setBodyFont] = useState("font-quicksand");
  const [resumeTemplate, setResumeTemplate] = useState("classic");

  const bodyFontAction = (e: any) => {
    setBodyFont(e.target.value);
  };

  const headerFontAction = (e: any) => {
    setHeadingFont(e.target.value);
  };

  const resumeTemplateAction = (e: any) => {
    setResumeTemplate(e.target.value);
  };

  return (
    <main className="flex w-full">
      <div className="flex flex-row w-full overflow-auto">
        <div className="flex flex-col h-full overflow-scroll px-6 fixed">
          <a
            href={`/api/pdf?bodyFont=${bodyFont}&headerFont=${headingFont}`}
            download="generated_pdf.pdf"
            className="downloadBtn"
          >
            Download PDF
          </a>
          <div>
            <div className="flex flex-col">
              <label htmlFor="header-font">Choose a Heading Font:</label>
              <select
                value={headingFont}
                onChange={(e) => headerFontAction(e)}
                name="header-font"
                id="header-font"
              >
                {headerFonts.map((font) => {
                  return (
                    <option
                      className={font.name}
                      key={font.id}
                      value={font.name}
                    >
                      {font.description}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="header-font">Choose a Body Font:</label>
              <select
                value={bodyFont}
                onChange={(e) => bodyFontAction(e)}
                name="header-font"
                id="header-font"
              >
                {bodyFonts.map((font) => {
                  return (
                    <option
                      className={font.name}
                      key={font.id}
                      value={font.name}
                    >
                      {font.description}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="resume-templates">
                Choose a Resume Template:
              </label>
              <select
                value={resumeTemplate}
                onChange={(e) => resumeTemplateAction(e)}
                name="resume-templates"
                id="resume-templates"
              >
                {resumeTemplates.map((resume) => {
                  return (
                    <option
                      className={resume.name}
                      key={resume.id}
                      value={resume.name}
                    >
                      {resume.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col m-auto">
          {resumeTemplate === "classic" && (
            <Suspense>
              <Classic
                headingFont={headingFont}
                bodyFont={bodyFont}
                user={user}
              />
            </Suspense>
          )}
        </div>
      </div>
    </main>
  );
}

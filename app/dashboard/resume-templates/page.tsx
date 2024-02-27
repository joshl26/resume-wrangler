"use client";

import { Suspense, useState } from "react";

import { resumeTemplates, bodyFonts, headerFonts } from "../../data/data";
import { user } from "../../data/user-details";
import Classic from "../../ui/resume/classic/page";
// import Cubic from "./components/templates/resume/cubic/page";

const colors = [
  {
    id: 1,
    name: "White",
    color: "bg-white",
  },
  {
    id: 2,
    name: "Dark Grey",
    color: "bg-slate-400",
  },
  {
    id: 3,
    name: "Pink",
    color: "bg-pink-300",
  },
  {
    id: 4,
    name: "Red",
    color: "bg-red-400",
  },
  {
    id: 5,
    name: "Orange",
    color: "bg-orange-300",
  },
  {
    id: 6,
    name: "Yellow",
    color: "bg-yellow-200",
  },
  {
    id: 7,
    name: "Green",
    color: "bg-emerald-400",
  },
  {
    id: 8,
    name: "Blue",
    color: "bg-cyan-500",
  },
];

export default function ClassicResume() {
  const [headingFont, setHeadingFont] = useState("font-quicksand");
  const [bodyFont, setBodyFont] = useState("font-quicksand");
  const [resumeTemplate, setResumeTemplate] = useState("classic");
  const [resumeTitle, setResumeTitle] = useState("");
  const [resumeColor, setResumeColor] = useState("white");

  const bodyFontAction = (e: { target: HTMLSelectElement }) => {
    setBodyFont(e.target.value);
  };

  const headerFontAction = (e: { target: HTMLSelectElement }) => {
    setHeadingFont(e.target.value);
  };

  const resumeTemplateAction = (e: { target: HTMLSelectElement }) => {
    setResumeTemplate(e.target.value);
  };

  const setColor = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget.id;
    console.log(target);
    setResumeColor(target);
  };

  return (
    <main className="flex w-full">
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full overflow-scroll px-6 w-1/2 ">
          <div className="">
            <div className="py-2 font-bold text-xl">
              <h2>Resume Styling</h2>
            </div>
            <div className="border-[1px] border-slate-300 rounded px-5 py-2 ">
              <div className="flex flex-col py-1">
                <label className="py-1" htmlFor="header-font">
                  Resume Title
                </label>
                <input
                  className="rounded bg-slate-200"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  placeholder="Resume Title"
                ></input>
              </div>
              <div className="flex flex-col py-1">
                <label className="py-1" htmlFor="resume-template">
                  Resume Template
                </label>
                <select
                  className="rounded bg-amber-300"
                  value={resumeTemplate}
                  onChange={(e) => resumeTemplateAction(e)}
                  name="resume-template"
                  id="resume-template"
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
              <div className="flex flex-col">
                <div className="py-1 flex flex-col">
                  <label className="py-1" htmlFor="header-font">
                    Colors
                  </label>
                  <div className="flex flex-row justify-around">
                    {colors.map((color) => (
                      <div
                        style={{ cursor: "pointer" }}
                        key={color.id}
                        id={color.name}
                        onClick={(e) => setColor(e)}
                        className={`rounded-[16px] border-2 border-black h-8 w-8 ${color.color} hover:-translate-y-1 duration-500`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="py-1 flex flex-col">
                  <label className="py-1" htmlFor="header-font">
                    Heading Font
                  </label>
                  <select
                    className={`${headingFont} rounded`}
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
              </div>
              <div className="flex flex-col py-1">
                <label className="py-1" htmlFor="header-font">
                  Body Font
                </label>
                <select
                  className={`${bodyFont} rounded`}
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

              <div style={{ height: "0.5rem" }}></div>
            </div>
          </div>
          <div className="p-2 text-center">
            <a
              href={`/api/pdf?bodyFont=${bodyFont}&headerFont=${headingFont}`}
              download="generated_pdf.pdf"
              className="downloadBtn"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div className="flex flex-col h-full w-full m-auto overflow-scroll right-0">
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

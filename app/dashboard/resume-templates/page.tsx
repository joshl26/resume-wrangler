"use client";

import { Suspense, useState } from "react";

import {
  resumeTemplates,
  bodyFonts,
  headerFonts,
  colors,
} from "../../data/data";
import { user } from "../../data/user-details";
import Classic from "../../ui/resume/classic/page";
// import Cubic from "./components/templates/resume/cubic/page";

export default function ClassicResume() {
  const [resumeStyling, setResumeStyling] = useState({
    resumeTitle: "",
    resumeTemplate: "classic",
    headingFont: "font-quicksand",
    bodyFont: "font-quicksand",
    color: "white",
  });

  const resumeTitleAction = (e: { target: HTMLInputElement }) => {
    let updatedValue = {};

    updatedValue = { resumeTitle: e.target.value };

    setResumeStyling((resumeStyling) => ({
      ...resumeStyling,
      ...updatedValue,
    }));
  };

  const bodyFontAction = (e: { target: HTMLSelectElement }) => {
    let updatedValue = {};

    updatedValue = { bodyFont: e.target.value };

    setResumeStyling((resumeStyling) => ({
      ...resumeStyling,
      ...updatedValue,
    }));
  };

  const headerFontAction = (e: { target: HTMLSelectElement }) => {
    let updatedValue = {};

    updatedValue = { headingFont: e.target.value };

    setResumeStyling((resumeStyling) => ({
      ...resumeStyling,
      ...updatedValue,
    }));
  };

  const resumeTemplateAction = (e: { target: HTMLSelectElement }) => {
    let updatedValue = {};

    updatedValue = { resumeTemplate: e.target.value };

    setResumeStyling((resumeStyling) => ({
      ...resumeStyling,
      ...updatedValue,
    }));
  };

  const colorAction = (e: React.MouseEvent<HTMLDivElement>) => {
    let updatedValue = {};

    updatedValue = { color: e.currentTarget.id };

    setResumeStyling((resumeStyling) => ({
      ...resumeStyling,
      ...updatedValue,
    }));
  };

  return (
    <main className="flex w-full">
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full overflow-scroll px-6 w-1/2 ">
          <div className="resume-styling">
            <div className="py-2 font-bold text-xl">
              <h2>Resume Styling</h2>
            </div>
            <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
              <div className="flex flex-col py-1">
                <label className="py-1" htmlFor="header-font">
                  Resume Title
                </label>
                <input
                  className="rounded bg-slate-200"
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
                  placeholder="Resume Title"
                ></input>
              </div>
              <div className="flex flex-col py-1">
                <label className="py-1" htmlFor="resume-template">
                  Resume Template
                </label>
                <select
                  className="rounded bg-amber-300"
                  value={resumeStyling.resumeTemplate}
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
                        onClick={(e) => colorAction(e)}
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
                    className={`${resumeStyling.headingFont} rounded`}
                    value={resumeStyling.headingFont}
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
                  className={`${resumeStyling.bodyFont} rounded`}
                  value={resumeStyling.bodyFont}
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
          <div className="your-profile">
            <div className="py-2 font-bold text-xl">
              <h2>Your Profile</h2>
            </div>

            <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
              <div className="flex flex-col py-1">
                <label className="py-1" htmlFor="header-font">
                  First Name
                </label>
                <input
                  className="rounded bg-slate-200"
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
                  placeholder="Resume Title"
                ></input>
              </div>
              <div className="flex flex-col py-1">
                <label className="py-1" htmlFor="resume-template">
                  Resume Template
                </label>
                <select
                  className="rounded bg-amber-300"
                  value={resumeStyling.resumeTemplate}
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
                        onClick={(e) => colorAction(e)}
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
                    className={`${resumeStyling.headingFont} rounded`}
                    value={resumeStyling.headingFont}
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
                  className={`${resumeStyling.bodyFont} rounded`}
                  value={resumeStyling.bodyFont}
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
              href={`/api/pdf?bodyFont=${resumeStyling.bodyFont}&headerFont=${resumeStyling.headingFont}`}
              download="generated_pdf.pdf"
              className="downloadBtn"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div className="flex flex-col h-full w-full m-auto overflow-scroll right-0">
          {resumeStyling.resumeTemplate === "classic" && (
            <Suspense>
              <Classic
                headingFont={resumeStyling.headingFont}
                bodyFont={resumeStyling.bodyFont}
                user={user}
              />
            </Suspense>
          )}
        </div>
      </div>
    </main>
  );
}

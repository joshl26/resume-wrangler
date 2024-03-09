"use client";

import { useState } from "react";

export default function YourResumeStyling({
  resume,
  resumeTemplates,
  resumeColors,
  headerFonts,
  bodyFonts,
}: {
  resume: any;
  resumeTemplates: any;
  resumeColors: any;
  headerFonts: any;
  bodyFonts: any;
}) {
  const [edited, setEdited] = useState(false);

  console.log(resumeTemplates);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="resume-styling">
      <div className="pb-2 font-bold text-xl">
        <h2>Resume Styling</h2>
        <p>{edited === false ? "false" : "true"}</p>
      </div>
      <form className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
        <div className="flex flex-col py-1">
          <label className="py-1" htmlFor="resume-title">
            Resume Title
          </label>
          <input
            name="resume-title"
            id="resume-title"
            className="rounded bg-slate-200"
            defaultValue={resume.title}
            onChange={(e) => onChangeHandler(e)}
            placeholder="Resume Title"
          />
        </div>
        <div className="flex flex-col py-1">
          <label className="py-1" htmlFor="resume-template">
            Resume Template
          </label>
          <select
            className="rounded bg-amber-300"
            defaultValue={resume.template}
            onChange={(e) => onChangeHandler(e)}
            name="resume-template"
            id="resume-template"
          >
            {resumeTemplates.map((resume: any) => {
              return (
                <option key={resume.id} value={resume.description}>
                  {resume.name}
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
              {resumeColors.map((color: any) => (
                <div
                  style={{ cursor: "pointer" }}
                  key={color.id}
                  id={color.name}
                  onClick={(e) => onChangeHandler(e)}
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
              className={`${resume.heading_font} rounded`}
              defaultValue={resume.heading_font}
              onChange={(e) => onChangeHandler(e)}
              name="header-font"
              id="header-font"
            >
              {headerFonts.map((font: any) => {
                return (
                  <option className={font.name} key={font.id} value={font.name}>
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
            className={`${resume.body_font} rounded`}
            value={resume.body_font}
            onChange={(e) => onChangeHandler(e)}
            name="header-font"
            id="header-font"
          >
            {bodyFonts.map((font: any) => {
              return (
                <option className={font.name} key={font.id} value={font.name}>
                  {font.description}
                </option>
              );
            })}
          </select>
        </div>
        <div style={{ height: "0.5rem" }}></div>
      </form>
    </div>
  );
}

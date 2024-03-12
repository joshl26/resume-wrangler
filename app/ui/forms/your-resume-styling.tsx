"use client";

import { updateYourResumeStyle } from "@/app/lib/actions";
import { useState } from "react";

export default function YourResumeStyling({
  resume,
  resumeTemplates,
  resumeColors,
  headerFonts,
  bodyFonts,
  setSelectedResumeTemplate,
  setSelectedResumeHeadingFont,
  setSelectedResumeBodyFont,
  setSelectedResumeColor,
  selectedResumeTemplate,
  selectedResumeBodyFont,
  selectedResumeHeadingFont,
  selectedResumeColor,
}: {
  resume: any;
  resumeTemplates: any;
  resumeColors: any;
  headerFonts: any;
  bodyFonts: any;
  setSelectedResumeTemplate: (e: any) => void;
  setSelectedResumeHeadingFont: (e: any) => void;
  setSelectedResumeBodyFont: (e: any) => void;
  setSelectedResumeColor: (e: any) => void;
  selectedResumeTemplate: any;
  selectedResumeBodyFont: any;
  selectedResumeHeadingFont: any;
  selectedResumeColor: any;
}) {
  const [edited, setEdited] = useState(false);
  // const [color, setColor] = useState(resume.color);

  // console.log(resumeTemplates);

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
      <form
        action={updateYourResumeStyle}
        className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 "
      >
        <div className="flex flex-col py-1">
          <input
            hidden
            id="resume_id"
            name="resume_id"
            defaultValue={resume.id}
          />
          <label className="py-1" htmlFor="resume_title">
            Resume Title
          </label>
          <input
            name="resume_title"
            id="resume_title"
            className="rounded bg-slate-200"
            defaultValue={resume.title}
            onChange={(e) => onChangeHandler(e)}
            placeholder="Resume Title"
          />
        </div>
        <div className="flex flex-col py-1">
          <input
            hidden
            id="resume_id"
            name="resume_id"
            defaultValue={resume.id}
          />
          <label className="py-1" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="rounded bg-slate-200 h-[200px]"
            defaultValue={resume.description}
            onChange={(e) => onChangeHandler(e)}
            placeholder="Resume Description"
          />
        </div>
        <div className="flex flex-col py-1">
          <label className="py-1" htmlFor="resume_template">
            Resume Template
          </label>
          <select
            className="rounded bg-amber-300"
            defaultValue={selectedResumeTemplate}
            onChange={(e) => setSelectedResumeTemplate(e.target.value)}
            name="resume_template"
            id="resume_template"
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
            <label className="py-1" htmlFor="color">
              Colors
            </label>
            <input
              hidden
              id="color"
              name="color"
              defaultValue={selectedResumeColor}
            />
            <div className="flex flex-row justify-around">
              {resumeColors.map((color: any) => (
                <div
                  style={{ cursor: "pointer" }}
                  key={color.id}
                  id={color.color}
                  onClick={(e: any) => {
                    setSelectedResumeColor(e.target.id);
                    onChangeHandler(e);
                  }}
                  className={`rounded-[16px] border-2 border-black h-8 w-8 ${color.color} hover:-translate-y-1 duration-500`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="py-1 flex flex-col">
            <label className="py-1" htmlFor="header_font">
              Heading Font
            </label>
            <select
              className={`${resume.heading_font} rounded`}
              defaultValue={selectedResumeHeadingFont}
              onChange={(e) => setSelectedResumeHeadingFont(e.target.value)}
              name="header_font"
              id="header_font"
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
          <label className="py-1" htmlFor="body_font">
            Body Font
          </label>
          <select
            className={`${resume.body_font} rounded`}
            defaultValue={selectedResumeBodyFont}
            onChange={(e) => setSelectedResumeBodyFont(e.target.value)}
            name="body_font"
            id="body_font"
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
        {edited && <button type="submit">Save</button>}
      </form>
    </div>
  );
}

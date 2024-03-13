"use client";

import { updateYourResumeStyle } from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";

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
  setSelectedResumeHighlightColor,
  selectedResumeTemplate,
  selectedResumeBodyFont,
  selectedResumeHeadingFont,
  selectedResumeColor,
  selectedResumeHighlightColor,
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
  setSelectedResumeHighlightColor: (e: any) => void;
  selectedResumeTemplate: any;
  selectedResumeBodyFont: any;
  selectedResumeHeadingFont: any;
  selectedResumeColor: any;
  selectedResumeHighlightColor: any;
}) {
  const [edited, setEdited] = useState(false);
  // const [color, setColor] = useState(resume.color);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="resume-styling">
      <div className="pb-2 font-bold text-xl">
        <h2>Resume Styling</h2>
        {selectedResumeHighlightColor}
        {/* <p>{edited === false ? "false" : "true"}</p> */}
      </div>
      <form
        action={updateYourResumeStyle}
        onSubmit={() => setEdited(false)}
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
            onChange={(e) => onChangeHandler()}
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
            onChange={(e) => onChangeHandler()}
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
            onChange={(e) => {
              setEdited(true);
              setSelectedResumeTemplate(e.target.value);
            }}
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
                    setSelectedResumeHighlightColor(color.highlight_color);
                    setSelectedResumeColor(e.target.id);
                    onChangeHandler();
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
              onChange={(e) => {
                onChangeHandler();
                setSelectedResumeHeadingFont(e.target.value);
              }}
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
            onChange={(e) => {
              onChangeHandler();
              setSelectedResumeBodyFont(e.target.value);
            }}
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
        {edited && (
          <SubmitButton
            className={
              "bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse"
            }
          >
            Save Change
          </SubmitButton>
        )}
      </form>
    </div>
  );
}

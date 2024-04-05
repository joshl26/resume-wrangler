"use client";

import { updateYourResumeStyle } from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import {
  BodyFont,
  BodyFonts,
  HeaderFont,
  HeaderFonts,
  Resume,
  ResumeColor,
  ResumeColors,
  ResumeTemplates,
} from "@/app/lib/definitions";

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
}: {
  resume: Resume;
  resumeTemplates: ResumeTemplates;
  resumeColors: ResumeColors;
  headerFonts: HeaderFonts;
  bodyFonts: BodyFonts;
  setSelectedResumeTemplate: (e: string) => void;
  setSelectedResumeHeadingFont: (e: string) => void;
  setSelectedResumeBodyFont: (e: string) => void;
  setSelectedResumeColor: (e: string) => void;
  setSelectedResumeHighlightColor: (e: any) => void;
  selectedResumeTemplate: any;
  selectedResumeBodyFont: any;
  selectedResumeHeadingFont: any;
  selectedResumeColor: any;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="resume-styling">
      <div className="pb-2 font-bold text-xl">
        <h2 className="">Resume Styling</h2>
      </div>
      <form
        action={updateYourResumeStyle}
        onSubmit={() => setEdited(false)}
        className="tight-shadow rounded form-amber px-5 py-2 "
      >
        <div className="flex flex-col py-1">
          <input
            hidden
            id="resume_id"
            name="resume_id"
            defaultValue={resume?.id}
            readOnly
          />
          <label className="py-1 font-medium" htmlFor="resume_title">
            Resume Title
          </label>
          <input
            name="resume_title"
            id="resume_title"
            className="rounded"
            defaultValue={resume?.title}
            onChange={onChangeHandler}
            placeholder="Resume Title"
          />
        </div>
        <div className="flex flex-col py-1">
          <input
            hidden
            id="resume_id"
            name="resume_id"
            defaultValue={resume?.id}
          />
          <label className="py-1 font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="rounded h-[200px]"
            defaultValue={resume?.description}
            onChange={onChangeHandler}
            placeholder="Resume Description"
          />
        </div>
        <div className="flex flex-col py-1">
          <label className="py-1 font-medium" htmlFor="resume_template">
            Resume Template
          </label>
          <select
            className="rounded"
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
                <option
                  key={resume.id}
                  value={resume.description}
                  onChange={() => {}}
                >
                  {resume.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col">
          <div className="py-1 flex flex-col">
            <label className="py-1 font-medium" htmlFor="color">
              Colors
            </label>
            <input
              hidden
              id="color"
              name="color"
              value={selectedResumeColor}
              onChange={() => {}}
            />
            <div className="flex flex-row justify-around">
              {resumeColors?.map((color: ResumeColor) => (
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
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="py-1 flex flex-col">
            <label className="py-1 font-medium" htmlFor="header_font">
              Heading Font
            </label>
            <select
              className={`${selectedResumeHeadingFont} rounded`}
              value={selectedResumeHeadingFont}
              onChange={(e) => {
                onChangeHandler();
                setSelectedResumeHeadingFont(e.target.value);
              }}
              name="header_font"
              id="header_font"
            >
              {headerFonts.map((font: HeaderFont) => {
                return (
                  <option
                    className={font.name}
                    key={font.id}
                    value={font.name}
                    onChange={() => {}}
                  >
                    {font.description}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-col py-1">
          <label className="py-1 font-medium" htmlFor="body_font">
            Body Font
          </label>
          <select
            className={`${selectedResumeBodyFont} rounded`}
            defaultValue={selectedResumeBodyFont}
            onChange={(e) => {
              onChangeHandler();
              setSelectedResumeBodyFont(e.target.value);
            }}
            name="body_font"
            id="body_font"
          >
            {bodyFonts.map((font: BodyFont) => {
              return (
                <option
                  className={font.name}
                  key={font.id}
                  value={font.name}
                  onChange={() => {}}
                >
                  {font.description}
                </option>
              );
            })}
          </select>
        </div>
        <div style={{ height: "0.5rem" }}></div>
        {edited && (
          <SubmitButton className={"btn btn-amber my-4 animate-pulse"}>
            Save Change
          </SubmitButton>
        )}
      </form>
    </div>
  );
}

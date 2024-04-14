"use client";

import {
  updateYourCoverLetterStyle,
  updateYourResumeStyle,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import { CoverLetter } from "@/app/lib/definitions";
// import clsx from "clsx";

export default function YourCoverStyling({
  coverLetter,
}: {
  coverLetter: CoverLetter;
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
        <h2 className="">Cover Styling</h2>
      </div>
      <form
        action={updateYourCoverLetterStyle}
        onSubmit={() => setEdited(false)}
        className="tight-shadow rounded form-amber px-5 py-2 "
      >
        <div className="flex flex-col py-1">
          <input
            hidden
            id="cover_id"
            name="cover_id"
            defaultValue={""}
            readOnly
          />
          <label className="py-1 font-medium" htmlFor="recipient_title">
            Recipient Title
          </label>
          <input
            name="recipient_title"
            id="recipient_title"
            className="rounded"
            defaultValue={coverLetter?.recipient_title}
            onChange={onChangeHandler}
            placeholder="Recipient Title"
          />
        </div>
        <div className="flex flex-col py-1">
          <label className="py-1 font-medium" htmlFor="intro_text_start">
            Intro Text Start
          </label>
          <textarea
            name="intro_text_start"
            id="intro_text_start"
            className="rounded h-[75px]"
            defaultValue={coverLetter?.intro_text_start}
            onChange={onChangeHandler}
            placeholder="Intro Text Start"
          />
        </div>
        <div className="flex flex-col py-1">
          <label className="py-1 font-medium" htmlFor="intro_text_start">
            Intro Text End
          </label>
          <textarea
            name="intro_text_end"
            id="intro_text_end"
            className="rounded h-[125px]"
            defaultValue={coverLetter?.intro_text_end}
            onChange={onChangeHandler}
            placeholder="Intro Text End"
          />
        </div>
        {/* <div className="flex flex-col py-1">
          <label className="py-1 font-medium" htmlFor="resume_template">
            Cover Template
          </label>
          <select
            className="rounded"
            // defaultValue={selectedResumeTemplate}
            // onChange={(e) => {
            //   setEdited(true);
            //   setSelectedResumeTemplate(e.target.value);
            // }}
            name="resume_template"
            id="resume_template"
          >
            {/* {resumeTemplates.map((resume: any) => {
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
        </div> */}
        {/* <div className="flex flex-col">
          <div className="py-1 flex flex-col">
            <label className="py-1 font-medium" htmlFor="color">
              Colors
            </label>
            <input
              hidden
              id="color"
              name="color"
              value={""}
              onChange={() => {}}
            />
            <input
              hidden
              id="highlight_color"
              name="highlight_color"
              value={""}
              onChange={() => {}}
            />{" "}
            <div className="flex flex-row justify-around">
              {/* {resumeColors?.map((color: ResumeColor) => (
                <div
                  style={{ cursor: "pointer" }}
                  key={color?.id}
                  id={color?.color}
                  onClick={(e: any) => {
                    setSelectedResumeHighlightColor(color?.name);
                    setSelectedResumeColor(e?.target?.id);
                    onChangeHandler();
                  }}
                  className={clsx(
                    "rounded-full border-2 border-black tight-shadow h-8 w-8 hover:-translate-y-1 duration-500",
                    color?.color,
                    color?.color === selectedResumeColor && "-translate-y-1"
                  )}
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
              // className={`${selectedResumeHeadingFont} rounded`}
              // value={selectedResumeHeadingFont}
              // onChange={(e) => {
              //   onChangeHandler();
              //   setSelectedResumeHeadingFont(e.target.value);
              // }}
              name="header_font"
              id="header_font"
            >
              {/* {headerFonts.map((font: HeaderFont) => {
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
            // className={`${selectedResumeBodyFont} rounded`}
            // defaultValue={selectedResumeBodyFont}
            // onChange={(e) => {
            //   onChangeHandler();
            //   setSelectedResumeBodyFont(e.target.value);
            // }}
            name="body_font"
            id="body_font"
          >
            {/* {bodyFonts.map((font: BodyFont) => {
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
        </div> */}
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

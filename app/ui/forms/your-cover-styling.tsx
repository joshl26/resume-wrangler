"use client";

import {
  updateYourCoverLetterStyle,
  updateYourResumeStyle,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import {
  BodyFont,
  BodyFonts,
  CoverLetter,
  CoverTemplate,
  CoverTemplates,
  HeaderFont,
  HeaderFonts,
  ResumeColor,
  ResumeColors,
} from "@/app/lib/definitions";
import clsx from "clsx";

export default function YourCoverStyling({
  coverLetter,
  coverTemplates,
  resumeColors,
  bodyFonts,
  headerFonts,
  selectedCoverTemplate,
  setSelectedCoverTemplate,
  selectedCoverBodyFont,
  setSelectedCoverBodyFont,
  selectedCoverHeadingFont,
  setSelectedCoverHeadingFont,
  selectedCoverColor,
  setSelectedCoverColor,
  selectedCoverHighlightColor,
  setSelectedCoverHighlightColor,
}: {
  coverLetter: CoverLetter;
  coverTemplates: CoverTemplates;
  resumeColors: ResumeColors;
  bodyFonts: BodyFonts;
  headerFonts: HeaderFonts;
  selectedCoverTemplate: any;
  setSelectedCoverTemplate: any;
  selectedCoverBodyFont: any;
  setSelectedCoverBodyFont: any;
  selectedCoverHeadingFont: any;
  setSelectedCoverHeadingFont: any;
  selectedCoverColor: any;
  setSelectedCoverColor: any;
  selectedCoverHighlightColor: any;
  setSelectedCoverHighlightColor: any;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  // console.log(selectedCoverTemplate);

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
          <div className="flex flex-col py-1">
            <label className="py-1 font-medium" htmlFor="cover_template">
              Cover Template
            </label>
            <select
              className="rounded"
              defaultValue={selectedCoverTemplate}
              onChange={(e) => {
                setEdited(true);
                setSelectedCoverTemplate(e?.target?.value);
              }}
              name="cover_template"
              id="cover_template"
            >
              {coverTemplates?.map((coverTemplate: CoverTemplate) => {
                return (
                  <option
                    key={coverTemplate?.id}
                    value={coverTemplate?.description}
                    onChange={() => {}}
                  >
                    {coverTemplate?.name}
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
                value={selectedCoverColor}
                onChange={() => {}}
              />
              <input
                hidden
                id="highlight_color"
                name="highlight_color"
                value={selectedCoverHighlightColor}
                onChange={() => {}}
              />{" "}
              <div className="flex flex-row justify-around">
                {resumeColors?.map((color: ResumeColor) => (
                  <div
                    style={{ cursor: "pointer" }}
                    key={color?.id}
                    id={color?.color}
                    onClick={(e: any) => {
                      setSelectedCoverHighlightColor(color?.name);
                      setSelectedCoverColor(e?.target?.id);
                      onChangeHandler();
                    }}
                    className={clsx(
                      "rounded-full border-2 border-black tight-shadow h-8 w-8 hover:-translate-y-1 duration-500",
                      color?.color,
                      color?.color === selectedCoverColor && "-translate-y-1"
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
                className={`${selectedCoverHeadingFont} rounded`}
                value={selectedCoverHeadingFont}
                onChange={(e) => {
                  onChangeHandler();
                  setSelectedCoverHeadingFont(e?.target.value);
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
              className={`${selectedCoverBodyFont} rounded`}
              defaultValue={selectedCoverBodyFont}
              onChange={(e) => {
                onChangeHandler();
                setSelectedCoverBodyFont(e?.target?.value);
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
          <input
            hidden
            id="cover_id"
            name="cover_id"
            defaultValue={coverLetter?.id}
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
            Intro Start
          </label>
          <textarea
            name="intro_text_start"
            id="intro_text_start"
            className="rounded h-[100px]"
            defaultValue={coverLetter?.intro_text_start}
            onChange={onChangeHandler}
            placeholder="Intro Start"
          />
        </div>
        <div className="flex flex-col py-1">
          <label className="py-1 font-medium" htmlFor="intro_text_start">
            Intro End
          </label>
          <textarea
            name="intro_text_end"
            id="intro_text_end"
            className="rounded h-[175px]"
            defaultValue={coverLetter?.intro_text_end}
            onChange={onChangeHandler}
            placeholder="Intro End"
          />
        </div>
        <div className="flex flex-col py-1">
          <label className="py-1 font-medium" htmlFor="conclusion_text">
            Conclusion
          </label>
          <textarea
            name="conclusion_text"
            id="conclusion_text"
            className="rounded h-[175px]"
            defaultValue={coverLetter?.conclusion_text}
            onChange={onChangeHandler}
            placeholder="Conclusion"
          />
        </div>
        <div className="flex flex-col py-1">
          <label className="py-1 font-medium" htmlFor="salutation_text">
            Salutation
          </label>
          <textarea
            name="salutation_text"
            id="salutation_text"
            className="rounded h-[75px]"
            defaultValue={coverLetter?.salutation_text}
            onChange={onChangeHandler}
            placeholder="Salutation"
          />
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

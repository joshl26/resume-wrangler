"use client";

import { updateYourCoverLetterStyle } from "@/app/lib/actions";
import { useState, ChangeEvent } from "react";
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

interface YourCoverStylingProps {
  coverLetter: CoverLetter;
  coverTemplates: CoverTemplates;
  resumeColors: ResumeColors;
  bodyFonts: BodyFonts;
  headerFonts: HeaderFonts;
  selectedCoverTemplate: string;
  setSelectedCoverTemplate: (value: string) => void;
  selectedCoverBodyFont: string;
  setSelectedCoverBodyFont: (value: string) => void;
  selectedCoverHeadingFont: string;
  setSelectedCoverHeadingFont: (value: string) => void;
  selectedCoverColor: string;
  setSelectedCoverColor: (value: string) => void;
  selectedCoverHighlightColor: string;
  setSelectedCoverHighlightColor: (value: string) => void;
}

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
}: YourCoverStylingProps) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (!edited) setEdited(true);
  };

  const handleUpdateStyle = async (formData: FormData): Promise<void> => {
    try {
      const result = await updateYourCoverLetterStyle(formData);
      if (result?.errors) {
        console.error("Update cover letter style failed:", result);
      } else {
        setEdited(false);
      }
    } catch (err) {
      console.error("Unexpected error updating cover letter style:", err);
    }
  };

  const handleColorClick = (color: ResumeColor) => {
    setSelectedCoverHighlightColor(color.name);
    setSelectedCoverColor(color.color);
    onChangeHandler();
  };

  return (
    <div className="resume-styling">
      <div className="pb-2 font-bold text-xl">
        <h2>Cover Styling</h2>
      </div>
      <form
        action={handleUpdateStyle}
        className="tight-shadow rounded form-amber px-5 py-2"
      >
        <div className="flex flex-col py-1">
          <div className="flex flex-col py-1">
            <label className="py-1 font-medium" htmlFor="cover_template">
              Cover Template
            </label>
            <select
              className="rounded"
              value={selectedCoverTemplate}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setEdited(true);
                setSelectedCoverTemplate(e.target.value);
              }}
              name="cover_template"
              id="cover_template"
            >
              {coverTemplates.map((coverTemplate: CoverTemplate) => (
                <option
                  key={coverTemplate.id}
                  value={coverTemplate.description}
                >
                  {coverTemplate.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col py-1">
            <label className="py-1 font-medium" htmlFor="color">
              Colors
            </label>
            <input
              type="hidden"
              id="color"
              name="color"
              value={selectedCoverColor}
              readOnly
            />
            <input
              type="hidden"
              id="highlight_color"
              name="highlight_color"
              value={selectedCoverHighlightColor}
              readOnly
            />
            <div className="flex flex-row justify-around">
              {resumeColors.map((color: ResumeColor) => (
                <div
                  key={color.id}
                  id={color.color}
                  onClick={() => handleColorClick(color)}
                  className={clsx(
                    "rounded-full border-2 border-black tight-shadow h-8 w-8 cursor-pointer hover:-translate-y-1 duration-500",
                    color.color,
                    color.color === selectedCoverColor && "-translate-y-1",
                  )}
                  aria-label={`Select color ${color.name}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleColorClick(color);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col py-1">
            <label className="py-1 font-medium" htmlFor="header_font">
              Heading Font
            </label>
            <select
              className={`${selectedCoverHeadingFont} rounded`}
              value={selectedCoverHeadingFont}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                onChangeHandler();
                setSelectedCoverHeadingFont(e.target.value);
              }}
              name="header_font"
              id="header_font"
            >
              {headerFonts.map((font: HeaderFont) => (
                <option key={font.id} value={font.name} className={font.name}>
                  {font.description}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col py-1">
            <label className="py-1 font-medium" htmlFor="body_font">
              Body Font
            </label>
            <select
              className={`${selectedCoverBodyFont} rounded`}
              value={selectedCoverBodyFont}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                onChangeHandler();
                setSelectedCoverBodyFont(e.target.value);
              }}
              name="body_font"
              id="body_font"
            >
              {bodyFonts.map((font: BodyFont) => (
                <option key={font.id} value={font.name} className={font.name}>
                  {font.description}
                </option>
              ))}
            </select>
          </div>

          <input
            type="hidden"
            id="cover_id"
            name="cover_id"
            value={coverLetter?.id ?? ""}
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
          <label className="py-1 font-medium" htmlFor="intro_text_end">
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
          <SubmitButton className="btn btn-amber my-4 animate-pulse">
            Save Change
          </SubmitButton>
        )}
      </form>
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import clsx from "clsx";
import { updateYourResumeStyle } from "@/app/lib/actions";
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
  ResumeTemplate,
} from "@/app/lib/definitions";

import "./your-resume-styling.css";

interface YourResumeStylingProps {
  resume: Resume;
  resumeTemplates: ResumeTemplates;
  resumeColors: ResumeColors;
  headerFonts: HeaderFonts;
  bodyFonts: BodyFonts;
  setSelectedResumeTemplate: (template: string) => void;
  setSelectedResumeHeadingFont: (font: string) => void;
  setSelectedResumeBodyFont: (font: string) => void;
  setSelectedResumeColor: (color: string) => void;
  setSelectedResumeHighlightColor: (color: string) => void;
  selectedResumeTemplate: string;
  selectedResumeBodyFont: string;
  selectedResumeHeadingFont: string;
  selectedResumeColor: string;
  selectedResumeHighlightColor: string;
}

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
}: YourResumeStylingProps) {
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(() => {
    setEdited(true);
    setError(null);
  }, []);

  const handleSubmit = async (formData: FormData): Promise<void> => {
    try {
      setIsSubmitting(true);
      setError(null);

      const result = await updateYourResumeStyle(formData);

      if (result?.errors) {
        const errorMessage = Object.values(result.errors).flat().join(", ");
        setError(errorMessage || "Failed to update resume style");
        console.error("Update resume style failed:", result.errors);
      } else {
        setEdited(false);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Unexpected error updating resume style:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleColorSelect = useCallback(
    (colorId: string, highlightColor: string) => {
      setSelectedResumeColor(colorId);
      setSelectedResumeHighlightColor(highlightColor);
      handleChange();
    },
    [setSelectedResumeColor, setSelectedResumeHighlightColor, handleChange],
  );

  const handleTemplateChange = useCallback(
    (value: string) => {
      setSelectedResumeTemplate(value);
      handleChange();
    },
    [setSelectedResumeTemplate, handleChange],
  );

  const handleHeadingFontChange = useCallback(
    (value: string) => {
      setSelectedResumeHeadingFont(value);
      handleChange();
    },
    [setSelectedResumeHeadingFont, handleChange],
  );

  const handleBodyFontChange = useCallback(
    (value: string) => {
      setSelectedResumeBodyFont(value);
      handleChange();
    },
    [setSelectedResumeBodyFont, handleChange],
  );

  const getTailwindColor = (colorClass: string): string => {
    const colorMap: Record<string, string> = {
      "bg-white": "#ffffff",
      "bg-yellow-400": "#facc15",
      "bg-slate-400": "#94a3b8",
      "bg-emerald-400": "#34d399",
      "bg-orange-300": "#fdba74",
      "bg-red-400": "#f87171",
      "bg-cyan-500": "#06b6d4",
      "bg-pink-300": "#f9a8d4",
      "bg-slate-500": "#64748b",
      "bg-gray-500": "#6b7280",
      "bg-red-500": "#ef4444",
      "bg-orange-500": "#f97316",
      "bg-amber-500": "#f59e0b",
      "bg-yellow-500": "#eab308",
      "bg-lime-500": "#84cc16",
      "bg-green-500": "#22c55e",
      "bg-emerald-500": "#10b981",
      "bg-teal-500": "#14b8a6",
      "bg-sky-500": "#0ea5e9",
      "bg-blue-500": "#3b82f6",
      "bg-indigo-500": "#6366f1",
      "bg-violet-500": "#8b5cf6",
      "bg-purple-500": "#a855f7",
      "bg-fuchsia-500": "#d946ef",
      "bg-pink-500": "#ec4899",
      "bg-rose-500": "#f43f5e",
    };
    return colorMap[colorClass] || "#6b7280";
  };

  return (
    <div className="resume-styling">
      <div>
        <h2>Resume Styling</h2>
        <p>Customize the look and feel of your resume</p>
      </div>

      <form action={handleSubmit} className="space-y-6 mt-6">
        <input type="hidden" name="resume_id" value={resume?.id} />

        {error && (
          <div className="error-message-container" role="alert">
            <div className="flex items-start">
              <div className="shrink-0">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="error-message-text">{error}</p>
            </div>
          </div>
        )}

        <div className="group">
          <label htmlFor="resume_title">
            Resume Title<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="resume_title"
            id="resume_title"
            className="form-input"
            defaultValue={resume?.title}
            onChange={handleChange}
            placeholder="e.g., Software Engineer Resume"
            required
          />
        </div>

        <div className="group">
          <label htmlFor="description">Professional Summary</label>
          <textarea
            name="description"
            id="description"
            className="form-input"
            rows={8}
            defaultValue={resume?.description}
            onChange={handleChange}
            placeholder="Write a compelling summary highlighting your experience, skills, and what makes you unique..."
          />
          <p className="text-xs text-gray-500 mt-2 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            This appears at the top of your resume and is your first impression
          </p>
        </div>

        <div className="group">
          <label htmlFor="resume_template">
            Resume Template<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <select
              className="form-input cursor-pointer text-lg"
              value={selectedResumeTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              name="resume_template"
              id="resume_template"
              required
            >
              {resumeTemplates.map((template: ResumeTemplate) => (
                <option
                  key={template.id}
                  value={template.description}
                  className={template.description}
                >
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col py-2">
          <label className="color-picker-label">Color Scheme</label>

          <input type="hidden" name="color" value={selectedResumeColor} />
          <input
            type="hidden"
            name="highlight_color"
            value={selectedResumeHighlightColor}
          />

          <div className="color-picker-container">
            {resumeColors.map((color: ResumeColor) => {
              const isSelected = color.color === selectedResumeColor;
              const bgColor = getTailwindColor(color.color);

              return (
                <button
                  type="button"
                  key={color.id}
                  onClick={() =>
                    handleColorSelect(color.color, color.highlight_color)
                  }
                  style={{ backgroundColor: bgColor }}
                  className={clsx(
                    "color-picker-button",
                    color.color === "bg-white" && "bg-white",
                    isSelected && "selected",
                  )}
                  aria-label={`Select ${color.name} color scheme`}
                  aria-pressed={isSelected}
                  title={
                    color.name.charAt(0).toUpperCase() + color.name.slice(1)
                  }
                />
              );
            })}
          </div>
          <span className="text-xs text-gray-500 mt-2 text-center">
            Select a color for headings and accents
          </span>
        </div>

        <div className="group">
          <label htmlFor="header_font">
            Heading Font<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <select
              className={clsx(selectedResumeHeadingFont, "form-input text-lg")}
              value={selectedResumeHeadingFont}
              onChange={(e) => handleHeadingFontChange(e.target.value)}
              name="header_font"
              id="header_font"
              required
            >
              {headerFonts.map((font: HeaderFont) => (
                <option key={font.id} value={font.name} className={font.name}>
                  {font.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="group">
          <label htmlFor="body_font">
            Body Font<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <select
              className={clsx(selectedResumeBodyFont, "form-input")}
              value={selectedResumeBodyFont}
              onChange={(e) => handleBodyFontChange(e.target.value)}
              name="body_font"
              id="body_font"
              required
            >
              {bodyFonts.map((font: BodyFont) => (
                <option key={font.id} value={font.name} className={font.name}>
                  {font.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {edited && (
          <div className="submit-button-wrapper">
            <SubmitButton
              className={clsx(
                "submit-button",
                isSubmitting ? "disabled" : "enabled",
              )}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving Changes...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </span>
              )}
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
}

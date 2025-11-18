// description: Form to edit an existing education entry
// file: app/ui/forms/edit-education.tsx

"use client";

import React, { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submit-button";
import { updateUserEducation } from "@/app/lib/actions";
import { UserEducationExperience } from "@/app/lib/definitions";

type Props = { education: UserEducationExperience };

export default function EditEducation({ education }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const onChangeHandler = () => {
    if (!edited) setEdited(true);
  };

  const isValidUrl = (v: string) => /^https?:\/\/\S+$/.test(v);

  const validate = (data: FormData) => {
    const out: Record<string, string> = {};

    const institution = (data.get("institution_name") as string | null) ?? "";
    const startDate = (data.get("start_date") as string | null) ?? "";
    const endDate = (data.get("end_date") as string | null) ?? "";
    const program = (data.get("program") as string | null) ?? "";
    const url = (data.get("url") as string | null) ?? "";
    const educationId = (data.get("education_id") as string | null) ?? "";

    if (!institution.trim())
      out.institution_name = "Institution name is required.";
    if (!startDate.trim()) out.start_date = "Program start date is required.";
    if (!endDate.trim()) out.end_date = "Program end date is required.";
    if (!program.trim()) out.program = "Program name is required.";
    if (!educationId.trim()) out.education_id = "Education id is missing.";

    if (startDate && endDate) {
      const s = Date.parse(startDate);
      const e = Date.parse(endDate);
      if (Number.isFinite(s) && Number.isFinite(e) && s > e) {
        out.end_date = "End date must be the same or after the start date.";
      }
    }

    if (url && !isValidUrl(url)) {
      out.url = "Please provide a valid URL (include http/https).";
    }

    return out;
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrors({});
    setStatusMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const validation = validate(formData);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      const firstKey = Object.keys(validation)[0];
      const el = form.querySelector(
        `[name="${firstKey}"]`,
      ) as HTMLElement | null;
      el?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const result = (await updateUserEducation(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage(
            "Failed to update education entry. Please try again.",
          );
          console.error("updateUserEducation failed:", result);
        }
        return;
      }

      setEdited(false);
      setStatusMessage("Education updated successfully!");

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error("Unexpected error updating education:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-y-auto w-full max-w-2xl px-4 sm:px-6 pb-8">
      <h2 className="font-medium text-3xl sm:text-4xl py-4 text-gray-900 dark:text-gray-100">
        Edit Education Experience
      </h2>

      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="edit-education-container edit-education-form space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
        <input
          readOnly
          hidden
          name="education_id"
          id="education_id"
          defaultValue={education?.id ?? ""}
        />
        <input
          readOnly
          hidden
          name="resume_id"
          id="resume_id"
          defaultValue="blank"
          type="text"
        />

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="institution_name"
          >
            Institution Name
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.institution_name
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            required
            name="institution_name"
            id="institution_name"
            onChange={onChangeHandler}
            defaultValue={education?.institution_name ?? ""}
            aria-invalid={!!errors.institution_name}
            aria-describedby={
              errors.institution_name ? "err-institution_name" : undefined
            }
            autoFocus
          />
          {errors.institution_name && (
            <p
              id="err-institution_name"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.institution_name}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="location"
          >
            Institution Location
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.location
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            name="location"
            id="location"
            onChange={onChangeHandler}
            defaultValue={education?.location ?? ""}
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? "err-location" : undefined}
          />
          {errors.location && (
            <p
              id="err-location"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.location}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="start_date"
            >
              Start Date
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.start_date
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              name="start_date"
              id="start_date"
              onChange={onChangeHandler}
              defaultValue={education?.start_date ?? ""}
              placeholder="YYYY-MM-DD"
              required
              aria-invalid={!!errors.start_date}
              aria-describedby={
                errors.start_date ? "err-start_date" : undefined
              }
            />
            {errors.start_date && (
              <p
                id="err-start_date"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.start_date}
              </p>
            )}
          </div>

          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="end_date"
            >
              End Date
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.end_date
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              name="end_date"
              id="end_date"
              onChange={onChangeHandler}
              defaultValue={education?.end_date ?? ""}
              placeholder="YYYY-MM-DD"
              required
              aria-invalid={!!errors.end_date}
              aria-describedby={errors.end_date ? "err-end_date" : undefined}
            />
            {errors.end_date && (
              <p
                id="err-end_date"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.end_date}
              </p>
            )}
          </div>

          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="grade"
            >
              Grade
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.grade
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              name="grade"
              id="grade"
              onChange={onChangeHandler}
              defaultValue={education?.grade ?? ""}
              aria-invalid={!!errors.grade}
              aria-describedby={errors.grade ? "err-grade" : undefined}
            />
            {errors.grade && (
              <p
                id="err-grade"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.grade}
              </p>
            )}
          </div>
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="program"
          >
            Program Name
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.program
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            name="program"
            id="program"
            onChange={onChangeHandler}
            defaultValue={education?.program ?? ""}
            required
            aria-invalid={!!errors.program}
            aria-describedby={errors.program ? "err-program" : undefined}
          />
          {errors.program && (
            <p
              id="err-program"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.program}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="url"
          >
            Link (Web URL)
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.url
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            name="url"
            id="url"
            onChange={onChangeHandler}
            defaultValue={education?.url ?? ""}
            placeholder="https://example.com"
            aria-invalid={!!errors.url}
            aria-describedby={errors.url ? "err-url" : undefined}
          />
          {errors.url && (
            <p
              id="err-url"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.url}
            </p>
          )}
        </div>

        <div aria-live="polite" aria-atomic="true" className="min-h-6 pt-2">
          {statusMessage && (
            <p
              className={`text-sm font-medium ${
                statusMessage.includes("success")
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </div>

        {edited && (
          <div className="pt-4">
            <SubmitButton
              type="submit"
              className="btn btn-amber w-full sm:w-auto px-8 py-3 text-base font-semibold bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || isPending}
            >
              {isSubmitting || isPending ? "Saving..." : "Save Updates"}
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
}

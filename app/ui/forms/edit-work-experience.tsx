// description: Form to edit an existing work experience entry
// file: app/ui/forms/edit-work-experience.tsx

"use client";

import React, { useRef, useState, useTransition } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserWorkExperience } from "@/app/lib/actions";
import { UserWorkExperience } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

type Props = { workExperience: UserWorkExperience };

export default function EditWorkExperience({ workExperience }: Props) {
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

  // Simple validators
  const validate = (data: FormData) => {
    const out: Record<string, string> = {};
    const experienceId = (data.get("experience_id") as string | null) ?? "";
    const companyName = (data.get("company_name") as string | null) ?? "";
    const location = (data.get("location") as string | null) ?? "";
    const jobTitle = (data.get("job_title") as string | null) ?? "";

    if (!experienceId.trim()) out.experience_id = "Missing experience id.";
    if (!companyName.trim()) out.company_name = "Company name is required.";
    if (!location.trim()) out.location = "Location is required.";
    if (!jobTitle.trim()) out.job_title = "Job title is required.";

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
      const result = (await updateUserWorkExperience(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage(
            "Failed to update work experience. Please try again.",
          );
          console.error("updateUserWorkExperience failed:", result);
        }
        return;
      }

      setEdited(false);
      setStatusMessage("Work experience updated successfully!");

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error("Unexpected error updating work experience:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const createdAt = workExperience?.created_at
    ? workExperience.created_at.toLocaleString()
    : workExperience?.created_at
      ? String(workExperience.created_at)
      : "N/A";

  const updatedAt = workExperience?.updated_at
    ? workExperience.updated_at.toLocaleString()
    : workExperience?.updated_at
      ? String(workExperience.updated_at)
      : "N/A";

  return (
    <div className="overflow-y-auto w-full max-w-4xl px-4 sm:px-6 pb-8">
      <h2 className="font-medium text-3xl sm:text-4xl py-4 text-gray-900 dark:text-gray-100">
        Edit Work Experience
      </h2>

      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="edit-work-experience-container edit-work-experience-form space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
        <input
          hidden
          readOnly
          name="experience_id"
          id="experience_id"
          defaultValue={workExperience?.id ?? ""}
        />
        <input
          hidden
          readOnly
          name="resume_id"
          id="resume_id"
          defaultValue="blank"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-200">
              Date Created
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {createdAt.slice(0, 24)}
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-200">
              Date Updated
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {updatedAt.slice(0, 24)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="company_name"
            >
              Company Name
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.company_name
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              required
              name="company_name"
              id="company_name"
              onChange={onChangeHandler}
              defaultValue={workExperience?.company_name ?? ""}
              aria-invalid={!!errors.company_name}
              aria-describedby={
                errors.company_name ? "err-company_name" : undefined
              }
              autoFocus
            />
            {errors.company_name && (
              <p
                id="err-company_name"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.company_name}
              </p>
            )}
          </div>

          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.location
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              required
              name="location"
              id="location"
              onChange={onChangeHandler}
              defaultValue={workExperience?.location ?? ""}
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
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="job_title"
          >
            Job Title
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.job_title
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            required
            name="job_title"
            id="job_title"
            onChange={onChangeHandler}
            defaultValue={workExperience?.job_title ?? ""}
            aria-invalid={!!errors.job_title}
            aria-describedby={errors.job_title ? "err-job_title" : undefined}
          />
          {errors.job_title && (
            <p
              id="err-job_title"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.job_title}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              type="date"
              name="start_date"
              id="start_date"
              onChange={onChangeHandler}
              defaultValue={workExperience?.start_date ?? ""}
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
              type="date"
              name="end_date"
              id="end_date"
              onChange={onChangeHandler}
              defaultValue={workExperience?.end_date ?? ""}
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
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="description_one"
          >
            Description One
          </label>
          <textarea
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.description_one
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors h-32 resize-y`}
            name="description_one"
            id="description_one"
            onChange={onChangeHandler}
            defaultValue={workExperience?.description_one ?? ""}
            aria-invalid={!!errors.description_one}
            aria-describedby={
              errors.description_one ? "err-description_one" : undefined
            }
          />
          {errors.description_one && (
            <p
              id="err-description_one"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.description_one}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="description_two"
          >
            Description Two
          </label>
          <textarea
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.description_two
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors h-32 resize-y`}
            name="description_two"
            id="description_two"
            onChange={onChangeHandler}
            defaultValue={workExperience?.description_two ?? ""}
            aria-invalid={!!errors.description_two}
            aria-describedby={
              errors.description_two ? "err-description_two" : undefined
            }
          />
          {errors.description_two && (
            <p
              id="err-description_two"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.description_two}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="description_three"
          >
            Description Three
          </label>
          <textarea
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.description_three
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors h-32 resize-y`}
            name="description_three"
            id="description_three"
            onChange={onChangeHandler}
            defaultValue={workExperience?.description_three ?? ""}
            aria-invalid={!!errors.description_three}
            aria-describedby={
              errors.description_three ? "err-description_three" : undefined
            }
          />
          {errors.description_three && (
            <p
              id="err-description_three"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.description_three}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="description_four"
          >
            Description Four
          </label>
          <textarea
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.description_four
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors h-32 resize-y`}
            name="description_four"
            id="description_four"
            onChange={onChangeHandler}
            defaultValue={workExperience?.description_four ?? ""}
            aria-invalid={!!errors.description_four}
            aria-describedby={
              errors.description_four ? "err-description_four" : undefined
            }
          />
          {errors.description_four && (
            <p
              id="err-description_four"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.description_four}
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

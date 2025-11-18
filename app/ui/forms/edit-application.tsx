// description: Form to edit an existing application
// file: app/ui/forms/edit-application.tsx

"use client";

import React, { useRef, useState, useTransition } from "react";
import { SubmitButton } from "../submit-button";
import { updateApplication } from "@/app/lib/actions";
import { Application, Companies } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

type Props = {
  application: Application;
  companies: Companies;
};

export default function EditApplication({ application, companies }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(application?.is_complete);

  const onChangeHandler = () => {
    if (!edited) setEdited(true);
  };

  const isCompleteChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsComplete(e.target.checked ? "true" : "false");
    if (!edited) setEdited(true);
  };

  // Simple validators
  const isValidUrl = (v: string) => !v || /^https?:\/\/\S+$/.test(v);

  const validate = (data: FormData) => {
    const out: Record<string, string> = {};
    const applicationId = (data.get("application_id") as string | null) ?? "";
    const companyId = (data.get("company_id") as string | null) ?? "";
    const jobPosition = (data.get("job_position") as string | null) ?? "";
    const postingUrl = (data.get("posting_url") as string | null) ?? "";

    if (!applicationId.trim()) out.application_id = "Missing application id.";
    if (!companyId.trim()) out.company_id = "Company is required.";
    if (!jobPosition.trim()) out.job_position = "Job position is required.";

    if (postingUrl.trim() && !isValidUrl(postingUrl)) {
      out.posting_url = "Please provide a valid URL (include http/https).";
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
      const result = (await updateApplication(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to update application. Please try again.");
          console.error("updateApplication failed:", result);
        }
        return;
      }

      setEdited(false);
      setStatusMessage("Application updated successfully!");

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error("Unexpected error updating application:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const createdAt = application?.created_at
    ? application.created_at.toLocaleString()
    : application?.created_at
      ? String(application.created_at)
      : "N/A";

  const updatedAt = application?.updated_at
    ? application.updated_at.toLocaleString()
    : application?.updated_at
      ? String(application.updated_at)
      : "N/A";

  const dateSubmitted = application?.date_submitted
    ? application.date_submitted.toLocaleString()
    : application?.date_submitted
      ? String(application.date_submitted)
      : "Not submitted yet";

  return (
    <div className="overflow-y-auto w-full max-w-3xl px-4 sm:px-6 pb-8">
      <h2 className="font-medium text-3xl sm:text-4xl py-4 text-gray-900 dark:text-gray-100">
        Edit Application
      </h2>

      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="edit-application-container edit-application-form space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
        <input
          hidden
          readOnly
          name="application_id"
          id="application_id"
          defaultValue={application?.id ?? ""}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-200">
              Date Submitted
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-800 dark:text-gray-200 italic">
                {dateSubmitted}
              </p>
            </div>
          </div>
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="company_id"
          >
            Company
          </label>
          <select
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.company_id
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            onChange={onChangeHandler}
            defaultValue={application?.company_id}
            id="company_id"
            name="company_id"
            required
            aria-invalid={!!errors.company_id}
            aria-describedby={errors.company_id ? "err-company_id" : undefined}
          >
            {companies.map((company: any) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          {errors.company_id && (
            <p
              id="err-company_id"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.company_id}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="job_position"
          >
            Job Position
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.job_position
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            required
            onChange={onChangeHandler}
            name="job_position"
            id="job_position"
            defaultValue={application?.job_position ?? ""}
            aria-invalid={!!errors.job_position}
            aria-describedby={
              errors.job_position ? "err-job_position" : undefined
            }
            autoFocus
          />
          {errors.job_position && (
            <p
              id="err-job_position"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.job_position}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="posting_url"
          >
            Posting URL
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.posting_url
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            type="url"
            onChange={onChangeHandler}
            name="posting_url"
            id="posting_url"
            defaultValue={application?.posting_url ?? ""}
            aria-invalid={!!errors.posting_url}
            aria-describedby={
              errors.posting_url ? "err-posting_url" : undefined
            }
            placeholder="https://example.com/job-posting"
          />
          {errors.posting_url && (
            <p
              id="err-posting_url"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.posting_url}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <div className="flex items-center gap-3">
            <input
              hidden
              readOnly
              id="is_complete"
              name="is_complete"
              value={isComplete}
            />
            <input
              title="Mark as complete"
              className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              onChange={isCompleteChangeHandler}
              checked={isComplete === "true"}
              type="checkbox"
              id="is_complete_checkbox"
            />
            <label
              className="form-label text-sm font-semibold text-gray-700 dark:text-gray-200 cursor-pointer"
              htmlFor="is_complete_checkbox"
            >
              Mark as Complete
            </label>
          </div>
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="posting_text"
          >
            Posting Text
          </label>
          <textarea
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.posting_text
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors h-48 resize-y`}
            onChange={onChangeHandler}
            name="posting_text"
            id="posting_text"
            defaultValue={application?.posting_text ?? ""}
            aria-invalid={!!errors.posting_text}
            aria-describedby={
              errors.posting_text ? "err-posting_text" : undefined
            }
          />
          {errors.posting_text && (
            <p
              id="err-posting_text"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.posting_text}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="analyzed_posting_text"
          >
            Analyzed Posting Text
          </label>
          <textarea
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.analyzed_posting_text
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors h-48 resize-y`}
            onChange={onChangeHandler}
            name="analyzed_posting_text"
            id="analyzed_posting_text"
            defaultValue={application?.analyzed_posting_text ?? ""}
            aria-invalid={!!errors.analyzed_posting_text}
            aria-describedby={
              errors.analyzed_posting_text
                ? "err-analyzed_posting_text"
                : undefined
            }
          />
          {errors.analyzed_posting_text && (
            <p
              id="err-analyzed_posting_text"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.analyzed_posting_text}
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

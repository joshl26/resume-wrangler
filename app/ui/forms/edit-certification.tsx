// description: Form to edit an existing certification entry
// file: app/ui/forms/edit-certification.tsx

"use client";

import React, { useRef, useState, useTransition } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserCertfication } from "@/app/lib/actions";
import { UserCertification } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

type Props = { certification: UserCertification };

export default function EditCertification({ certification }: Props) {
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

  const validate = (data: FormData) => {
    const out: Record<string, string> = {};
    const id = (data.get("certification_id") as string | null) ?? "";
    const name = (data.get("certification_name") as string | null) ?? "";
    const location = (data.get("location_name") as string | null) ?? "";

    if (!id.trim()) out.certification_id = "Missing certification id.";
    if (!name.trim())
      out.certification_name = "Certification name is required.";
    if (!location.trim()) out.location_name = "Location is required.";

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
      const result = (await updateUserCertfication(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to update certification. Please try again.");
          console.error("updateUserCertfication failed:", result);
        }
        return;
      }

      setEdited(false);
      setStatusMessage("Certification updated successfully!");

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error("Unexpected error updating certification:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const createdAt = certification?.created_at
    ? certification.created_at.toLocaleString()
    : certification?.created_at
      ? String(certification.created_at)
      : "N/A";

  const updatedAt = certification?.updated_at
    ? certification.updated_at.toLocaleString()
    : certification?.updated_at
      ? String(certification.updated_at)
      : "N/A";

  return (
    <div className="overflow-y-auto w-full max-w-3xl px-4 sm:px-6 pb-8">
      <h2 className="font-medium text-3xl sm:text-4xl py-4 text-gray-900 dark:text-gray-100">
        Edit Certification
      </h2>

      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="edit-certification-container edit-certification-form space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
        <input
          hidden
          readOnly
          name="certification_id"
          id="certification_id"
          defaultValue={certification?.id ?? ""}
        />
        <input
          hidden
          readOnly
          name="user_id"
          id="user_id"
          defaultValue={certification?.user_id ?? ""}
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

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="certification_name"
          >
            Certification Name
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.certification_name
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            required
            name="certification_name"
            id="certification_name"
            onChange={onChangeHandler}
            defaultValue={certification?.name ?? ""}
            aria-invalid={!!errors.certification_name}
            aria-describedby={
              errors.certification_name ? "err-certification_name" : undefined
            }
            autoFocus
          />
          {errors.certification_name && (
            <p
              id="err-certification_name"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.certification_name}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="location_name"
          >
            Location
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.location_name
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            required
            name="location_name"
            id="location_name"
            onChange={onChangeHandler}
            defaultValue={certification?.location ?? ""}
            aria-invalid={!!errors.location_name}
            aria-describedby={
              errors.location_name ? "err-location_name" : undefined
            }
          />
          {errors.location_name && (
            <p
              id="err-location_name"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.location_name}
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

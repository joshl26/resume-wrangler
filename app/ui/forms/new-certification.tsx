// description: Form to create a new certification entry
// file: app/ui/forms/new-certification.tsx

"use client";

import React, { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submit-button";
import { createCertification } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";

type Props = { user: User };

export default function NewCertification({ user }: Props) {
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
    const name = (data.get("certification_name") as string | null) ?? "";
    const location =
      (data.get("certification_location") as string | null) ?? "";
    const userId = (data.get("user_id") as string | null) ?? "";

    if (!name.trim())
      out.certification_name = "Certification name is required.";
    if (!location.trim())
      out.certification_location = "Certification location is required.";
    if (!userId.trim()) out.user_id = "User id is missing.";

    return out;
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const result = (await createCertification(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to create certification. Please try again.");
          console.error("createCertification failed:", result);
        }
        return;
      }

      setEdited(false);
      setStatusMessage("Certification created successfully!");

      // Reset form
      formRef.current?.reset();

      // Redirect to certifications list after short delay
      setTimeout(() => {
        startTransition(() => {
          router.push("/dashboard/certifications");
          router.refresh();
        });
      }, 1500);
    } catch (err) {
      console.error("Unexpected error creating certification:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-y-auto w-full max-w-3xl px-4 sm:px-6 pb-8">
      <h2 className="font-medium text-3xl sm:text-4xl py-4 text-gray-900 dark:text-gray-100">
        Add New Certification
      </h2>

      <form
        ref={formRef}
        onSubmit={handleCreate}
        className="new-certification-container new-certification-form space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
        <input
          hidden
          readOnly
          name="user_id"
          id="user_id"
          defaultValue={user?.id ?? ""}
        />

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
            defaultValue=""
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
            htmlFor="certification_location"
          >
            Certification Location
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.certification_location
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            required
            name="certification_location"
            id="certification_location"
            onChange={onChangeHandler}
            defaultValue=""
            aria-invalid={!!errors.certification_location}
            aria-describedby={
              errors.certification_location
                ? "err-certification_location"
                : undefined
            }
          />
          {errors.certification_location && (
            <p
              id="err-certification_location"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.certification_location}
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
              {isSubmitting || isPending
                ? "Creating..."
                : "Create New Certification"}
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
}

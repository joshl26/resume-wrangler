// definition: Form to edit an existing cover experience entry for the authenticated user.
// file: app/ui/forms/edit-cover-experience.tsx

"use client";

import React, { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submit-button";
import { updateCoverExperience } from "@/app/lib/actions";
import { UserCoverExperience } from "@/app/lib/definitions";

type Props = {
  coverExperience: UserCoverExperience;
  userId: string;
};

export default function EditCoverExperience({
  coverExperience,
  userId,
}: Props) {
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

    const title = (data.get("title") as string | null) ?? "";
    const description = (data.get("description") as string | null) ?? "";
    const experienceId = (data.get("experience_id") as string | null) ?? "";
    const userId = (data.get("user_id") as string | null) ?? "";

    if (!title.trim()) out.title = "Title is required.";
    if (!description.trim()) out.description = "Description is required.";
    if (!experienceId.trim()) out.experience_id = "Experience id is missing.";
    if (!userId.trim()) out.user_id = "User id is missing.";

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
      const result = (await updateCoverExperience(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage(
            "Failed to update cover experience. Please try again.",
          );
          console.error("updateCoverExperience failed:", result);
        }
        return;
      }

      setEdited(false);
      setStatusMessage("Cover experience updated successfully!");

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error("Unexpected error updating cover experience:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-y-auto w-full max-w-3xl px-4 sm:px-6 pb-8">
      <h2 className="font-medium text-3xl sm:text-4xl py-4 text-gray-900 dark:text-gray-100">
        Edit Cover Experience
      </h2>

      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="edit-cover-experience-container edit-cover-experience-form space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
        <input
          readOnly
          hidden
          name="experience_id"
          id="experience_id"
          defaultValue={coverExperience?.id ?? ""}
        />
        <input
          hidden
          name="user_id"
          id="user_id"
          readOnly
          defaultValue={userId ?? ""}
        />

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="title"
          >
            Cover Experience Title
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.title
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            required
            name="title"
            id="title"
            onChange={onChangeHandler}
            defaultValue={coverExperience?.title ?? ""}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "err-title" : undefined}
            autoFocus
          />
          {errors.title && (
            <p
              id="err-title"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.title}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.description
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors resize-y min-h-[200px]`}
            required
            name="description"
            id="description"
            onChange={onChangeHandler}
            defaultValue={coverExperience?.description ?? ""}
            aria-invalid={!!errors.description}
            aria-describedby={
              errors.description ? "err-description" : undefined
            }
            rows={10}
          />
          {errors.description && (
            <p
              id="err-description"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.description}
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
                ? "Updating..."
                : "Update Cover Experience"}
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
}

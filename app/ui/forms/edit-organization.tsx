// description: Form to edit an existing organization entry
// file: app/ui/forms/edit-organization.tsx

"use client";

import React, { useRef, useState, useTransition } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserOrganization } from "@/app/lib/actions";
import { UserOrganization } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

type Props = { organization: UserOrganization };

export default function EditOrganization({ organization }: Props) {
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
    const organizationId = (data.get("organization_id") as string | null) ?? "";
    const organizationName =
      (data.get("organization_name") as string | null) ?? "";
    const organizationLocation =
      (data.get("organization_location") as string | null) ?? "";

    if (!organizationId.trim())
      out.organization_id = "Missing organization id.";
    if (!organizationName.trim())
      out.organization_name = "Organization name is required.";
    if (!organizationLocation.trim())
      out.organization_location = "Organization location is required.";

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
      const result = (await updateUserOrganization(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to update organization. Please try again.");
          console.error("updateUserOrganization failed:", result);
        }
        return;
      }

      setEdited(false);
      setStatusMessage("Organization updated successfully!");

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error("Unexpected error updating organization:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const createdAt = organization?.created_at
    ? organization.created_at.toLocaleString()
    : organization?.created_at
      ? String(organization.created_at)
      : "N/A";

  const updatedAt = organization?.updated_at
    ? organization.updated_at.toLocaleString()
    : organization?.updated_at
      ? String(organization.updated_at)
      : "N/A";

  return (
    <div className="overflow-y-auto w-full max-w-4xl px-4 sm:px-6 pb-8">
      <h2 className="font-medium text-3xl sm:text-4xl py-4 text-gray-900 dark:text-gray-100">
        Edit Organization
      </h2>

      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="edit-organization-container edit-organization-form space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
        <input
          hidden
          readOnly
          name="organization_id"
          id="organization_id"
          defaultValue={organization?.id ?? ""}
        />
        <input
          hidden
          readOnly
          name="resume_id"
          id="resume_id"
          defaultValue="blank"
        />
        <input
          hidden
          readOnly
          name="user_id"
          id="user_id"
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

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="organization_name"
          >
            Organization Name
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.organization_name
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            required
            name="organization_name"
            id="organization_name"
            onChange={onChangeHandler}
            defaultValue={organization?.name ?? ""}
            aria-invalid={!!errors.organization_name}
            aria-describedby={
              errors.organization_name ? "err-organization_name" : undefined
            }
            autoFocus
          />
          {errors.organization_name && (
            <p
              id="err-organization_name"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.organization_name}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="organization_location"
          >
            Location
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.organization_location
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            required
            name="organization_location"
            id="organization_location"
            onChange={onChangeHandler}
            defaultValue={organization?.location ?? ""}
            aria-invalid={!!errors.organization_location}
            aria-describedby={
              errors.organization_location
                ? "err-organization_location"
                : undefined
            }
          />
          {errors.organization_location && (
            <p
              id="err-organization_location"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.organization_location}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="organization_start"
            >
              Start Date
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.organization_start
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              type="date"
              name="organization_start"
              id="organization_start"
              onChange={onChangeHandler}
              defaultValue={organization?.start_date ?? ""}
              aria-invalid={!!errors.organization_start}
              aria-describedby={
                errors.organization_start ? "err-organization_start" : undefined
              }
            />
            {errors.organization_start && (
              <p
                id="err-organization_start"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.organization_start}
              </p>
            )}
          </div>

          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="organization_end"
            >
              End Date
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.organization_end
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              type="date"
              name="organization_end"
              id="organization_end"
              onChange={onChangeHandler}
              defaultValue={organization?.end_date ?? ""}
              aria-invalid={!!errors.organization_end}
              aria-describedby={
                errors.organization_end ? "err-organization_end" : undefined
              }
            />
            {errors.organization_end && (
              <p
                id="err-organization_end"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.organization_end}
              </p>
            )}
          </div>
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="organization_description"
          >
            Description
          </label>
          <textarea
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.organization_description
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors h-32 resize-y`}
            name="organization_description"
            id="organization_description"
            onChange={onChangeHandler}
            defaultValue={organization?.description ?? ""}
            aria-invalid={!!errors.organization_description}
            aria-describedby={
              errors.organization_description
                ? "err-organization_description"
                : undefined
            }
          />
          {errors.organization_description && (
            <p
              id="err-organization_description"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.organization_description}
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

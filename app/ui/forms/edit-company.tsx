// description: Form to edit an existing company entry
// file: app/ui/forms/edit-company.tsx

"use client";

import React, { useRef, useState, useTransition } from "react";
import { SubmitButton } from "../submit-button";
import { updateCompany } from "@/app/lib/actions";
import { Company } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

type Props = { company: Company };

export default function EditCompany({ company }: Props) {
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
  const isValidEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);
  const isValidPhone = (v: string) => /^\+?[0-9\s\-()]{7,}$/.test(v);
  const isValidUrl = (v: string) => /^https?:\/\/\S+$/.test(v);

  const validate = (data: FormData) => {
    const out: Record<string, string> = {};
    const companyName = (data.get("company_name") as string | null) ?? "";
    const email = (data.get("email") as string | null) ?? "";
    const phone = (data.get("phone") as string | null) ?? "";
    const website = (data.get("website_url") as string | null) ?? "";
    const companyId = (data.get("company_id") as string | null) ?? "";

    if (!companyId.trim()) out.company_id = "Missing company id.";
    if (!companyName.trim()) out.company_name = "Company name is required.";

    if (!email.trim()) {
      out.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      out.email = "Please provide a valid email address.";
    }

    if (!phone.trim()) {
      out.phone = "Phone is required.";
    } else if (!isValidPhone(phone)) {
      out.phone = "Please provide a valid phone number.";
    }

    if (!website.trim()) {
      out.website_url = "Website URL is required.";
    } else if (!isValidUrl(website)) {
      out.website_url = "Please provide a valid URL (include http/https).";
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
      const result = (await updateCompany(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to update company. Please try again.");
          console.error("updateCompany failed:", result);
        }
        return;
      }

      setEdited(false);
      setStatusMessage("Company updated successfully!");

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error("Unexpected error updating company:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const createdAt = company?.created_at
    ? company.created_at.toLocaleString()
    : company?.created_at
      ? String(company.created_at)
      : "N/A";

  const updatedAt = company?.updated_at
    ? company.updated_at.toLocaleString()
    : company?.updated_at
      ? String(company.updated_at)
      : "N/A";

  return (
    <div className="overflow-y-auto w-full max-w-3xl px-4 sm:px-6 pb-8">
      <h2 className="font-medium text-3xl sm:text-4xl py-4 text-gray-900 dark:text-gray-100">
        Edit Company
      </h2>

      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="edit-company-container edit-company-form space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
        <input
          hidden
          readOnly
          name="company_id"
          id="company_id"
          defaultValue={company?.id ?? ""}
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
            defaultValue={company?.name ?? ""}
            onChange={onChangeHandler}
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
            htmlFor="address_one"
          >
            Address Line 1
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.address_one
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            name="address_one"
            id="address_one"
            defaultValue={company?.address_one ?? ""}
            onChange={onChangeHandler}
            aria-invalid={!!errors.address_one}
            aria-describedby={
              errors.address_one ? "err-address_one" : undefined
            }
          />
          {errors.address_one && (
            <p
              id="err-address_one"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.address_one}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="address_two"
          >
            Address Line 2
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.address_two
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            name="address_two"
            id="address_two"
            defaultValue={company?.address_two ?? ""}
            onChange={onChangeHandler}
            aria-invalid={!!errors.address_two}
            aria-describedby={
              errors.address_two ? "err-address_two" : undefined
            }
          />
          {errors.address_two && (
            <p
              id="err-address_two"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.address_two}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="recipient_title"
          >
            Recipient Title
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.recipient_title
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            name="recipient_title"
            id="recipient_title"
            defaultValue={company?.recipient_title ?? ""}
            onChange={onChangeHandler}
            aria-invalid={!!errors.recipient_title}
            aria-describedby={
              errors.recipient_title ? "err-recipient_title" : undefined
            }
          />
          {errors.recipient_title && (
            <p
              id="err-recipient_title"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.recipient_title}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.email
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              required
              name="email"
              id="email"
              type="email"
              defaultValue={company?.email ?? ""}
              onChange={onChangeHandler}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email && (
              <p
                id="err-email"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.phone
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              required
              name="phone"
              id="phone"
              type="tel"
              defaultValue={company?.phone ?? ""}
              onChange={onChangeHandler}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "err-phone" : undefined}
            />
            {errors.phone && (
              <p
                id="err-phone"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="website_url"
          >
            Website URL
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.website_url
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            required
            name="website_url"
            id="website_url"
            type="url"
            defaultValue={company?.website_url ?? ""}
            onChange={onChangeHandler}
            aria-invalid={!!errors.website_url}
            aria-describedby={
              errors.website_url ? "err-website_url" : undefined
            }
            placeholder="https://example.com"
          />
          {errors.website_url && (
            <p
              id="err-website_url"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.website_url}
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

"use client";

import React, { useRef, useState, useTransition } from "react";
import { SubmitButton } from "../submit-button";
import { updateCompany } from "@/app/lib/actions";
import { Company } from "@/app/lib/definitions";
import BackButton from "../back-button";
import { useRouter } from "next/navigation";

export default function EditCompany({ company }: { company: Company }) {
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

  // handle form submit in client and call updateCompany
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
      // NOTE: If updateCompany is a Next.js server action ("use server"),
      // you cannot import & call it from a client component. In that case:
      //  - move this form to a server component and set `action={updateCompany}`
      //  - or call an API route here that invokes the server action.
      const result = (await updateCompany(formData)) as any;

      if (result?.errors) {
        // adapt to your server error shape
        if (result.errors && typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to save updates. Please try again.");
          console.error("Update company failed:", result);
        }
        return;
      }

      // Success — refresh or redirect
      startTransition(() => {
        // you can also show a toast instead of redirect
        router.push("/dashboard/companies");
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
    <div>
      <BackButton className="" href={"/dashboard/companies/"}>
        Back
      </BackButton>

      <h2 className="font-medium text-[2rem] py-1">Edit Company</h2>

      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="flex flex-col form-amber px-3 pt-3 pb-1 space-y-4"
        noValidate
      >
        <input
          hidden
          readOnly
          name="company_id"
          id="company_id"
          defaultValue={company?.id ?? ""}
        />

        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-col">
            <h3 className="font-bold text-sm">Date Created</h3>
            <div className="bg-white tight-shadow rounded p-2">
              <p>{createdAt.slice(0, 24)}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-sm">Date Updated</h3>
            <div className="bg-white tight-shadow rounded p-2">
              <p>{updatedAt.slice(0, 24)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="company_name">
            Company Name
          </label>
          <input
            required
            name="company_name"
            id="company_name"
            className="tight-shadow mt-1 p-2 border rounded"
            defaultValue={company?.name ?? ""}
            onChange={onChangeHandler}
            aria-invalid={!!errors.company_name}
            aria-describedby={
              errors.company_name ? "err-company_name" : undefined
            }
          />
          {errors.company_name && (
            <p id="err-company_name" className="text-sm text-red-600 mt-1">
              {errors.company_name}
            </p>
          )}
        </div>

        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="address_one">
            Address One
          </label>
          <input
            required
            name="address_one"
            id="address_one"
            className="mt-1 p-2 border rounded"
            defaultValue={company?.address_one ?? ""}
            onChange={onChangeHandler}
            aria-invalid={!!errors.address_one}
            aria-describedby={
              errors.address_one ? "err-address_one" : undefined
            }
          />
          {errors.address_one && (
            <p id="err-address_one" className="text-sm text-red-600 mt-1">
              {errors.address_one}
            </p>
          )}
        </div>

        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="address_two">
            Address Two
          </label>
          <input
            required
            name="address_two"
            id="address_two"
            className="mt-1 p-2 border rounded"
            defaultValue={company?.address_two ?? ""}
            onChange={onChangeHandler}
            aria-invalid={!!errors.address_two}
            aria-describedby={
              errors.address_two ? "err-address_two" : undefined
            }
          />
          {errors.address_two && (
            <p id="err-address_two" className="text-sm text-red-600 mt-1">
              {errors.address_two}
            </p>
          )}
        </div>

        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="recipient_title">
            Recipient Title
          </label>
          <input
            required
            name="recipient_title"
            id="recipient_title"
            className="mt-1 p-2 border rounded"
            defaultValue={company?.recipient_title ?? ""}
            onChange={onChangeHandler}
            aria-invalid={!!errors.recipient_title}
            aria-describedby={
              errors.recipient_title ? "err-recipient_title" : undefined
            }
          />
          {errors.recipient_title && (
            <p id="err-recipient_title" className="text-sm text-red-600 mt-1">
              {errors.recipient_title}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1 flex flex-col py-2">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              required
              name="email"
              id="email"
              type="email"
              className="mt-1 p-2 border rounded"
              defaultValue={company?.email ?? ""}
              onChange={onChangeHandler}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email && (
              <p id="err-email" className="text-sm text-red-600 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex-1 flex flex-col py-2">
            <label className="font-bold" htmlFor="phone">
              Phone
            </label>
            <input
              required
              name="phone"
              id="phone"
              type="tel"
              className="mt-1 p-2 border rounded"
              defaultValue={company?.phone ?? ""}
              onChange={onChangeHandler}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "err-phone" : undefined}
            />
            {errors.phone && (
              <p id="err-phone" className="text-sm text-red-600 mt-1">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="website_url">
            Website Url
          </label>
          <input
            required
            name="website_url"
            id="website_url"
            type="url"
            className="mt-1 p-2 border rounded"
            defaultValue={company?.website_url ?? ""}
            onChange={onChangeHandler}
            aria-invalid={!!errors.website_url}
            aria-describedby={
              errors.website_url ? "err-website_url" : undefined
            }
            placeholder="https://example.com"
          />
          {errors.website_url && (
            <p id="err-website_url" className="text-sm text-red-600 mt-1">
              {errors.website_url}
            </p>
          )}
        </div>

        <div aria-live="polite" aria-atomic="true" className="min-h-[1.25rem]">
          {statusMessage && (
            <p className="text-sm text-red-600">{statusMessage}</p>
          )}
        </div>

        {edited && (
          <div>
            <SubmitButton
              type="submit"
              className="btn btn-amber my-2 rounded"
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

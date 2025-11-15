"use client";

import React, { useRef, useState, useTransition } from "react";
import { SubmitButton } from "../submit-button";
import { createCompany } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import BackButton from "../back-button";
import { useRouter } from "next/navigation";

type Props = { user: User };

export default function NewCompany({ user }: Props) {
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

    const companyName = (data.get("company_name") as string | null) ?? "";
    const addressOne = (data.get("address_one") as string | null) ?? "";
    const addressTwo = (data.get("address_two") as string | null) ?? "";
    const recipientTitle = (data.get("recipient_title") as string | null) ?? "";
    const email = (data.get("email") as string | null) ?? "";
    const phone = (data.get("phone") as string | null) ?? "";
    const website = (data.get("website_url") as string | null) ?? "";
    const userId = (data.get("user_id") as string | null) ?? "";

    // Required checks
    if (!companyName.trim()) out.company_name = "Company name is required.";
    if (!addressOne.trim()) out.address_one = "Address One is required.";
    if (!addressTwo.trim()) out.address_two = "Address Two is required.";
    if (!recipientTitle.trim())
      out.recipient_title = "Recipient title is required.";
    if (!email.trim()) {
      out.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      out.email = "Please provide a valid email address.";
    }
    if (!phone.trim()) {
      out.phone = "Phone is required.";
    } else if (!/^\+?[0-9\s\-()]{7,}$/.test(phone)) {
      out.phone = "Please provide a valid phone number.";
    }
    if (!website.trim()) {
      out.website_url = "Website URL is required.";
    } else if (!/^https?:\/\/\S+$/.test(website)) {
      out.website_url = "Please provide a valid URL (include http/https).";
    }
    if (!userId.trim()) {
      out.user_id = "User ID is missing.";
    }

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
      const result = (await createCompany(formData)) as any;

      if (result?.errors) {
        // Map server validation errors if provided in a predictable shape
        if (result.errors && typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to create company. Please try again.");
          console.error("Create company failed:", result);
        }
        return;
      }

      startTransition(() => {
        router.push("/dashboard/companies");
      });
    } catch (err) {
      console.error("Unexpected error creating company:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-2">
      <BackButton className="" href={"/dashboard/companies"}>
        Back
      </BackButton>

      <div className="flex flex-row justify-between items-center mt-4 mb-2">
        <div className="flex flex-col">
          <h1 className="text-[2rem] font-bold">Add New Company</h1>
          <p className="text-sm text-muted-foreground">
            All fields are required.
          </p>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={handleCreate}
        className="flex flex-col w-full max-w-xl form-amber px-3 pb-2 space-y-3"
        noValidate
      >
        {/* hidden user_id */}
        <input
          hidden
          readOnly
          name="user_id"
          id="user_id"
          defaultValue={user?.id ?? ""}
        />

        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="company_name">
            Company Name
          </label>
          <input
            required
            name="company_name"
            id="company_name"
            defaultValue=""
            onChange={onChangeHandler}
            aria-invalid={!!errors.company_name}
            aria-describedby={
              errors.company_name ? "err-company_name" : undefined
            }
            className="mt-1 p-2 border rounded"
            autoComplete="organization"
            autoFocus
          />
          {errors.company_name && (
            <p id="err-company_name" className="text-sm text-red-600 mt-1">
              {errors.company_name}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1 flex flex-col py-2">
            <label className="font-bold" htmlFor="address_one">
              Address One
            </label>
            <input
              required
              name="address_one"
              id="address_one"
              defaultValue=""
              onChange={onChangeHandler}
              aria-invalid={!!errors.address_one}
              aria-describedby={
                errors.address_one ? "err-address_one" : undefined
              }
              className="mt-1 p-2 border rounded"
              autoComplete="street-address"
            />
            {errors.address_one && (
              <p id="err-address_one" className="text-sm text-red-600 mt-1">
                {errors.address_one}
              </p>
            )}
          </div>

          <div className="flex-1 flex flex-col py-2">
            <label className="font-bold" htmlFor="address_two">
              Address Two
            </label>
            <input
              required
              name="address_two"
              id="address_two"
              defaultValue=""
              onChange={onChangeHandler}
              aria-invalid={!!errors.address_two}
              aria-describedby={
                errors.address_two ? "err-address_two" : undefined
              }
              className="mt-1 p-2 border rounded"
              autoComplete="address-line2"
            />
            {errors.address_two && (
              <p id="err-address_two" className="text-sm text-red-600 mt-1">
                {errors.address_two}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 flex flex-col py-2">
            <label className="font-bold" htmlFor="recipient_title">
              Recipient Title
            </label>
            <input
              required
              name="recipient_title"
              id="recipient_title"
              defaultValue=""
              onChange={onChangeHandler}
              aria-invalid={!!errors.recipient_title}
              aria-describedby={
                errors.recipient_title ? "err-recipient_title" : undefined
              }
              className="mt-1 p-2 border rounded"
            />
            {errors.recipient_title && (
              <p id="err-recipient_title" className="text-sm text-red-600 mt-1">
                {errors.recipient_title}
              </p>
            )}
          </div>

          <div className="flex-1 flex flex-col py-2">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              required
              name="email"
              id="email"
              type="email"
              defaultValue=""
              onChange={onChangeHandler}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              className="mt-1 p-2 border rounded"
              autoComplete="email"
            />
            {errors.email && (
              <p id="err-email" className="text-sm text-red-600 mt-1">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 flex flex-col py-2">
            <label className="font-bold" htmlFor="phone">
              Phone
            </label>
            <input
              required
              name="phone"
              id="phone"
              type="tel"
              defaultValue=""
              onChange={onChangeHandler}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "err-phone" : undefined}
              className="mt-1 p-2 border rounded"
              autoComplete="tel"
              placeholder="+1 (555) 555-5555"
            />
            {errors.phone && (
              <p id="err-phone" className="text-sm text-red-600 mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="flex-1 flex flex-col py-2">
            <label className="font-bold" htmlFor="website_url">
              Website URL
            </label>
            <input
              required
              name="website_url"
              id="website_url"
              type="url"
              defaultValue=""
              onChange={onChangeHandler}
              aria-invalid={!!errors.website_url}
              aria-describedby={
                errors.website_url ? "err-website_url" : undefined
              }
              className="mt-1 p-2 border rounded"
              placeholder="https://example.com"
              autoComplete="url"
            />
            {errors.website_url && (
              <p id="err-website_url" className="text-sm text-red-600 mt-1">
                {errors.website_url}
              </p>
            )}
          </div>
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
              className="btn btn-amber rounded my-3"
              disabled={isSubmitting || isPending}
            >
              {isSubmitting || isPending ? "Creating..." : "Create New Company"}
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
}

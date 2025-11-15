"use client";

import React, { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submit-button";
import { createCertification } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import BackButton from "../back-button";

type Props = { user: User };

/**
 * NewCertification (client)
 *
 * Improvements:
 * - Uses a client-side onSubmit handler with robust validation
 * - Prevents double submits and shows loading state
 * - Shows inline validation errors and a polite aria-live status region
 * - Keeps original UX of showing the submit button only after edits
 *
 * Note: If `createCertification` is a Next.js server action (uses "use server"),
 * you cannot call it directly from a client component. In that case either:
 *  - move this form into a server component and use `action={createCertification}`, or
 *  - call an API route here that invokes the server action.
 */
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
      // NOTE: If createCertification is a server action ("use server"), calling it
      // from a client component will fail. Use an API route or move form to server component.
      const result = (await createCertification(formData)) as any;

      if (result?.errors) {
        // Map server-side validation errors if in a known shape
        if (result.errors && typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to create certification. Please try again.");
          console.error("createCertification failed:", result);
        }
        return;
      }

      // Success: reset edited state and redirect to list (or show success message)
      startTransition(() => {
        router.push("/dashboard/certifications");
      });
    } catch (err) {
      console.error("Unexpected error creating certification:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-2">
      <BackButton className="" href={"/dashboard/certifications"}>
        Back
      </BackButton>

      <div className="flex flex-row justify-between items-center mt-4 mb-2">
        <div className="flex flex-col">
          <h1 className="text-[2rem] font-bold">Add New Certification</h1>
          <p className="text-sm text-muted-foreground">
            All fields are required.
          </p>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={handleCreate}
        className="flex flex-col w-full max-w-xl p-3 form-amber space-y-3"
        noValidate
      >
        <input
          hidden
          readOnly
          name="user_id"
          id="user_id"
          defaultValue={user?.id ?? ""}
        />

        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="certification_name">
            Certification Name
          </label>
          <input
            required
            name="certification_name"
            id="certification_name"
            onChange={onChangeHandler}
            defaultValue=""
            type="text"
            className="mt-1 p-2 border rounded"
            aria-invalid={!!errors.certification_name}
            aria-describedby={
              errors.certification_name ? "err-certification_name" : undefined
            }
            autoComplete="off"
            autoFocus
          />
          {errors.certification_name && (
            <p
              id="err-certification_name"
              className="text-sm text-red-600 mt-1"
            >
              {errors.certification_name}
            </p>
          )}
        </div>

        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="certification_location">
            Certification Location
          </label>
          <input
            required
            name="certification_location"
            id="certification_location"
            onChange={onChangeHandler}
            defaultValue=""
            type="text"
            className="mt-1 p-2 border rounded"
            aria-invalid={!!errors.certification_location}
            aria-describedby={
              errors.certification_location
                ? "err-certification_location"
                : undefined
            }
            autoComplete="off"
          />
          {errors.certification_location && (
            <p
              id="err-certification_location"
              className="text-sm text-red-600 mt-1"
            >
              {errors.certification_location}
            </p>
          )}
        </div>

        {/* Optional: additional fields (date, credential id) can be added here */}

        <div aria-live="polite" aria-atomic="true" className="min-h-5">
          {statusMessage && (
            <p className="text-sm text-red-600">{statusMessage}</p>
          )}
        </div>

        {edited && (
          <div>
            <SubmitButton
              type="submit"
              className="bg-yellow-400 my-4 p-2 text-center w-auto"
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

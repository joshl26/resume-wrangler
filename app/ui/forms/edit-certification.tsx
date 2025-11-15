"use client";

import React, { useRef, useState, useTransition } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserCertfication } from "@/app/lib/actions";
import { UserCertification } from "@/app/lib/definitions";
import BackButton from "../back-button";
import { useRouter } from "next/navigation";

export default function EditCertification({
  certification,
}: {
  certification: UserCertification;
}) {
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

  const handleUpdateUserCertification = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
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
      // NOTE: If updateUserCertfication is a Next.js server action (uses "use server"),
      // you cannot call it directly from a client component. In that case either:
      //  - move this form to a server component and set `action={updateUserCertfication}`, or
      //  - call an API route here that invokes the server action.
      const result = (await updateUserCertfication(formData)) as any;

      if (result?.errors) {
        // Adapt mapping depending on your server error shape
        if (result.errors && typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to save changes. Please try again.");
          console.error("updateUserCertfication failed:", result);
        }
        return;
      }

      // Success: reset edited and optionally redirect to list
      setEdited(false);
      startTransition(() => {
        // change destination as needed
        router.push("/dashboard/certifications");
      });
    } catch (err) {
      console.error("Unexpected error updating certification:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-3">
      <BackButton className="" href={"/dashboard/certifications/"}>
        Back
      </BackButton>

      <h2 className="font-medium text-[2rem] py-1">Edit Certification</h2>

      <form
        ref={formRef}
        onSubmit={handleUpdateUserCertification}
        className="flex flex-col w-full max-w-lg p-4 form-amber tight-shadow rounded bg-white"
        noValidate
      >
        {/* Hidden fields */}
        <input
          required
          hidden
          readOnly
          name="certification_id"
          id="certification_id"
          defaultValue={certification?.id ?? ""}
        />
        {/* <input
          required
          hidden
          readOnly
          name="resume_id"
          id="resume_id"
          defaultValue={certification?.resume_id ?? "blank"}
          type="text"
        /> */}
        <input
          required
          hidden
          readOnly
          name="user_id"
          id="user_id"
          defaultValue={certification?.user_id ?? "blank"}
          type="text"
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
            defaultValue={certification?.name ?? ""}
            type="text"
            className="mt-2 p-2 border rounded"
            aria-invalid={!!errors.certification_name}
            aria-describedby={
              errors.certification_name ? "err-certification_name" : undefined
            }
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
          <label className="font-bold" htmlFor="location_name">
            Location
          </label>
          <input
            required
            name="location_name"
            id="location_name"
            onChange={onChangeHandler}
            defaultValue={certification?.location ?? ""}
            type="text"
            className="mt-2 p-2 border rounded"
            aria-invalid={!!errors.location_name}
            aria-describedby={
              errors.location_name ? "err-location_name" : undefined
            }
          />
          {errors.location_name && (
            <p id="err-location_name" className="text-sm text-red-600 mt-1">
              {errors.location_name}
            </p>
          )}
        </div>

        <div aria-live="polite" aria-atomic="true" className="min-h-5 mt-2">
          {statusMessage && (
            <p className="text-sm text-red-600">{statusMessage}</p>
          )}
        </div>

        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton
              type="submit"
              className="bg-yellow-400 my-4 p-2 text-center w-auto"
              disabled={isSubmitting || isPending}
            >
              {isSubmitting || isPending ? "Saving…" : "Save Updates"}
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

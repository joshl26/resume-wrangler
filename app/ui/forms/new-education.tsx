"use client";

import React, { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submit-button";
import { createUserEducation } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import BackButton from "../back-button";

type Props = { user: User };

export default function NewEducation({ user }: Props) {
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

  const isValidUrl = (v: string) => /^https?:\/\/\S+$/.test(v);

  const validate = (data: FormData) => {
    const out: Record<string, string> = {};

    const institution = (data.get("institution_name") as string | null) ?? "";
    const location = (data.get("location") as string | null) ?? "";
    const startDate = (data.get("start_date") as string | null) ?? "";
    const endDate = (data.get("end_date") as string | null) ?? "";
    const grade = (data.get("grade") as string | null) ?? "";
    const program = (data.get("program") as string | null) ?? "";
    const url = (data.get("url") as string | null) ?? "";
    const userId = (data.get("user_id") as string | null) ?? "";

    if (!institution.trim())
      out.institution_name = "Institution name is required.";
    if (!startDate.trim()) out.start_date = "Program start date is required.";
    if (!endDate.trim()) out.end_date = "Program end date is required.";
    if (!program.trim()) out.program = "Program name is required.";
    if (!userId.trim()) out.user_id = "User id is missing.";

    if (startDate && endDate) {
      const s = Date.parse(startDate);
      const e = Date.parse(endDate);
      if (Number.isFinite(s) && Number.isFinite(e) && s > e) {
        out.end_date = "End date must be the same or after the start date.";
      }
    }

    if (url && !isValidUrl(url)) {
      out.url = "Please provide a valid URL (include http/https).";
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
      const result = (await createUserEducation(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage(
            "Failed to create education entry. Please try again.",
          );
          console.error("createUserEducation failed:", result);
        }
        return;
      }

      startTransition(() => {
        router.push("/dashboard/education");
      });
    } catch (err) {
      console.error("Unexpected error creating education:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-y-auto w-full max-w-xl px-3 pb-6">
      <h2 className="font-medium text-[2rem] py-1">Education Experience</h2>

      <form
        ref={formRef}
        onSubmit={handleCreate}
        className="new-education-container new-education-form p-3"
        noValidate
      >
        <input
          readOnly
          hidden
          name="user_id"
          id="user_id"
          defaultValue={user?.id ?? ""}
        />
        <input
          readOnly
          hidden
          name="resume_id"
          id="resume_id"
          defaultValue="blank"
          type="text"
        />

        <div className="form-group">
          <label className="form-label" htmlFor="institution_name">
            Institution Name
          </label>
          <input
            className={`form-input ${errors.institution_name ? "error" : ""}`}
            required
            name="institution_name"
            id="institution_name"
            onChange={onChangeHandler}
            defaultValue=""
            aria-invalid={!!errors.institution_name}
            aria-describedby={
              errors.institution_name ? "err-institution_name" : undefined
            }
            autoFocus
          />
          {errors.institution_name && (
            <p id="err-institution_name" className="text-sm text-red-600 mt-1">
              {errors.institution_name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label pt-2" htmlFor="location">
            Institution Location
          </label>
          <input
            name="location"
            id="location"
            onChange={onChangeHandler}
            defaultValue=""
            className={`form-input ${errors.location ? "error" : ""}`}
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? "err-location" : undefined}
          />
          {errors.location && (
            <p id="err-location" className="text-sm text-red-600 mt-1">
              {errors.location}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="form-group">
            <label className="form-label pt-2" htmlFor="start_date">
              Program Start Date
            </label>
            <input
              name="start_date"
              id="start_date"
              onChange={onChangeHandler}
              defaultValue=""
              className={`form-input ${errors.start_date ? "error" : ""}`}
              placeholder="YYYY-MM-DD"
              required
              aria-invalid={!!errors.start_date}
              aria-describedby={
                errors.start_date ? "err-start_date" : undefined
              }
            />
            {errors.start_date && (
              <p id="err-start_date" className="text-sm text-red-600 mt-1">
                {errors.start_date}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label pt-2" htmlFor="end_date">
              Program End Date
            </label>
            <input
              name="end_date"
              id="end_date"
              onChange={onChangeHandler}
              defaultValue=""
              className={`form-input ${errors.end_date ? "error" : ""}`}
              placeholder="YYYY-MM-DD"
              required
              aria-invalid={!!errors.end_date}
              aria-describedby={errors.end_date ? "err-end_date" : undefined}
            />
            {errors.end_date && (
              <p id="err-end_date" className="text-sm text-red-600 mt-1">
                {errors.end_date}
              </p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label pt-2" htmlFor="grade">
            Program Grade
          </label>
          <input
            name="grade"
            id="grade"
            onChange={onChangeHandler}
            defaultValue=""
            className={`form-input ${errors.grade ? "error" : ""}`}
            aria-invalid={!!errors.grade}
            aria-describedby={errors.grade ? "err-grade" : undefined}
          />
          {errors.grade && (
            <p id="err-grade" className="text-sm text-red-600 mt-1">
              {errors.grade}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label pt-2" htmlFor="program">
            Program Name
          </label>
          <input
            name="program"
            id="program"
            onChange={onChangeHandler}
            defaultValue=""
            className={`form-input ${errors.program ? "error" : ""}`}
            required
            aria-invalid={!!errors.program}
            aria-describedby={errors.program ? "err-program" : undefined}
          />
          {errors.program && (
            <p id="err-program" className="text-sm text-red-600 mt-1">
              {errors.program}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label pt-2" htmlFor="url">
            Link (Web URL)
          </label>
          <input
            name="url"
            id="url"
            onChange={onChangeHandler}
            defaultValue=""
            className={`form-input ${errors.url ? "error" : ""}`}
            placeholder="https://example.com"
            aria-invalid={!!errors.url}
            aria-describedby={errors.url ? "err-url" : undefined}
          />
          {errors.url && (
            <p id="err-url" className="text-sm text-red-600 mt-1">
              {errors.url}
            </p>
          )}
        </div>

        <div aria-live="polite" aria-atomic="true" className="min-h-5">
          {statusMessage && (
            <p className="text-sm text-red-600">{statusMessage}</p>
          )}
        </div>

        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton
              type="submit"
              className="btn btn-amber my-4 p-2 text-center w-auto"
              disabled={isSubmitting || isPending}
            >
              {isSubmitting || isPending
                ? "Creating..."
                : "Create New Education Experience"}
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

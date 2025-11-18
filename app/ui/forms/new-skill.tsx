// description: Form to create a new skill for the user
// file: app/ui/forms/new-skill.tsx

"use client";

import React, { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submit-button";
import { createUserSkill } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";

type Props = { user: User };

export default function NewSkill({ user }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [skillLevel, setSkillLevel] = useState("50");

  const onChangeHandler = () => {
    if (!edited) setEdited(true);
  };

  const skillOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillLevel(e.target.value);
    onChangeHandler();
  };

  const validate = (data: FormData) => {
    const out: Record<string, string> = {};

    const skillTitle = (data.get("skill_title") as string | null) ?? "";
    const skillLevel = (data.get("skill_level") as string | null) ?? "";
    const userId = (data.get("user_id") as string | null) ?? "";

    if (!skillTitle.trim()) out.skill_title = "Skill name is required.";
    if (!skillLevel.trim()) out.skill_level = "Skill level is required.";
    if (!userId.trim()) out.user_id = "User id is missing.";

    const level = parseInt(skillLevel, 10);
    if (!Number.isFinite(level) || level < 0 || level > 100) {
      out.skill_level = "Skill level must be between 0 and 100.";
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
      const result = (await createUserSkill(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to create skill. Please try again.");
          console.error("createUserSkill failed:", result);
        }
        return;
      }

      startTransition(() => {
        router.push("/dashboard/skills");
      });
    } catch (err) {
      console.error("Unexpected error creating skill:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-y-auto w-full max-w-xl px-3 pb-6">
      <h2 className="font-medium text-[2rem] py-1">Create New Skill</h2>

      <form
        ref={formRef}
        onSubmit={handleCreate}
        className="new-skill-container new-skill-form p-3"
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
          name="section_title"
          id="section_title"
          defaultValue="blank"
          type="text"
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
          <label className="form-label" htmlFor="skill_title">
            Skill Name
          </label>
          <input
            className={`form-input ${errors.skill_title ? "error" : ""}`}
            required
            name="skill_title"
            id="skill_title"
            onChange={onChangeHandler}
            defaultValue=""
            aria-invalid={!!errors.skill_title}
            aria-describedby={
              errors.skill_title ? "err-skill_title" : undefined
            }
            autoFocus
          />
          {errors.skill_title && (
            <p id="err-skill_title" className="text-sm text-red-600 mt-1">
              {errors.skill_title}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label pt-2" htmlFor="skill_level">
            Skill Level: {skillLevel}%
          </label>
          <input
            className={`form-input ${errors.skill_level ? "error" : ""}`}
            required
            name="skill_level"
            id="skill_level"
            onChange={skillOnChangeHandler}
            defaultValue={skillLevel}
            type="range"
            min="0"
            max="100"
            aria-invalid={!!errors.skill_level}
            aria-describedby={
              errors.skill_level ? "err-skill_level" : undefined
            }
          />
          {errors.skill_level && (
            <p id="err-skill_level" className="text-sm text-red-600 mt-1">
              {errors.skill_level}
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
              {isSubmitting || isPending ? "Creating..." : "Create New Skill"}
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

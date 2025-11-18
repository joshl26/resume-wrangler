// description: Form to edit an existing user skill
// file: app/ui/forms/edit-skill.tsx

"use client";

import React, { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submit-button";
import { updateUserSkill } from "@/app/lib/actions";
import { UserSkill } from "@/app/lib/definitions";

type Props = { skill: UserSkill };

export default function EditSkill({ skill }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [skillLevel, setSkillLevel] = useState(skill?.skill_level ?? "50");

  const onChangeHandler = () => {
    if (!edited) setEdited(true);
  };

  const skillOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillLevel(e.target.value);
    onChangeHandler();
  };

  const validate = (data: FormData) => {
    const out: Record<string, string> = {};

    const skillName = (data.get("skill_name") as string | null) ?? "";
    const skillLevel = (data.get("skill_level") as string | null) ?? "";
    const skillId = (data.get("skill_id") as string | null) ?? "";

    if (!skillName.trim()) out.skill_name = "Skill name is required.";
    if (!skillLevel.trim()) out.skill_level = "Skill level is required.";
    if (!skillId.trim()) out.skill_id = "Skill id is missing.";

    const level = parseInt(skillLevel, 10);
    if (!Number.isFinite(level) || level < 0 || level > 100) {
      out.skill_level = "Skill level must be between 0 and 100.";
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
      const result = (await updateUserSkill(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to update skill. Please try again.");
          console.error("updateUserSkill failed:", result);
        }
        return;
      }

      setEdited(false);
      setStatusMessage("Skill updated successfully!");

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error("Unexpected error updating skill:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-y-auto w-full max-w-2xl px-4 sm:px-6 pb-8">
      <h2 className="font-medium text-3xl sm:text-4xl py-4 text-gray-900 dark:text-gray-100">
        Edit Skill
      </h2>

      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="edit-skill-container edit-skill-form space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
        <input
          readOnly
          hidden
          name="skill_id"
          id="skill_id"
          defaultValue={skill?.id ?? ""}
        />
        <input
          readOnly
          hidden
          name="resume_id"
          id="resume_id"
          defaultValue="blank"
          type="text"
        />
        <input
          readOnly
          hidden
          name="user_id"
          id="user_id"
          defaultValue="blank"
          type="text"
        />

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="skill_name"
          >
            Skill Name
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.skill_name
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            required
            name="skill_name"
            id="skill_name"
            onChange={onChangeHandler}
            defaultValue={skill?.skill ?? ""}
            aria-invalid={!!errors.skill_name}
            aria-describedby={errors.skill_name ? "err-skill_name" : undefined}
            autoFocus
          />
          {errors.skill_name && (
            <p
              id="err-skill_name"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.skill_name}
            </p>
          )}
        </div>

        <div className="form-group space-y-3">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="skill_level"
          >
            Skill Level:{" "}
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {skillLevel}%
            </span>
          </label>
          <input
            className={`form-input w-full h-3 rounded-lg appearance-none cursor-pointer
              bg-gray-200 dark:bg-gray-600
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-blue-600
              [&::-webkit-slider-thumb]:dark:bg-blue-500
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:hover:bg-blue-700
              [&::-webkit-slider-thumb]:dark:hover:bg-blue-400
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-blue-600
              [&::-moz-range-thumb]:dark:bg-blue-500
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:hover:bg-blue-700
              [&::-moz-range-thumb]:dark:hover:bg-blue-400
              ${errors.skill_level ? "ring-2 ring-red-500 dark:ring-red-400" : ""}
            `}
            required
            name="skill_level"
            id="skill_level"
            onChange={skillOnChangeHandler}
            defaultValue={skill?.skill_level ?? "50"}
            type="range"
            min="0"
            max="100"
            aria-invalid={!!errors.skill_level}
            aria-describedby={
              errors.skill_level ? "err-skill_level" : undefined
            }
          />
          {errors.skill_level && (
            <p
              id="err-skill_level"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.skill_level}
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
              {isSubmitting || isPending ? "Saving..." : "Save Update"}
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
}

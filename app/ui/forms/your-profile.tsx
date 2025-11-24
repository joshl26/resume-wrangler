"use client";

import { State, updateUser } from "@/app/lib/actions";
import Image from "next/image";
import { useRef, useState, useTransition, useEffect } from "react";
import { SubmitButton } from "../submit-button";
import { Resume, User } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import "./your-profile.css";

type Props = {
  user: User;
  resume: Resume;
};

type ValidationErrors = Record<string, string>;

export default function YourProfile({ user, resume }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (statusMessage?.type === "success") {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const onChangeHandler = () => {
    if (!edited) setEdited(true);
    if (statusMessage) setStatusMessage(null);
  };

  const isValidPhone = (v: string) => {
    if (!v) return true;
    const cleaned = v.replace(/\D/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
  };

  const isValidUrl = (v: string) => {
    if (!v) return true;
    try {
      const url = new URL(v);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const validate = (data: FormData): ValidationErrors => {
    const out: ValidationErrors = {};
    const firstName = (data.get("first_name") as string | null)?.trim() ?? "";
    const lastName = (data.get("last_name") as string | null)?.trim() ?? "";
    const phone = (data.get("phone") as string | null)?.trim() ?? "";
    const website = (data.get("website") as string | null)?.trim() ?? "";

    if (!firstName) out.first_name = "First name is required";
    else if (firstName.length < 2)
      out.first_name = "First name must be at least 2 characters";

    if (!lastName) out.last_name = "Last name is required";
    else if (lastName.length < 2)
      out.last_name = "Last name must be at least 2 characters";

    if (phone && !isValidPhone(phone)) {
      out.phone = "Please enter a valid phone number (10-15 digits)";
    }

    if (website && !isValidUrl(website)) {
      out.website =
        "Please enter a valid URL starting with http:// or https://";
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
      setStatusMessage({
        type: "error",
        text: "Please fix the errors below",
      });

      const firstKey = Object.keys(validation)[0];
      const el = form.querySelector(
        `[name="${firstKey}"]`,
      ) as HTMLElement | null;
      el?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updateUser(
        user!.id,
        user as unknown as State,
        formData,
      );

      if (result?.errors) {
        const normalizedErrors: ValidationErrors = Object.fromEntries(
          Object.entries(result.errors).map(([key, val]) => {
            const msg = Array.isArray(val) ? val.join(" ") : String(val ?? "");
            return [key, msg];
          }),
        );

        setErrors(normalizedErrors);
        setStatusMessage({
          type: "error",
          text: "Failed to update profile. Please check the fields below.",
        });
        return;
      }

      setEdited(false);
      setStatusMessage({
        type: "success",
        text: "Profile updated successfully!",
      });

      startTransition(() => router.refresh());
    } catch (err) {
      console.error("Unexpected error updating profile:", err);
      setStatusMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = (fieldName: string) =>
    `form-input w-full px-4 py-3 rounded-lg border-2 ${
      errors[fieldName]
        ? "border-red-600 dark:border-red-500 focus:border-red-600 dark:focus:border-red-500"
        : "border-gray-300 dark:border-gray-500 focus:border-amber-500 dark:focus:border-amber-400"
    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 ${
      errors[fieldName]
        ? "focus:ring-red-300 dark:focus:ring-red-900/40"
        : "focus:ring-amber-300 dark:focus:ring-amber-900/40"
    } transition-all duration-200 outline-none`;

  return (
    <div className="your-profile-container">
      {/* Header */}
      <div className="your-profile-header">
        <h2 className="your-profile-title">Your Profile</h2>
        <p className="your-profile-subtitle">
          Manage your personal information and contact details
        </p>
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div
          className={`status-message ${
            statusMessage.type === "success" ? "status-success" : "status-error"
          }`}
          role="alert"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {statusMessage.type === "success" ? (
                <svg
                  className="status-icon-success"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="status-icon-error"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p>{statusMessage.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Image Section */}
      <div className="profile-image-section">
        <h3 className="profile-image-title">Profile Image</h3>
        <div className="profile-image-wrapper">
          <Image
            className="profile-image"
            alt="Profile"
            height={200}
            width={200}
            src={user?.thumbnail}
          />
          {user.access_level !== "template" && (
            <a className="update-image-button" href="/dashboard/user-profile/">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Update Image
            </a>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="profile-form"
        noValidate
      >
        {/* Hidden Fields */}
        <input
          hidden
          readOnly
          value={resume?.id || ""}
          id="resume_id"
          name="resume_id"
        />
        <input hidden readOnly value={user?.name || ""} id="name" name="name" />
        <input
          hidden
          readOnly
          id="email"
          name="email"
          defaultValue={user?.email || ""}
        />

        {/* Name Fields */}
        <div className="name-fields">
          <div className="form-group">
            <label htmlFor="first_name">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              className={`${inputClassName("first_name")} ${errors.first_name ? "error" : ""}`}
              required
              id="first_name"
              name="first_name"
              defaultValue={user?.first_name || ""}
              onChange={onChangeHandler}
              placeholder="John"
              autoComplete="given-name"
              aria-invalid={!!errors.first_name}
              aria-describedby={
                errors.first_name ? "err-first_name" : undefined
              }
              autoFocus
            />
            {errors.first_name && (
              <p id="err-first_name" className="error-message">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.first_name}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="last_name">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              className={`${inputClassName("last_name")} ${errors.last_name ? "error" : ""}`}
              required
              id="last_name"
              name="last_name"
              defaultValue={user?.last_name || ""}
              onChange={onChangeHandler}
              placeholder="Doe"
              autoComplete="family-name"
              aria-invalid={!!errors.last_name}
              aria-describedby={errors.last_name ? "err-last_name" : undefined}
            />
            {errors.last_name && (
              <p id="err-last_name" className="error-message">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.last_name}
              </p>
            )}
          </div>
        </div>

        {/* Address Fields */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 pt-4 border-t border-gray-300 dark:border-gray-700">
            Address Information
          </h3>

          <div className="form-group">
            <label htmlFor="address_one">City, Province/State</label>
            <input
              className={`${inputClassName("address_one")} ${errors.address_one ? "error" : ""}`}
              id="address_one"
              name="address_one"
              defaultValue={user?.address_one || ""}
              onChange={onChangeHandler}
              placeholder="Toronto, ON"
              autoComplete="address-level2"
              aria-invalid={!!errors.address_one}
              aria-describedby={
                errors.address_one ? "err-address_one" : undefined
              }
            />
            {errors.address_one && (
              <p className="error-message">{errors.address_one}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address_two">Street Address</label>
            <input
              className={`${inputClassName("address_two")} ${errors.address_two ? "error" : ""}`}
              id="address_two"
              name="address_two"
              defaultValue={user?.address_two || ""}
              onChange={onChangeHandler}
              placeholder="123 Main Street"
              autoComplete="street-address"
              aria-invalid={!!errors.address_two}
              aria-describedby={
                errors.address_two ? "err-address_two" : undefined
              }
            />
            {errors.address_two && (
              <p className="error-message">{errors.address_two}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address_three">Apartment/Unit</label>
            <input
              className={`${inputClassName("address_three")} ${errors.address_three ? "error" : ""}`}
              id="address_three"
              name="address_three"
              defaultValue={user?.address_three || ""}
              onChange={onChangeHandler}
              placeholder="Apt 4B"
              autoComplete="address-line2"
              aria-invalid={!!errors.address_three}
              aria-describedby={
                errors.address_three ? "err-address_three" : undefined
              }
            />
            {errors.address_three && (
              <p className="error-message">{errors.address_three}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              className={`${inputClassName("country")} ${errors.country ? "error" : ""}`}
              id="country"
              name="country"
              defaultValue={user?.country || ""}
              onChange={onChangeHandler}
              placeholder="Canada"
              autoComplete="country-name"
              aria-invalid={!!errors.country}
              aria-describedby={errors.country ? "err-country" : undefined}
            />
            {errors.country && (
              <p className="error-message">{errors.country}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 pt-4 border-t border-gray-300 dark:border-gray-700">
            Contact Information
          </h3>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              className={`${inputClassName("phone")} ${errors.phone ? "error" : ""}`}
              id="phone"
              name="phone"
              type="tel"
              defaultValue={user?.phone || ""}
              onChange={onChangeHandler}
              placeholder="+1 (555) 123-4567"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "err-phone" : undefined}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              className={`${inputClassName("website")} ${errors.website ? "error" : ""}`}
              id="website"
              name="website"
              type="url"
              defaultValue={user?.website || ""}
              onChange={onChangeHandler}
              placeholder="https://www.yoursite.com"
              autoComplete="url"
              aria-invalid={!!errors.website}
              aria-describedby={errors.website ? "err-website" : undefined}
            />
            {errors.website && (
              <p className="error-message">{errors.website}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        {edited && (
          <div className="submit-button-wrapper">
            <SubmitButton
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-500 dark:hover:to-orange-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isSubmitting || isPending}
            >
              {isSubmitting || isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving Changes...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </span>
              )}
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
}

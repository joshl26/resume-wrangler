// app/ui/forms/your-profile.tsx
"use client";

import { State, updateUser } from "@/app/lib/actions";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { SubmitButton } from "../submit-button";
import { Resume, User } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
  resume: Resume;
};

export default function YourProfile({ user, resume }: Props) {
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
  const isValidPhone = (v: string) => !v || /^\+?[0-9\s\-()]{7,}$/.test(v);
  const isValidUrl = (v: string) => !v || /^https?:\/\/\S+$/.test(v);

  const validate = (data: FormData) => {
    const out: Record<string, string> = {};
    const firstName = (data.get("first_name") as string | null) ?? "";
    const lastName = (data.get("last_name") as string | null) ?? "";
    const phone = (data.get("phone") as string | null) ?? "";
    const website = (data.get("website") as string | null) ?? "";

    if (!firstName.trim()) out.first_name = "First name is required.";
    if (!lastName.trim()) out.last_name = "Last name is required.";

    if (phone.trim() && !isValidPhone(phone)) {
      out.phone = "Please provide a valid phone number.";
    }

    if (website.trim() && !isValidUrl(website)) {
      out.website = "Please provide a valid URL (include http/https).";
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
      const result = await updateUser(
        user!.id,
        user as unknown as State,
        formData,
      );

      if (result?.errors) {
        const normalizedErrors: Record<string, string> = Object.fromEntries(
          Object.entries(result.errors).map(([key, val]) => {
            const msg = Array.isArray(val) ? val.join(" ") : String(val ?? "");
            return [key, msg];
          }),
        );

        setErrors(normalizedErrors);
        setStatusMessage("Please fix the highlighted fields.");
        return;
      }

      setEdited(false);
      setStatusMessage("Profile updated successfully!");
      startTransition(() => router.refresh());
    } catch (err) {
      console.error("Unexpected error updating profile:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-y-auto w-full max-w-4xl px-4 sm:px-6 pb-8">
      <h2 className="font-medium text-3xl sm:text-4xl py-4 text-gray-900 dark:text-gray-100">
        Your Profile
      </h2>

      {/* Profile Image Section */}
      <div className="p-6 mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">
          Profile Image
        </h3>
        <div className="flex flex-col items-center gap-4">
          <Image
            className="rounded-full"
            alt="Profile"
            height={200}
            width={200}
            src={user?.thumbnail}
          />
          {user.access_level !== "template" && (
            <a
              className="inline-block rounded bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 px-6 py-2 text-white font-medium transition-colors"
              href="/dashboard/user-profile/"
            >
              Update Image
            </a>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="profile-form space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.first_name
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              required
              id="first_name"
              name="first_name"
              defaultValue={user?.first_name || ""}
              onChange={onChangeHandler}
              placeholder="First Name"
              autoComplete="given-name"
              aria-invalid={!!errors.first_name}
              aria-describedby={
                errors.first_name ? "err-first_name" : undefined
              }
              autoFocus
            />
            {errors.first_name && (
              <p
                id="err-first_name"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.first_name}
              </p>
            )}
          </div>

          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.last_name
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              required
              id="last_name"
              name="last_name"
              defaultValue={user?.last_name || ""}
              onChange={onChangeHandler}
              placeholder="Last Name"
              autoComplete="family-name"
              aria-invalid={!!errors.last_name}
              aria-describedby={errors.last_name ? "err-last_name" : undefined}
            />
            {errors.last_name && (
              <p
                id="err-last_name"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.last_name}
              </p>
            )}
          </div>
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="address_one"
          >
            City, Province/State
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.address_one
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            id="address_one"
            name="address_one"
            defaultValue={user?.address_one || ""}
            onChange={onChangeHandler}
            placeholder="City, Prov/State"
            autoComplete="address-line1"
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
            Street Address
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.address_two
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            id="address_two"
            name="address_two"
            defaultValue={user?.address_two || ""}
            onChange={onChangeHandler}
            placeholder="Street Address"
            autoComplete="address-line2"
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
            htmlFor="address_three"
          >
            Apartment/Unit
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.address_three
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            id="address_three"
            name="address_three"
            defaultValue={user?.address_three || ""}
            onChange={onChangeHandler}
            placeholder="Apartment/Unit"
            autoComplete="address-line3"
            aria-invalid={!!errors.address_three}
            aria-describedby={
              errors.address_three ? "err-address_three" : undefined
            }
          />
          {errors.address_three && (
            <p
              id="err-address_three"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.address_three}
            </p>
          )}
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="country"
          >
            Country
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.country
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            id="country"
            name="country"
            defaultValue={user?.country || ""}
            onChange={onChangeHandler}
            placeholder="Country"
            autoComplete="country"
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? "err-country" : undefined}
          />
          {errors.country && (
            <p
              id="err-country"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.country}
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
            id="phone"
            name="phone"
            type="tel"
            defaultValue={user?.phone || ""}
            onChange={onChangeHandler}
            placeholder="xxx-xxx-xxxx"
            autoComplete="tel"
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

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="website"
          >
            Website
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.website
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            id="website"
            name="website"
            type="url"
            defaultValue={user?.website || ""}
            onChange={onChangeHandler}
            placeholder="https://www.your-site.com"
            autoComplete="url"
            aria-invalid={!!errors.website}
            aria-describedby={errors.website ? "err-website" : undefined}
          />
          {errors.website && (
            <p
              id="err-website"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.website}
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
              {isSubmitting || isPending ? "Saving..." : "Save Changes"}
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
}

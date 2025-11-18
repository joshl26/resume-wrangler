// description: Form to edit user details, socials, and image
// file: app/ui/forms/user-edit-form.tsx

"use client";

import React, { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  deleteUserImage,
  updateUserDetails,
  updateUserSocials,
  deleteAccount,
} from "@/app/lib/actions";
import type { User } from "@/app/lib/definitions";

import { SubmitButton } from "../submit-button";
import ImagePicker from "../image-picker/image-picker";
import BackButton from "../back-button";

type Props = { user: User };

const UserDetailsEditForm = ({ user }: Props) => {
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
      const result = (await updateUserDetails(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to update details. Please try again.");
          console.error("updateUserDetails failed:", result);
        }
        return;
      }

      setEdited(false);
      setStatusMessage("Details updated successfully!");

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error("Unexpected error updating details:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="font-medium text-2xl sm:text-3xl py-4 text-gray-900 dark:text-gray-100">
        Edit User Details
      </h2>

      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
        <input type="hidden" name="id" value={user?.id} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="name"
            >
              Username
            </label>
            <input
              className="form-input w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              id="name"
              name="name"
              defaultValue={user?.name}
              disabled
              autoComplete="username"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Username cannot be changed
            </p>
          </div>

          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="form-input w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              id="email"
              name="email"
              defaultValue={user?.email}
              disabled
              autoComplete="email"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Email cannot be changed
            </p>
          </div>
        </div>

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
              onChange={onChangeHandler}
              id="first_name"
              name="first_name"
              defaultValue={user?.first_name ?? ""}
              autoComplete="given-name"
              aria-invalid={!!errors.first_name}
              aria-describedby={
                errors.first_name ? "err-first_name" : undefined
              }
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
              onChange={onChangeHandler}
              id="last_name"
              name="last_name"
              defaultValue={user?.last_name ?? ""}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="address_one"
            >
              City, Province/State
            </label>
            <input
              className="form-input w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
              onChange={onChangeHandler}
              id="address_one"
              name="address_one"
              defaultValue={user?.address_one ?? ""}
              placeholder="City, Province OR State"
              autoComplete="address-line1"
            />
          </div>

          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="address_two"
            >
              Street Address
            </label>
            <input
              className="form-input w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
              onChange={onChangeHandler}
              id="address_two"
              name="address_two"
              defaultValue={user?.address_two ?? ""}
              placeholder="Street Address"
              autoComplete="address-line2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="address_three"
            >
              Apartment/Unit
            </label>
            <input
              className="form-input w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
              onChange={onChangeHandler}
              id="address_three"
              name="address_three"
              defaultValue={user?.address_three ?? ""}
              placeholder="Apartment/Unit"
              autoComplete="address-line3"
            />
          </div>

          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.phone
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              onChange={onChangeHandler}
              id="phone"
              name="phone"
              type="tel"
              placeholder="123-456-7891"
              defaultValue={user?.phone ?? ""}
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
            onChange={onChangeHandler}
            id="website"
            name="website"
            type="url"
            placeholder="https://www.yoursite.com"
            defaultValue={user?.website ?? ""}
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
              className={`text-sm font-medium ${statusMessage.includes("success") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
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
};

const UserSocialsEditForm = ({ user }: Props) => {
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

  const isValidUrl = (v: string) => !v || /^https?:\/\/\S+$/.test(v);

  const validate = (data: FormData) => {
    const out: Record<string, string> = {};
    const fields = ["linked_in", "twitter", "facebook", "instagram", "github"];

    fields.forEach((field) => {
      const value = (data.get(field) as string | null) ?? "";
      if (value.trim() && !isValidUrl(value)) {
        out[field] = "Please provide a valid URL (include http/https).";
      }
    });

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
      const result = (await updateUserSocials(formData)) as any;

      if (result?.errors) {
        if (typeof result.errors === "object") {
          setErrors(result.errors);
          setStatusMessage("Please fix the highlighted fields.");
        } else {
          setStatusMessage("Failed to update socials. Please try again.");
          console.error("updateUserSocials failed:", result);
        }
        return;
      }

      setEdited(false);
      setStatusMessage("Social links updated successfully!");

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error("Unexpected error updating socials:", err);
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="font-medium text-2xl sm:text-3xl py-4 text-gray-900 dark:text-gray-100">
        Edit Social Links
      </h2>

      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        noValidate
      >
        <input type="hidden" name="id" value={user?.id} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="linked_in"
            >
              LinkedIn
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.linked_in
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              onChange={onChangeHandler}
              id="linked_in"
              name="linked_in"
              type="url"
              placeholder="https://linkedin.com/in/username"
              defaultValue={user?.linked_in ?? ""}
              aria-invalid={!!errors.linked_in}
              aria-describedby={errors.linked_in ? "err-linked_in" : undefined}
            />
            {errors.linked_in && (
              <p
                id="err-linked_in"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.linked_in}
              </p>
            )}
          </div>

          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="twitter"
            >
              Twitter
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.twitter
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              onChange={onChangeHandler}
              id="twitter"
              name="twitter"
              type="url"
              placeholder="https://twitter.com/username"
              defaultValue={user?.twitter ?? ""}
              aria-invalid={!!errors.twitter}
              aria-describedby={errors.twitter ? "err-twitter" : undefined}
            />
            {errors.twitter && (
              <p
                id="err-twitter"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.twitter}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="facebook"
            >
              Facebook
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.facebook
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              onChange={onChangeHandler}
              id="facebook"
              name="facebook"
              type="url"
              placeholder="https://facebook.com/username"
              defaultValue={user?.facebook ?? ""}
              aria-invalid={!!errors.facebook}
              aria-describedby={errors.facebook ? "err-facebook" : undefined}
            />
            {errors.facebook && (
              <p
                id="err-facebook"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.facebook}
              </p>
            )}
          </div>

          <div className="form-group space-y-2">
            <label
              className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="instagram"
            >
              Instagram
            </label>
            <input
              className={`form-input w-full px-4 py-3 rounded-md border ${
                errors.instagram
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
              onChange={onChangeHandler}
              id="instagram"
              name="instagram"
              type="url"
              placeholder="https://instagram.com/username"
              defaultValue={user?.instagram ?? ""}
              aria-invalid={!!errors.instagram}
              aria-describedby={errors.instagram ? "err-instagram" : undefined}
            />
            {errors.instagram && (
              <p
                id="err-instagram"
                className="text-sm text-red-600 dark:text-red-400 mt-2"
              >
                {errors.instagram}
              </p>
            )}
          </div>
        </div>

        <div className="form-group space-y-2">
          <label
            className="form-label block text-sm font-semibold text-gray-700 dark:text-gray-200"
            htmlFor="github"
          >
            GitHub
          </label>
          <input
            className={`form-input w-full px-4 py-3 rounded-md border ${
              errors.github
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
            onChange={onChangeHandler}
            id="github"
            name="github"
            type="url"
            placeholder="https://github.com/username"
            defaultValue={user?.github ?? ""}
            aria-invalid={!!errors.github}
            aria-describedby={errors.github ? "err-github" : undefined}
          />
          {errors.github && (
            <p
              id="err-github"
              className="text-sm text-red-600 dark:text-red-400 mt-2"
            >
              {errors.github}
            </p>
          )}
        </div>

        <div aria-live="polite" aria-atomic="true" className="min-h-6 pt-2">
          {statusMessage && (
            <p
              className={`text-sm font-medium ${statusMessage.includes("success") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
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
};

const UserImageEditForm = ({ user }: Props) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteUserImage = async (formData: FormData): Promise<void> => {
    setIsDeleting(true);
    try {
      const result = (await deleteUserImage(formData)) as any;
      if (result?.errors) {
        console.error("Delete user image failed:", result);
        alert("Failed to delete image. Please try again.");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error deleting user image:", err);
      alert("Unexpected error deleting image. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="font-medium text-2xl sm:text-3xl py-4 text-gray-900 dark:text-gray-100">
        Edit User Image
      </h2>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {user?.thumbnail ? (
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <Image
              src={user?.thumbnail}
              width={200}
              height={200}
              alt="User profile image"
              className="rounded-full"
            />

            <div className="flex flex-col gap-3">
              {user.access_level !== "template" ? (
                <form
                  action={(formData: FormData) =>
                    handleDeleteUserImage(formData)
                  }
                >
                  <input
                    name="image-url"
                    value={user?.thumbnail}
                    hidden
                    readOnly
                  />
                  <input name="user-id" value={user?.id} hidden readOnly />
                  <SubmitButton
                    className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Image"}
                  </SubmitButton>
                </form>
              ) : (
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="font-medium">Template User</p>
                  <p className="text-sm">Image edit not allowed.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="h-[200px] w-[200px] bg-amber-300 dark:bg-amber-600 rounded flex items-center justify-center">
              <div className="text-center text-gray-800 dark:text-gray-900">
                <p className="font-medium">Ideal image size</p>
                <p>200 x 200</p>
                <p className="text-sm">(minimum)</p>
              </div>
            </div>

            <div className="flex items-center">
              <ImagePicker user={user} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DeleteAccountSection = ({ user }: Props) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (formData: FormData) => {
    const confirmed = confirm(
      "Are you sure you want to permanently delete your account and all associated data? This action cannot be undone.",
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const result = await deleteAccount(formData);
      if (result?.success) {
        router.push("/");
      } else {
        alert(result?.error || "Failed to delete account");
      }
    } catch (err) {
      console.error("Unexpected error deleting account:", err);
      alert("Unexpected error deleting account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="mt-6 p-3 tight-shadow rounded form-amber">
      <h2 className="font-bold text-[1.5rem] text-rose-700">Delete Account</h2>
      <p className="text-sm mb-3 text-rose-700">
        Permanently remove your account and all data.
      </p>
      <form action={(formData: FormData) => handleDelete(formData)}>
        <input type="hidden" name="id" value={user?.id} />
        <SubmitButton
          className="bg-rose-700 hover:bg-rose-800 text-white"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete My Account"}
        </SubmitButton>
      </form>
    </div>
  );
};

const UserEditForm = ({ user }: { user: User }) => {
  return (
    <div className="overflow-y-auto px-2">
      <BackButton className="" href="/dashboard/">
        Back
      </BackButton>

      <UserImageEditForm user={user} />
      <UserDetailsEditForm user={user} />
      <UserSocialsEditForm user={user} />
      <DeleteAccountSection user={user} />
    </div>
  );
};

export default UserEditForm;

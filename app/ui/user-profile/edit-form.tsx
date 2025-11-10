"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  deleteUserImage,
  updateUserDetails,
  updateUserSocials,
} from "@/app/lib/actions";
import type { User } from "@/app/lib/definitions";

import { SubmitButton } from "../submit-button";
import ImagePicker from "../image-picker/image-picker";
import BackButton from "../back-button";

const UserDetailsEditForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = () => {
    if (!edited) setEdited(true);
  };

  // Wrapper for updateUserDetails action: receives FormData from the form
  const handleUpdateUserDetails = async (formData: FormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      // Pass FormData directly to server action (match your server action signature)
      const result = (await updateUserDetails(formData)) as any;
      if (result?.errors) {
        console.error("Update user details failed:", result);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error updating user details:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-3 mr-3">
      <h2 className="font-bold text-[2rem]">Edit User Details</h2>

      <form
        className="flex flex-col p-3 tight-shadow rounded form-amber"
        onSubmit={() => setEdited(false)}
        action={(formData: FormData) => handleUpdateUserDetails(formData)}
      >
        <input type="hidden" name="id" value={user?.id} />

        <div className="flex flex-row">
          <div className="flex flex-col p-1">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Username
            </label>
            <input
              onChange={() => {}}
              id="name"
              name="name"
              placeholder="Type a Username"
              defaultValue={user?.name}
              required
              disabled
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col p-1">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              onChange={() => {}}
              id="email"
              name="email"
              placeholder="something@something.com"
              required
              disabled
              defaultValue={user?.email}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col p-1">
            <label
              htmlFor="first_name"
              className="mb-2 block text-sm font-medium"
            >
              First Name
            </label>
            <input
              onChange={onChangeHandler}
              id="first_name"
              name="first_name"
              placeholder="Type your first name"
              defaultValue={user?.first_name ?? ""}
              autoComplete="given-name"
            />
          </div>

          <div className="flex flex-col p-1">
            <label
              htmlFor="last_name"
              className="mb-2 block text-sm font-medium"
            >
              Last Name
            </label>
            <input
              onChange={onChangeHandler}
              id="last_name"
              name="last_name"
              defaultValue={user?.last_name ?? ""}
              placeholder="Type your last name"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col p-1">
            <label
              htmlFor="address_one"
              className="mb-2 block text-sm font-medium"
            >
              Address Line One
            </label>
            <input
              onChange={onChangeHandler}
              id="address_one"
              name="address_one"
              defaultValue={user?.address_one ?? ""}
              placeholder="City, Province OR State"
              autoComplete="address-line1"
            />
          </div>

          <div className="flex flex-col p-1">
            <label
              htmlFor="address_two"
              className="mb-2 block text-sm font-medium"
            >
              Address Line Two
            </label>
            <input
              onChange={onChangeHandler}
              id="address_two"
              name="address_two"
              defaultValue={user?.address_two ?? ""}
              placeholder="Optional, not currently used"
              autoComplete="address-line2"
            />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col p-1">
            <label
              htmlFor="address_three"
              className="mb-2 block text-sm font-medium"
            >
              Address Line Three
            </label>
            <input
              onChange={onChangeHandler}
              id="address_three"
              name="address_three"
              defaultValue={user?.address_three ?? ""}
              placeholder="Optional, not currently used"
              autoComplete="address-line3"
            />
          </div>

          <div className="flex flex-col p-1">
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Phone Number
            </label>
            <input
              onChange={onChangeHandler}
              id="phone"
              name="phone"
              placeholder="123-456-7891"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              defaultValue={user?.phone ?? ""}
              autoComplete="tel"
            />
          </div>
        </div>

        <div>
          <label htmlFor="website" className="mb-2 block text-sm font-medium">
            Website
          </label>
          <input
            onChange={onChangeHandler}
            id="website"
            name="website"
            placeholder="https://www.yoursite.com"
            defaultValue={user?.website ?? ""}
            autoComplete="url"
          />
        </div>

        {edited && (
          <div className="w-1/2 m-auto">
            <div style={{ height: "0.5rem" }} />
            <SubmitButton
              className="btn btn-amber my-4 animate-pulse"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Change"}
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
};

const UserSocialsEditForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = () => {
    if (!edited) setEdited(true);
  };

  const handleUpdateUserSocials = async (formData: FormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      const result = (await updateUserSocials(formData)) as any;
      if (result?.errors) {
        console.error("Update socials failed:", result);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error updating socials:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <h2 className="font-bold text-[2rem]">Edit Social Links</h2>

      <form
        className="flex flex-col p-3 tight-shadow rounded mr-3 form-amber"
        onSubmit={() => setEdited(false)}
        action={(formData: FormData) => handleUpdateUserSocials(formData)}
      >
        <input type="hidden" name="id" value={user?.id} />

        <div className="flex flex-row ">
          <div className="flex flex-col p-1">
            <label
              htmlFor="linked_in"
              className="mb-2 block text-sm font-medium"
            >
              LinkedIn
            </label>
            <input
              onChange={onChangeHandler}
              id="linked_in"
              name="linked_in"
              placeholder="Type your linkedin address"
              defaultValue={user?.linked_in ?? ""}
            />
          </div>

          <div className="flex flex-col p-1">
            <label htmlFor="twitter" className="mb-2 block text-sm font-medium">
              Twitter
            </label>
            <input
              onChange={onChangeHandler}
              id="twitter"
              name="twitter"
              placeholder="Type your twitter address"
              defaultValue={user?.twitter ?? ""}
            />
          </div>
        </div>

        <div className="flex flex-row ">
          <div className="flex flex-col p-1">
            <label
              htmlFor="facebook"
              className="mb-2 block text-sm font-medium"
            >
              Facebook
            </label>
            <input
              onChange={onChangeHandler}
              id="facebook"
              name="facebook"
              placeholder="Type your facebook address"
              defaultValue={user?.facebook ?? ""}
            />
          </div>

          <div className="flex flex-col p-1">
            <label
              htmlFor="instagram"
              className="mb-2 block text-sm font-medium"
            >
              Instagram
            </label>
            <input
              onChange={onChangeHandler}
              id="instagram"
              name="instagram"
              placeholder="Type your instagram address"
              defaultValue={user?.instagram ?? ""}
            />
          </div>
        </div>

        <div className="flex flex-row ">
          <div className="flex flex-col p-1">
            <label htmlFor="github" className="mb-2 block text-sm font-medium">
              Github
            </label>
            <input
              onChange={onChangeHandler}
              id="github"
              name="github"
              placeholder="Type your Github address"
              defaultValue={user?.github ?? ""}
            />
          </div>
        </div>

        {edited && (
          <div className="w-1/2 m-auto">
            <div style={{ height: "0.5rem" }} />
            <SubmitButton
              className="btn btn-amber my-4 animate-pulse"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Change"}
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
};

const UserImageEditForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteUserImage = async (formData: FormData): Promise<void> => {
    setIsDeleting(true);
    try {
      const result = (await deleteUserImage(formData)) as any;
      if (result?.errors) {
        console.error("Delete user image failed:", result);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error deleting user image:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className=" ">
      <h2 className="font-bold text-[2rem] py-1">Edit User Image</h2>

      <div className="flex flex-col p-3 tight-shadow mr-3 rounded form-amber w-auto">
        {user?.thumbnail ? (
          <div className="flex flex-row">
            <div className="flex flex-col">
              <Image
                src={user?.thumbnail}
                width={250}
                height={250}
                alt="user image thumbnail"
                className="h-[250px] w-[250px] p-2 flex flex-row items-center justify-center rounded-full"
              />
            </div>

            <div className="flex flex-col items-center justify-center m-auto">
              <form
                action={(formData: FormData) => handleDeleteUserImage(formData)}
              >
                <input
                  name="image-url"
                  value={user?.thumbnail}
                  hidden
                  readOnly
                />
                <input name="user-id" value={user?.id} hidden readOnly />
                {user.access_level !== "template" ? (
                  <SubmitButton
                    className="btn btn-amber hover:animate-pulse rounded px-2"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Image"}
                  </SubmitButton>
                ) : (
                  <div>
                    <h2 className="px-2">Template User.</h2>
                    <h2 className="px-2">Image edit not allowed.</h2>
                  </div>
                )}
              </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="h-[250px] w-[250px] bg-amber-300 relative flex flex-row items-center justify-center">
                <div className="flex flex-col text-center">
                  <p>Ideal image size</p>
                  <p>250 x 250</p>
                  <p>(minimum)</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <ImagePicker user={user} />
            </div>
          </div>
        )}

        <input type="hidden" name="id" value={user?.id} />
      </div>
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
    </div>
  );
};

export default UserEditForm;

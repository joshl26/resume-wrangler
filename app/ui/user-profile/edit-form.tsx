"use client";

import { User } from "@/app/lib/definitions";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { updateUser, updateSocials } from "@/app/lib/actions";
import { SubmitButton } from "../submit-button";

const UserDetailsEditForm = ({ user }: { user: User | null }) => {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user?.id!);
  const [state, dispatch] = useFormState(updateUserWithId, initialState);

  const [edited, setEdited] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="p-3">
      <h2>Edit User Details</h2>
      <form
        className="flex flex-col p-3 border border-black rounded m-3"
        onSubmit={() => setEdited(false)}
        action={dispatch}
      >
        <input type="hidden" name="id" value={user?.id} />
        <div className="flex flex-row">
          <div className="flex flex-col p-1">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Username
            </label>
            <input
              onChange={(e) => {}}
              id="name"
              name="name"
              type="text"
              placeholder="Type a Username"
              defaultValue={user?.name}
              required
              disabled
            />
          </div>
          <div className="flex flex-col p-1">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              onChange={(e) => {}}
              id="email"
              name="email"
              type="email"
              value={user?.email}
              placeholder="something@something.com"
              required
              disabled
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
              onChange={(e) => onChangeHandler(e)}
              id="first_name"
              name="first_name"
              type="text"
              placeholder="Type your first name"
              defaultValue={user?.first_name}
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
              onChange={(e) => onChangeHandler(e)}
              id="last_name"
              name="last_name"
              type="text"
              defaultValue={user?.last_name}
              placeholder="Type your last name"
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
              onChange={(e) => onChangeHandler(e)}
              id="address_one"
              name="address_one"
              type="text"
              defaultValue={user?.address_one}
              placeholder="City, Province OR State"
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
              onChange={(e) => onChangeHandler(e)}
              id="address_two"
              name="address_two"
              type="text"
              defaultValue={user?.address_two}
              placeholder="Optional, not currently used"
            />
          </div>
        </div>

        <div className="flex flex-row">
          {" "}
          <div className="flex flex-col p-1">
            <label
              htmlFor="address_three"
              className="mb-2 block text-sm font-medium"
            >
              Address Line Three
            </label>
            <input
              onChange={(e) => onChangeHandler(e)}
              id="address_three"
              name="address_three"
              type="text"
              defaultValue={user?.address_three}
              placeholder="Optional, not currently used"
            />
          </div>
          <div className="flex flex-col p-1">
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Phone Number
            </label>
            <input
              onChange={(e) => onChangeHandler(e)}
              id="phone"
              name="phone"
              type="tel"
              placeholder="123-456-7891"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              defaultValue={user?.phone}
            />
          </div>
        </div>
        <div>
          <label htmlFor="website" className="mb-2 block text-sm font-medium">
            Website
          </label>
          <input
            onChange={(e) => onChangeHandler(e)}
            id="website"
            name="website"
            type="text"
            placeholder="https://www.yoursite.com"
            defaultValue={user?.website}
          />
        </div>
        {edited && (
          <div className="w-1/2 m-auto">
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
              Save Change
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
};

const UserSocialsEditForm = ({ user }: { user: User | null }) => {
  const initialState = { message: "inital state", formData: null, errors: {} };
  const updateSocialsWithId = updateSocials.bind(null, user?.id!);
  const [state, dispatch] = useFormState(updateSocialsWithId, initialState);

  const [edited, setEdited] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="p-3">
      <h2>Edit Social Links</h2>
      <form
        className="flex flex-col p-3 border border-black rounded m-3"
        onSubmit={() => setEdited(false)}
        action={dispatch}
      >
        <input type="hidden" name="id" value={user?.id} />

        <div className="flex flex-row ">
          <div className="flex flex-col p-1">
            <label
              htmlFor="linkedin"
              className="mb-2 block text-sm font-medium"
            >
              LinkedIn
            </label>
            <input
              onChange={(e) => onChangeHandler(e)}
              id="linkedin"
              name="linkedin"
              type="text"
              placeholder="Type your linkedin address"
              defaultValue={user?.linked_in}
            />
          </div>
          <div className="flex flex-col p-1">
            <label htmlFor="twitter" className="mb-2 block text-sm font-medium">
              Twitter
            </label>
            <input
              onChange={(e) => onChangeHandler(e)}
              id="twitter"
              name="twitter"
              type="text"
              placeholder="Type your twitter address"
              defaultValue={user?.twitter}
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
              onChange={(e) => onChangeHandler(e)}
              id="facebook"
              name="facebook"
              type="text"
              placeholder="Type your facebook address"
              defaultValue={user?.facebook}
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
              onChange={(e) => onChangeHandler(e)}
              id="instagram"
              name="instagram"
              type="text"
              placeholder="Type your instagram address"
              defaultValue={user?.instagram}
            />
          </div>
        </div>

        <div className="flex flex-row ">
          {" "}
          <div className="flex flex-col p-1">
            <label
              htmlFor="instagram"
              className="mb-2 block text-sm font-medium"
            >
              Instagram
            </label>
            <input
              onChange={(e) => onChangeHandler(e)}
              id="instagram"
              name="instagram"
              type="text"
              placeholder="Type your instagram address"
              defaultValue={user?.instagram}
            />
          </div>
          <div className="flex flex-col p-1">
            <label htmlFor="github" className="mb-2 block text-sm font-medium">
              Github
            </label>
            <input
              onChange={(e) => onChangeHandler(e)}
              id="github"
              name="github"
              type="text"
              placeholder="Type your Github address"
              defaultValue={user?.github}
            />
          </div>
        </div>
        {edited && (
          <div className="w-1/2 m-auto">
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
              Save Change
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
};

const UserEditForm = ({ user }: { user: User | null }) => {
  return (
    <div className="overflow-y-auto w-1/2">
      <UserDetailsEditForm user={user} />
      <UserSocialsEditForm user={user} />
    </div>
  );
};

export default UserEditForm;

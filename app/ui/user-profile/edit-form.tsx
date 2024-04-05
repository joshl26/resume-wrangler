"use client";

import { User } from "@/app/lib/definitions";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { updateUser, updateSocials, deleteUserImage } from "@/app/lib/actions";
import { SubmitButton } from "../submit-button";
import Image from "next/image";
import ImagePicker from "../image-picker/image-picker";
import BackButton from "../back-button";

const UserDetailsEditForm = ({ user }: { user: User }) => {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user?.id!);
  const [state, dispatch] = useFormState(updateUserWithId, initialState);

  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="py-3 mr-3">
      <h2 className="font-bold text-[2rem]">Edit User Details</h2>
      <form
        className="flex flex-col p-3 tight-shadow rounded form-amber"
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
              onChange={() => onChangeHandler()}
              id="first_name"
              name="first_name"
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
              onChange={() => onChangeHandler()}
              id="last_name"
              name="last_name"
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
              onChange={() => onChangeHandler()}
              id="address_one"
              name="address_one"
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
              onChange={() => onChangeHandler()}
              id="address_two"
              name="address_two"
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
              onChange={() => onChangeHandler()}
              id="address_three"
              name="address_three"
              defaultValue={user?.address_three}
              placeholder="Optional, not currently used"
            />
          </div>
          <div className="flex flex-col p-1">
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Phone Number
            </label>
            <input
              onChange={() => onChangeHandler()}
              id="phone"
              name="phone"
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
            onChange={() => onChangeHandler()}
            id="website"
            name="website"
            placeholder="https://www.yoursite.com"
            defaultValue={user?.website}
          />
        </div>
        {edited && (
          <div className="w-1/2 m-auto">
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber my-4  animate-pulse">
              Save Change
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
};

const UserSocialsEditForm = ({ user }: { user: User }) => {
  const initialState = { message: "inital state", formData: null, errors: {} };
  const updateSocialsWithId = updateSocials.bind(null, user?.id!);
  const [state, dispatch] = useFormState(updateSocialsWithId, initialState);

  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <h2 className="font-bold text-[2rem]">Edit Social Links</h2>
      <form
        className="flex flex-col p-3 tight-shadow rounded mr-3 form-amber"
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
              onChange={() => onChangeHandler()}
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
              onChange={() => onChangeHandler()}
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
              onChange={() => onChangeHandler()}
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
              onChange={() => onChangeHandler()}
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
              onChange={() => onChangeHandler()}
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
              onChange={() => onChangeHandler()}
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
            <SubmitButton className="btn btn-amber my-4 animate-pulse">
              Save Change
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
};

const UserImageEditForm = ({ user }: { user: User }) => {
  return (
    <div className=" ">
      <h2 className="font-bold text-[2rem] py-1">Edit User Image</h2>
      <div className="flex flex-col p-3 tight-shadow mr-3 rounded bg-amber-200">
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
              <form action={deleteUserImage}>
                <input
                  name="image-url"
                  value={user?.thumbnail}
                  hidden
                  readOnly
                />
                <input name="user-id" value={user?.id} hidden readOnly />
                <SubmitButton className="btn btn-amber hover:animate-pulse rounded ">
                  Delete Image
                </SubmitButton>
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
      <BackButton href="/dashboard/">Back</BackButton>
      <UserImageEditForm user={user} />
      <UserDetailsEditForm user={user} />
      <UserSocialsEditForm user={user} />
    </div>
  );
};

export default UserEditForm;

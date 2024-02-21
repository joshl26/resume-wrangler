"use client";

import { User } from "@/app/lib/definitions";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";
import { Button } from "../button";
import { updateUser, updateSocials } from "@/app/lib/actions";

const UserDetailsEditForm = ({ user }: { user: User | null }) => {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user?.id!);
  const [state, dispatch] = useFormState(updateUserWithId, initialState);

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" value={user?.id} />
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Username
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Type a Username"
          defaultValue={user?.name}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={user?.email}
          placeholder="something@something.com"
          required
        />
      </div>
      <div>
        <label htmlFor="first-name" className="mb-2 block text-sm font-medium">
          First Name
        </label>
        <input
          id="first-name"
          name="first-name"
          type="text"
          placeholder="Type your first name"
          defaultValue={user?.first_name}
        />
      </div>
      <div>
        <label htmlFor="last-name" className="mb-2 block text-sm font-medium">
          Last Name
        </label>
        <input
          id="last-name"
          name="last-name"
          type="text"
          defaultValue={user?.last_name}
          placeholder="Type your last name"
        />
      </div>
      <div>
        <label htmlFor="address-one" className="mb-2 block text-sm font-medium">
          Address Line One
        </label>
        <input
          id="address-one"
          name="address-one"
          type="text"
          defaultValue={user?.address_one}
          placeholder="City, Province OR State"
        />
      </div>
      <div>
        <label htmlFor="address-two" className="mb-2 block text-sm font-medium">
          Address Line Two
        </label>
        <input
          id="address-two"
          name="address-two"
          type="text"
          defaultValue={user?.address_two}
          placeholder="Optional, not currently used"
        />
      </div>
      <div>
        <label
          htmlFor="address-three"
          className="mb-2 block text-sm font-medium"
        >
          Address Line Three
        </label>
        <input
          id="address-three"
          name="address-three"
          type="text"
          defaultValue={user?.address_three}
          placeholder="Optional, not currently used"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="123-456-7891"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          defaultValue={user?.phone}
        />
      </div>
      <div>
        <label htmlFor="website" className="mb-2 block text-sm font-medium">
          Website
        </label>
        <input
          id="website"
          name="website"
          type="text"
          placeholder="https://www.yoursite.com"
          defaultValue={user?.website}
        />
      </div>
      <div className="mt-6 flex justify-start gap-4">
        <Link
          href="/dashboard/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save User Edits</Button>
      </div>
    </form>
  );
};

const UserSocialsEditForm = ({ user }: { user: User | null }) => {
  const initialState = { message: "inital state", formData: null, errors: {} };
  const updateSocialsWithId = updateSocials.bind(null, user?.id!);
  const [state, dispatch] = useFormState(updateSocialsWithId, initialState);

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" value={user?.id} />
      <div>
        <label htmlFor="linkedin" className="mb-2 block text-sm font-medium">
          LinkedIn
        </label>
        <input
          id="linkedin"
          name="linkedin"
          type="text"
          placeholder="Type your linkedin address"
          defaultValue={user?.linked_in}
        />
      </div>
      <div>
        <label htmlFor="twitter" className="mb-2 block text-sm font-medium">
          Twitter
        </label>
        <input
          id="twitter"
          name="twitter"
          type="text"
          placeholder="Type your twitter address"
          defaultValue={user?.twitter}
        />
      </div>
      <div>
        <label htmlFor="facebook" className="mb-2 block text-sm font-medium">
          Facebook
        </label>
        <input
          id="facebook"
          name="facebook"
          type="text"
          placeholder="Type your facebook address"
          defaultValue={user?.facebook}
        />
      </div>
      <div>
        <label htmlFor="instagram" className="mb-2 block text-sm font-medium">
          Instagram
        </label>
        <input
          id="instagram"
          name="instagram"
          type="text"
          placeholder="Type your instagram address"
          defaultValue={user?.instagram}
        />
      </div>

      <div className="mt-6 flex justify-start gap-4">
        <Link
          href="/dashboard/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save Social Edits</Button>
      </div>
    </form>
  );
};

const UserEditForm = ({ user }: { user: User | null }) => {
  return (
    <div>
      <UserDetailsEditForm user={user} />
      <UserSocialsEditForm user={user} />
    </div>
  );
};

export default UserEditForm;

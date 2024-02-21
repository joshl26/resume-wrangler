"use client";

import { User } from "@/app/lib/definitions";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";
import { Button } from "../button";
import { updateUser } from "@/app/lib/actions";

const UserEditForm = ({ user }: { user: User }) => {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user.id);
  const [state, dispatch] = useFormState(updateUserWithId, initialState);

  return (
    <div>
      {/* <h2>{user?.name}</h2> <h2>{user?.email}</h2> */}
      <form action={dispatch}>
        <input type="hidden" name="id" value={user?.id} />
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Username
          </label>
          <input id="name" name="name" type="text" defaultValue={user?.name} />
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
          />
        </div>
        <div>
          <label
            htmlFor="first-name"
            className="mb-2 block text-sm font-medium"
          >
            First Name
          </label>
          <input
            id="first-name"
            name="first-name"
            type="text"
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
          />
        </div>
        <div>
          <label
            htmlFor="address-one"
            className="mb-2 block text-sm font-medium"
          >
            Address Line One
          </label>
          <input
            id="address-one"
            name="address-one"
            type="text"
            defaultValue={user?.address_one}
          />
        </div>
        <div>
          <label
            htmlFor="address-two"
            className="mb-2 block text-sm font-medium"
          >
            Address Line Two
          </label>
          <input
            id="address-two"
            name="address-two"
            type="text"
            defaultValue={user?.address_two}
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
          />
        </div>
        <div className="mt-6 flex justify-start gap-4">
          <Link
            href="/dashboard/"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Edit User</Button>
        </div>
      </form>
    </div>
  );
};

export default UserEditForm;

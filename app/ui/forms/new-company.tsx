"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createCompany } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function NewCompany({ user }: { user: User }) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  // Wrapper - returns Promise<void> so it's compatible with form action
  const handleCreate = async (formData: FormData): Promise<void> => {
    try {
      const result = await createCompany(formData);
      if (result?.errors) {
        // handle validation errors (toast, UI state, console, etc.)
        console.error("Create company failed:", result);
      } else {
        // optionally handle success (redirect, toast, revalidation, ...)
        // e.g. window.location.href = "/dashboard/companies";
      }
    } catch (err) {
      console.error("Unexpected error creating company:", err);
    }
  };

  return (
    <div className="px-2">
      <BackButton className="" href={"/dashboard/companies"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold">Add New Company</h1>
        </div>
      </div>

      {/* use wrapper here */}
      <form
        action={handleCreate}
        className="flex flex-col w-[500px] form-amber px-3 pb-2"
      >
        <input
          hidden
          readOnly
          required
          name="user_id"
          id="user_id"
          defaultValue={user?.id}
        />
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="company_name">
            Company Name
          </label>
          <input
            required
            name="company_name"
            id="company_name"
            defaultValue={""}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="address_one">
            Address One
          </label>
          <input
            name="address_one"
            id="address_one"
            defaultValue={""}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="address_two">
            Address Two
          </label>
          <input
            name="address_two"
            id="address_two"
            defaultValue={""}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="recipient_title">
            Recipient Title
          </label>
          <input
            name="recipient_title"
            id="recipient_title"
            defaultValue={""}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            id="email"
            defaultValue={""}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="phone">
            Phone
          </label>
          <input
            name="phone"
            id="phone"
            defaultValue={""}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="website_url">
            Website Url
          </label>
          <input
            name="website_url"
            id="website_url"
            defaultValue={""}
            onChange={onChangeHandler}
          />
        </div>
        {edited && (
          <SubmitButton className="btn btn-amber rounded animate-pulse my-3">
            Create New Company
          </SubmitButton>
        )}
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateCompany } from "@/app/lib/actions";
import { Company } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function EditCompany({ company }: { company: Company }) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  // Wrapper to satisfy form action type (returns Promise<void>)
  const handleUpdate = async (formData: FormData): Promise<void> => {
    try {
      const result = await updateCompany(formData);
      if (result?.errors) {
        // handle validation errors (UI toast, set state, etc.)
        console.error("Update company validation errors:", result.errors);
      } else {
        // success handling (optional): e.g. redirect or show toast
        // window.location.href = "/dashboard/companies/";
      }
    } catch (err) {
      console.error("Unexpected error updating company:", err);
    }
  };

  return (
    <div className="">
      <BackButton className="" href={"/dashboard/companies/"}>
        Back
      </BackButton>
      <h2 className="font-medium text-[2rem] py-1">Edit Company</h2>

      {/* use handleUpdate as the form action */}
      <form
        action={handleUpdate}
        className="flex flex-col form-amber px-3 pt-3 pb-1"
      >
        <input
          hidden
          readOnly
          name="company_id"
          id="company_id"
          defaultValue={company?.id}
        />
        <div className="flex flex-row justify-between">
          <div className="flex flex-col  ">
            <h1 className="font-bold">Date Created</h1>
            <div className="bg-white tight-shadow rounded p-2">
              <p>{company?.created_at?.toString().slice(0, 24)}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold">Date Updated</h1>
            <div className="bg-white tight-shadow rounded p-2">
              <p>{company?.updated_at?.toString().slice(0, 24)}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="company_name">
            Company Name
          </label>
          <input
            required
            name="company_name"
            id="company_name"
            className="tight-shadow"
            defaultValue={company?.name}
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
            defaultValue={company?.address_one}
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
            defaultValue={company?.address_two}
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
            defaultValue={company?.recipient_title}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-row justify-start gap-3">
          <div className="flex flex-col w-full py-2">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              id="email"
              defaultValue={company?.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="flex flex-col w-full py-2">
            <label className="font-bold" htmlFor="phone">
              Phone
            </label>
            <input
              name="phone"
              id="phone"
              defaultValue={company?.phone}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="website_url">
            Website Url
          </label>
          <input
            name="website_url"
            id="website_url"
            defaultValue={company?.website_url}
            onChange={onChangeHandler}
          />
        </div>
        {edited && (
          <SubmitButton className="btn btn-amber my-2 rounded animate-pulse">
            Save Updates
          </SubmitButton>
        )}
      </form>
    </div>
  );
}

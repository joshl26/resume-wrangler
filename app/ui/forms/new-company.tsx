import React from "react";
import { SubmitButton } from "../submit-button";
import { createCompany } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";

export default async function NewCompany({ user }: { user: User }) {
  return (
    <div>
      <form action={createCompany} className="flex flex-col w-[500px] px-1">
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
            type="text"
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
            type="text"
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
            type="text"
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
            type="text"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input name="email" id="email" defaultValue={""} type="email" />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="phone">
            Phone
          </label>
          <input name="phone" id="phone" defaultValue={""} type="text" />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="website_url">
            Website Url
          </label>
          <input
            name="website_url"
            id="website_url"
            defaultValue={""}
            type="text"
          />
        </div>
        <SubmitButton className=" bg-amber-500 hover:bg-amber-400  w-[200px] m-auto py-1 my-2 rounded">
          Create New Company
        </SubmitButton>
      </form>
    </div>
  );
}

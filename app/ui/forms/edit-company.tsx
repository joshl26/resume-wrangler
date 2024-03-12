import React from "react";
import { SubmitButton } from "../submit-button";
import { updateApplication, updateCompany } from "@/app/lib/actions";
import { Button } from "../button";

export default async function EditCompany({ company }: { company: any }) {
  async function editCompany(formData: FormData) {
    "use server";

    // const rawFormData = {
    //   applicationId: formData.get("application_id"),
    //   postingText: formData.get("posting_text"),
    //   isComplete: formData.get("is_complete"),
    // };

    // console.log(formData);

    await updateCompany(formData);
  }

  //   console.log(application);
  return (
    <div>
      <form action={editCompany} className="flex flex-col w-[500px] px-1">
        <div hidden>
          <label hidden htmlFor="company_id">
            Company Id
          </label>
          <input
            name="company_id"
            id="company_id"
            defaultValue={company?.id}
          ></input>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold">Date Created</h1>
            <p>{company?.created_at.toString().slice(0, 24)}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold">Date Updated</h1>
            <p>{company?.updated_at.toString().slice(0, 24)}</p>
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
            defaultValue={company?.name}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="address_one">
            Address One
          </label>
          <input
            name="address_one"
            id="address_one"
            defaultValue={company?.address_one}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="address_two">
            Address Two
          </label>
          <input
            name="address_two"
            id="address_two"
            defaultValue={company?.address_two}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="recipient_title">
            Recipient Title
          </label>
          <input
            name="recipient_title"
            id="recipient_title"
            defaultValue={company?.recipient_title}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            id="email"
            defaultValue={company?.email}
            type="email"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="phone">
            Phone
          </label>
          <input
            name="phone"
            id="phone"
            defaultValue={company?.phone}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="website_url">
            Website Url
          </label>
          <input
            name="website_url"
            id="website_url"
            defaultValue={company?.website_url}
            type="text"
          ></input>
        </div>
        <SubmitButton className="hover:bg-blue-400 bg-blue-600 text-white w-[200px] m-auto py-1 my-2 rounded">
          Update Company
        </SubmitButton>
      </form>
    </div>
  );
}

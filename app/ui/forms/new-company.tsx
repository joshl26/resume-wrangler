import React from "react";
import { SubmitButton } from "../submit-button";
import { createCompany } from "@/app/lib/actions";
import { Button } from "../button";

export default async function NewCompany({ user }: { user: any }) {
  async function newCompany(formData: FormData) {
    "use server";

    // const rawFormData = {
    //   applicationId: formData.get("application_id"),
    //   postingText: formData.get("posting_text"),
    //   isComplete: formData.get("is_complete"),
    // };

    //console.log(formData);

    await createCompany(formData);
  }

  //   console.log(application);
  return (
    <div>
      <form action={newCompany} className="flex flex-col w-[500px] px-1">
        <div hidden>
          <label hidden htmlFor="user_id">
            User Id
          </label>
          <input name="user_id" id="user_id" defaultValue={user?.id}></input>
        </div>
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
          ></input>
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
          ></input>
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
          ></input>
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
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input name="email" id="email" defaultValue={""} type="email"></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="phone">
            Phone
          </label>
          <input name="phone" id="phone" defaultValue={""} type="text"></input>
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
          ></input>
        </div>
        <SubmitButton
          buttonText={"Update Company"}
          className="hover:bg-blue-400 bg-blue-600 text-white w-[200px] m-auto py-1 my-2 rounded"
        />
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createApplication } from "@/app/lib/actions";
import { Companies, Company, User } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function NewApplication({
  companies,
  user,
}: {
  companies: Companies;
  user: User;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="px-2">
      <BackButton href={"/dashboard/skills/"}>Back</BackButton>
      <h2 className="font-medium text-[2rem] pt-2">Create New Application</h2>
      <form
        action={createApplication}
        className="flex flex-col form-amber w-[500px] p-3"
      >
        <input
          hidden
          readOnly
          name="user_id"
          id="user_id"
          defaultValue={user.id}
        />
        <div className="flex flex-row pb-2">
          <div className="flex flex-col w-full">
            <label htmlFor="countries_multiple" className="block font-bold">
              Select a company from the list
            </label>
            <select
              defaultValue={""}
              onChange={onChangeHandler}
              required
              id="company_id"
              name="company_id"
              className="rounded "
            >
              <option selected></option>
              {companies
                ? companies?.map((company: Company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))
                : ""}
            </select>
          </div>
          {/* <div className="flex flex-col align-middle h-auto w-1/4 p-2 ">
            <a
              className="m-auto text-center p-2 bg-blue-600 hover:bg-blue-400 text-white rounded"
              href="/dashboard/companies/new"
            >
              Add New Company
            </a>
          </div> */}
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="job_position">
            Job Position
          </label>
          <input
            name="job_position"
            id="job_position"
            defaultValue={""}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="posting_url">
            Posting Url
          </label>
          <input
            name="posting_url"
            id="posting_url"
            defaultValue={""}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="posting_text">
            Posting Text
          </label>
          <textarea
            name="posting_text"
            id="posting_text"
            defaultValue={""}
            onChange={onChangeHandler}
          ></textarea>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="analyzed_posting_text">
            Analyzed Posting Text
          </label>
          <textarea
            name="analyzed_posting_text"
            id="analyzed_posting_text"
            defaultValue={""}
            onChange={onChangeHandler}
          ></textarea>
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber w-auto my-1 rounded animate-pulse">
              Create New Skill
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

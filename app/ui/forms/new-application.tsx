"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createApplication } from "@/app/lib/actions";
import { Companies, Company, User } from "@/app/lib/definitions";

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
    <div>
      <form action={createApplication} className="flex flex-col w-[500px] px-1">
        <div hidden>
          <label hidden htmlFor="user_id">
            User Id
          </label>
          <input name="user_id" id="user_id" defaultValue={user.id}></input>
        </div>
        <div className="flex flex-row py-2">
          <div className="flex flex-col w-3/4">
            <label
              htmlFor="countries_multiple"
              className="block mb-2 font-bold text-gray-900 dark:text-black"
            >
              Select a company from the list
            </label>
            <select
              defaultValue={""}
              onChange={onChangeHandler}
              required
              id="company_id"
              name="company_id"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            type="text"
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
            type="text"
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
          ></textarea>
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber w-[200px] m-auto py-1 my-2 rounded">
              Create New Application
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateApplication } from "@/app/lib/actions";
import { Application, Companies } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function EditApplication({
  application,
  companies,
}: {
  application: Application;
  companies: Companies;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };
  return (
    <div className="px-3">
      <BackButton classname="" href={"/dashboard/applications/"}>
        Back
      </BackButton>
      <h2 className="font-medium text-[2rem] py-1">Edit Application</h2>
      <form
        action={updateApplication}
        className="flex flex-col form-amber p-3  "
      >
        <div hidden>
          <label hidden htmlFor="application_id">
            Application Id
          </label>
          <input
            name="application_id"
            id="application_id"
            defaultValue={application?.id}
          ></input>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold">Date Created</h1>
            <p>{application?.created_at?.toString().slice(0, 24)}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold">Date Updated</h1>
            <p>{application?.updated_at?.toString().slice(0, 24)}</p>
          </div>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="posting_text">
            Posting Text
          </label>
          <textarea
            onChange={onChangeHandler}
            name="posting_text"
            id="posting_text"
            defaultValue={application?.posting_text}
          ></textarea>
        </div>
        <div className="flex flex-row justify-between py-2">
          <div className="flex flex-col  w-1/2">
            <label className="font-bold" htmlFor="is_complete">
              Is Complete?
            </label>
            <input
              id="is_complete"
              name="is_complete"
              onChange={onChangeHandler}
              defaultChecked={
                application?.is_complete === "true" ? true : false
              }
              type="checkbox"
            ></input>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-bold" htmlFor="date_submitted">
              Date Submitted
            </label>
            {application?.date_submitted != null ? (
              <p>{application?.date_submitted?.toString()}</p>
            ) : (
              <p className="italic">Not submitted yet</p>
            )}
          </div>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="job_position">
            Job Position
          </label>
          <input
            onChange={onChangeHandler}
            name="job_position"
            id="job_position"
            defaultValue={application?.job_position}
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="posting_url">
            Posting Url
          </label>
          <input
            onChange={onChangeHandler}
            name="posting_url"
            id="posting_url"
            defaultValue={application?.posting_url}
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="analyzed_posting_text">
            Analyzed Posting Text
          </label>
          <textarea
            onChange={onChangeHandler}
            name="analyzed_posting_text"
            id="analyzed_posting_text"
            defaultValue={application?.analyzed_posting_text}
          ></textarea>
        </div>
        <div className="flex flex-row py-2">
          <div className="flex flex-col">
            <label htmlFor="company_id" className="block font-bold">
              Select a Company
            </label>
            <select
              onChange={onChangeHandler}
              defaultValue={application?.company_id}
              id="company_id"
              name="company_id"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block   "
            >
              {companies.map((company: any) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
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
        {edited && (
          <>
            <SubmitButton className="btn btn-amber my-2 rounded animate-pulse">
              Save Updates
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

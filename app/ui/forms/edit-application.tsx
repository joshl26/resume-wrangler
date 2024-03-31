import React from "react";
import { SubmitButton } from "../submit-button";
import { updateApplication } from "@/app/lib/actions";
import { Application, Applications, Companies } from "@/app/lib/definitions";

export default async function EditApplication({
  application,
  companies,
}: {
  application: Application;
  companies: Companies;
}) {
  return (
    <div>
      <form action={updateApplication} className="flex flex-col w-[500px] px-1">
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
          <input
            name="posting_text"
            id="posting_text"
            defaultValue={application?.posting_text}
            type="text"
          ></input>
        </div>
        <div className="flex flex-row justify-between py-2">
          <div className="flex flex-col  w-1/2">
            <label className="font-bold" htmlFor="is_complete">
              Is Complete?
            </label>
            <input
              id="is_complete"
              name="is_complete"
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
            name="job_position"
            id="job_position"
            defaultValue={application?.job_position}
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
            defaultValue={application?.posting_url}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="analyzed_posting_text">
            Analyzed Posting Text
          </label>
          <textarea
            name="analyzed_posting_text"
            id="analyzed_posting_text"
            defaultValue={application?.analyzed_posting_text}
          ></textarea>
        </div>
        <div className="flex flex-row py-2">
          <div className="flex flex-col w-3/4">
            <label
              htmlFor="countries_multiple"
              className="block mb-2 font-bold text-gray-900 dark:text-black"
            >
              Select an option
            </label>
            <select
              defaultValue={application?.company_id}
              id="company_id"
              name="company_id"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {companies.map((company: any) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col align-middle h-auto w-1/4 p-2 ">
            <a
              className="m-auto text-center p-2 bg-blue-600 hover:bg-blue-400 text-white rounded"
              href="/dashboard/companies/new"
            >
              Add New Company
            </a>
          </div>
        </div>
        <SubmitButton className="hover:bg-blue-400 bg-blue-600 text-white w-[200px] m-auto py-1 my-2 rounded">
          Update Application
        </SubmitButton>
      </form>
    </div>
  );
}

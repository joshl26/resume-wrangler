"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserOrganization } from "@/app/lib/actions";
import Link from "next/link";

export default function EditOrganization({
  organization,
}: {
  organization: any;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };
  return (
    <div>
      <Link className="px-3 underline" href={"/dashboard/organizations/"}>
        Back
      </Link>
      <h2 className="font-medium text-[2rem] px-3">Edit Organization</h2>

      <form
        onSubmit={() => setEdited(false)}
        action={updateUserOrganization}
        className="flex flex-col w-[500px] p-3 m-3 border border-black rounded"
      >
        <div hidden>
          <label hidden htmlFor="organization_id">
            Organization Id
          </label>
          <input
            name="organization_id"
            id="organization_id"
            defaultValue={organization?.id}
          ></input>
        </div>
        {/* <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold">Date Created</h1>
            <p>{certification?.created_at.toString().slice(0, 24)}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold">Date Updated</h1>
            <p>{certification?.updated_at.toString().slice(0, 24)}</p>
          </div>
        </div> */}
        <div className="flex flex-col py-2">
          <label hidden className="font-bold" htmlFor="resume_id">
            Resume Id
          </label>
          <input
            required
            hidden
            name="resume_id"
            id="resume_id"
            onChange={(e) => {}}
            value="blank"
            type="text"
          ></input>

          <label hidden className="font-bold" htmlFor="user_id">
            User Id
          </label>
          <input
            required
            hidden
            name="user_id"
            id="user_id"
            onChange={(e) => {}}
            value="blank"
            type="text"
          ></input>
          <label className="font-bold" htmlFor="organization_name">
            Organization Name
          </label>
          <input
            required
            name="organization_name"
            id="organization_name"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={organization?.name}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="organization_location">
            Location
          </label>
          <input
            name="organization_location"
            id="organization_location"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={organization?.location}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="organization_start">
            Start Date
          </label>
          <input
            name="organization_start"
            id="organization_start"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={organization?.start_date}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="organization_end">
            End Date
          </label>
          <input
            name="organization_end"
            id="organization_end"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={organization?.end_date}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="organization_description">
            Description
          </label>
          <textarea
            name="organization_description"
            id="organization_description"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={organization?.description}
          ></textarea>
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
              Update Certification
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

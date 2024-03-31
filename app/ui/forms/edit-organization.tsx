"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserOrganization } from "@/app/lib/actions";
import Link from "next/link";
import { UserOrganization } from "@/app/lib/definitions";

export default function EditOrganization({
  organization,
}: {
  organization: UserOrganization;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
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
        <input
          required
          hidden
          readOnly
          name="organization_id"
          id="organization_id"
          defaultValue={organization?.id}
        />
        <div className="flex flex-col py-2">
          <input
            required
            hidden
            readOnly
            name="resume_id"
            id="resume_id"
            value="blank"
            type="text"
          />
          <input
            readOnly
            required
            hidden
            name="user_id"
            id="user_id"
            value="blank"
            type="text"
          />
          <label className="font-bold" htmlFor="organization_name">
            Organization Name
          </label>
          <input
            required
            name="organization_name"
            id="organization_name"
            onChange={() => onChangeHandler()}
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
            onChange={() => onChangeHandler()}
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
            onChange={() => onChangeHandler()}
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
            onChange={() => onChangeHandler()}
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
            onChange={() => onChangeHandler()}
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

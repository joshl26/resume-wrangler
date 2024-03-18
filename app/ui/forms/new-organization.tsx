"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createOrganization } from "@/app/lib/actions";
import Link from "next/link";

export default function NewOrganization({ user }: { user: any }) {
  //   console.log(application);

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
      <h2 className="font-medium text-[2rem] px-3">Create New Organization</h2>
      <form
        onSubmit={() => setEdited(false)}
        action={createOrganization}
        className="flex flex-col w-full p-3 border border-black rounded m-3"
      >
        <div hidden>
          <label hidden htmlFor="user_id">
            User Id
          </label>
          <input
            hidden
            readOnly
            name="user_id"
            id="user_id"
            value={user?.id}
          ></input>
          <label hidden htmlFor="section_title">
            Section Title
          </label>
          <input
            readOnly
            hidden
            name="section_title"
            id="section_title"
            value="blank"
          ></input>
          <label hidden htmlFor="resume_id">
            Resume Id
          </label>
          <input
            readOnly
            hidden
            name="resume_id"
            id="resume_id"
            value="blank"
          ></input>
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="organization_name">
            Organization Name
          </label>
          <input
            required
            name="organization_name"
            id="organization_name"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={""}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="organization_location">
            Organization Location
          </label>
          <input
            required
            name="organization_location"
            id="organization_location"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={""}
            type="text"
          ></input>
        </div>
        <div className="flex flex-row ">
          <div className="flex flex-col p-2 w-full">
            <label className="font-bold" htmlFor="organization_start">
              Start Date
            </label>
            <input
              required
              name="organization_start"
              id="organization_start"
              onChange={(e) => onChangeHandler(e)}
              defaultValue={""}
              type="text"
            ></input>
          </div>
          <div className="flex flex-col p-2 w-full">
            <label className="font-bold" htmlFor="organization_end">
              End Date
            </label>
            <input
              required
              name="organization_end"
              id="organization_end"
              onChange={(e) => onChangeHandler(e)}
              defaultValue={""}
              type="text"
            ></input>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="organization_description">
            Organization Description
          </label>
          <textarea
            required
            name="organization_description"
            id="organization_description"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={""}
          ></textarea>
        </div>

        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
              Create Organization
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

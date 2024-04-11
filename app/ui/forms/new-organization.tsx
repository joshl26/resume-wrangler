"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createOrganization } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function NewOrganization({ user }: { user: User }) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="px-3">
      <BackButton classname="" href={"/dashboard/organizations/"}>
        Back
      </BackButton>
      <h2 className="font-medium text-[2rem] py-1">Create New Organization</h2>
      <form
        onSubmit={() => setEdited(false)}
        action={createOrganization}
        className="flex flex-col w-full p-3 tight-shadow form-amber rounded "
      >
        <input
          required
          hidden
          readOnly
          name="user_id"
          id="user_id"
          value={user?.id}
        />
        <input
          required
          readOnly
          hidden
          name="section_title"
          id="section_title"
          value="blank"
        />
        <input
          required
          readOnly
          hidden
          name="resume_id"
          id="resume_id"
          value="blank"
        />
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="organization_name">
            Organization Name
          </label>
          <input
            required
            name="organization_name"
            id="organization_name"
            onChange={onChangeHandler}
            defaultValue={""}
            type="text"
          />
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="organization_location">
            Organization Location
          </label>
          <input
            required
            name="organization_location"
            id="organization_location"
            onChange={onChangeHandler}
            defaultValue={""}
          />
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
              onChange={onChangeHandler}
              defaultValue={""}
            />
          </div>
          <div className="flex flex-col p-2 w-full">
            <label className="font-bold" htmlFor="organization_end">
              End Date
            </label>
            <input
              required
              name="organization_end"
              id="organization_end"
              onChange={onChangeHandler}
              defaultValue={""}
            />
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
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber p-2 animate-pulse">
              Create New Organization
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createCoverExperience, createWorkExperience } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function NewCoverExperience({ user }: { user: User }) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };
  return (
    <div className="px-2 h-full overflow-y-auto pb-3">
      <BackButton className="" href={"/dashboard/cover-experience"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold">Add New Cover Experience</h1>
        </div>
      </div>
      <form
        onSubmit={(e) => setEdited(false)}
        action={createCoverExperience}
        className="flex flex-col tight-shadow form-amber rounded p-2"
      >
        <input readOnly hidden name="user_id" id="user_id" value={user?.id} />
        <div className="flex flex-row">
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="title">
              Title
            </label>
            <input
              required
              name="title"
              id="title"
              onChange={onChangeHandler}
              defaultValue={""}
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="description">
              Description
            </label>
            <input
              required
              name="description"
              id="description"
              onChange={onChangeHandler}
              defaultValue={""}
            />
          </div>
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber my-4 animate-pulse">
              Create New Work Experience
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

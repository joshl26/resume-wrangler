"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateCoverExperience } from "@/app/lib/actions";
import { UserCoverExperience } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function EditCoverExperience({
  coverExperience,
  userId,
}: {
  coverExperience: UserCoverExperience;
  userId: string;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="overflow-y-auto h-full w-[600px] px-3 pb-3">
      <BackButton className="" href={"/dashboard/cover-experience"}>
        Back
      </BackButton>
      <h2 className="font-medium text-[2rem] py-1">Edit Cover Experience</h2>
      <form
        onSubmit={(e) => setEdited(false)}
        action={updateCoverExperience}
        className="flex flex-col tight-shadow form-amber rounded p-2 "
      >
        <input
          readOnly
          hidden
          name="experience_id"
          id="experience_id"
          defaultValue={coverExperience?.id}
        />
        <input hidden name="user_id" id="user_id" readOnly value={userId} />
        <div className="flex flex-col p-2">
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="title">
              Cover Experience Title
            </label>
            <input
              name="title"
              id="title"
              onChange={() => onChangeHandler()}
              defaultValue={coverExperience?.title}
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="description">
            Description One
          </label>
          <textarea
            className="h-[350px]"
            name="description"
            id="description"
            onChange={() => onChangeHandler()}
            defaultValue={coverExperience?.description}
          />
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber my-4 animate-pulse">
              Update Cover Experience
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createWorkExperience } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function NewWorkExperience({ user }: { user: User }) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };
  return (
    <div className="px-2 h-full overflow-y-auto pb-3">
      <BackButton href={"/dashboard/work-experience"}>Back</BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold">Add New Work Experience</h1>
        </div>
      </div>
      <form
        onSubmit={(e) => setEdited(false)}
        action={createWorkExperience}
        className="flex flex-col tight-shadow form-amber rounded p-2 "
      >
        <input readOnly hidden name="user_id" id="user_id" value={user?.id} />
        <input readOnly hidden name="resume_id" id="resume_id" value="blank" />
        <div className="flex flex-row">
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="company_name">
              Company Name
            </label>
            <input
              required
              name="company_name"
              id="company_name"
              onChange={onChangeHandler}
              defaultValue={""}
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="location">
              Location
            </label>
            <input
              required
              name="location"
              id="location"
              onChange={onChangeHandler}
              defaultValue={""}
            />
          </div>
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="job_title">
            Job Title
          </label>
          <input
            name="job_title"
            id="job_title"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="start_date">
              Start Date
            </label>
            <input
              name="start_date"
              id="start_date"
              onChange={onChangeHandler}
              defaultValue={""}
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="end_date">
              End Date
            </label>
            <input
              name="end_date"
              id="end_date"
              onChange={onChangeHandler}
              defaultValue={""}
            />
          </div>
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="description_one">
            Description One
          </label>
          <textarea
            className="h-[150px]"
            name="description_one"
            id="description_one"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="description_two">
            Description Two
          </label>
          <textarea
            className="h-[150px]"
            name="description_two"
            id="description_two"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="description_three">
            Description Three
          </label>
          <textarea
            className="h-[150px]"
            name="description_three"
            id="description_three"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="description_four">
            Description Four
          </label>
          <textarea
            className="h-[150px]"
            name="description_four"
            id="description_four"
            onChange={onChangeHandler}
            defaultValue={""}
          />
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

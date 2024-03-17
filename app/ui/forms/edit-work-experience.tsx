"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserWorkExperience } from "@/app/lib/actions";

export default function EditWorkExperience({
  workExperience,
}: {
  workExperience: any;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-[2rem]">Edit Work Experience</h2>
      <form
        onSubmit={(e) => setEdited(false)}
        action={updateUserWorkExperience}
        className="flex flex-col border border-black rounded p-2 m-3"
      >
        <div hidden>
          <label hidden htmlFor="work_experience_id">
            Work Experience Id
          </label>
          <input
            name="work_experience_id"
            id="work_experience_id"
            defaultValue={workExperience?.id}
          ></input>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="company_name">
              Company Name
            </label>
            <input
              required
              name="company_name"
              id="company_name"
              onChange={(e) => onChangeHandler(e)}
              defaultValue={workExperience?.company_name}
              type="text"
            ></input>
          </div>
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="location">
              Location
            </label>
            <input
              required
              name="location"
              id="location"
              onChange={(e) => onChangeHandler(e)}
              defaultValue={workExperience?.location}
              type="text"
            ></input>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="job_title">
            Job Title
          </label>
          <input
            name="job_title"
            id="job_title"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={workExperience?.job_title}
            type="text"
          ></input>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="start_date">
              Start Date
            </label>
            <input
              name="start_date"
              id="start_date"
              onChange={(e) => onChangeHandler(e)}
              defaultValue={workExperience?.start_date}
              type="text"
            ></input>
          </div>
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="end_date">
              End Date
            </label>
            <input
              name="end_date"
              id="end_date"
              onChange={(e) => onChangeHandler(e)}
              defaultValue={workExperience?.end_date}
              type="text"
            ></input>
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
            onChange={(e) => onChangeHandler(e)}
            defaultValue={workExperience?.description_one}
          ></textarea>
        </div>

        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
              Update Work Experience
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserWorkExperience } from "@/app/lib/actions";
import { UserWorkExperience } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function EditWorkExperience({
  workExperience,
}: {
  workExperience: UserWorkExperience;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="overflow-y-auto h-full px-3 pb-3">
      <BackButton className="" href={"/dashboard/work-experience"}>
        Back
      </BackButton>
      <h2 className="font-medium text-[2rem] py-1">Edit Work Experience</h2>
      <form
        onSubmit={(e) => setEdited(false)}
        action={updateUserWorkExperience}
        className="flex flex-col tight-shadow form-amber rounded p-2 "
      >
        <label hidden htmlFor="experience_id">
          Work Experience Id
        </label>
        <input
          readOnly
          hidden
          name="experience_id"
          id="experience_id"
          defaultValue={workExperience?.id}
        ></input>
        <label hidden htmlFor="resume_id">
          Resume Id
        </label>
        <input
          hidden
          name="resume_id"
          id="resume_id"
          readOnly
          value="blank"
        ></input>

        <div className="flex flex-row">
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="company_name">
              Company Name
            </label>
            <input
              required
              name="company_name"
              id="company_name"
              onChange={() => onChangeHandler()}
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
              onChange={() => onChangeHandler()}
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
            onChange={() => onChangeHandler()}
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
              onChange={() => onChangeHandler()}
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
              onChange={() => onChangeHandler()}
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
            onChange={() => onChangeHandler()}
            defaultValue={workExperience?.description_one}
          ></textarea>
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="description_two">
            Description Two
          </label>
          <textarea
            className="h-[150px]"
            name="description_two"
            id="description_two"
            onChange={() => onChangeHandler()}
            defaultValue={workExperience?.description_two}
          ></textarea>
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="description_three">
            Description Three
          </label>
          <textarea
            className="h-[150px]"
            name="description_three"
            id="description_three"
            onChange={() => onChangeHandler()}
            defaultValue={workExperience?.description_three}
          ></textarea>
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="description_four">
            Description Four
          </label>
          <textarea
            className="h-[150px]"
            name="description_four"
            id="description_four"
            onChange={() => onChangeHandler()}
            defaultValue={workExperience?.description_four}
          ></textarea>
        </div>

        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber my-4 animate-pulse">
              Update Work Experience
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

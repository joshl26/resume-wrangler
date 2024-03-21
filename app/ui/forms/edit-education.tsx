"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserEducation } from "@/app/lib/actions";
import Link from "next/link";

export default function EditEducation({ education }: { education: any }) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };
  return (
    <div>
      <Link className="px-3 underline" href={"/dashboard/education/"}>
        Back
      </Link>
      <h2 className="font-medium text-[2rem] px-3">Edit Education</h2>
      <form
        onSubmit={() => setEdited(false)}
        action={updateUserEducation}
        className="flex flex-col w-[500px] p-3 m-3 border border-black rounded"
      >
        <input
          readOnly
          hidden
          name="education_id"
          id="education_id"
          defaultValue={education?.id}
        />
        <input
          readOnly
          hidden
          name="resume_id"
          id="resume_id"
          onChange={(e) => {}}
          value="blank"
          type="text"
        />
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="institution_name">
            Education Name
          </label>
          <input
            required
            name="institution_name"
            id="institution_name"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={education?.institution_name}
            type="text"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="location">
            Location
          </label>
          <input
            name="location"
            id="location"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={education?.location}
            type="text"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="start_date">
            Start Date
          </label>
          <input
            name="start_date"
            id="start_date"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={education?.start_date}
            type="text"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="end_date">
            End Date
          </label>
          <input
            name="end_date"
            id="end_date"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={education?.end_date}
            type="text"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="grade">
            Grade
          </label>
          <input
            name="grade"
            id="grade"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={education?.grade}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="program">
            Program
          </label>
          <input
            name="program"
            id="program"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={education?.program}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="url">
            Url
          </label>
          <input
            name="url"
            id="url"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={education?.url}
          />
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
              Update Education
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}
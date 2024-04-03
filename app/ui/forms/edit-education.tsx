"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserEducation } from "@/app/lib/actions";
import Link from "next/link";
import { UserEducationExperience } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function EditEducation({
  education,
}: {
  education: UserEducationExperience;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };
  return (
    <div className="overflow-y-auto h-full px-3">
      <BackButton href={"/dashboard/education/"}>Back</BackButton>
      {/* <Link className="px-3 underline" href={"/dashboard/education/"}>
        Back
      </Link> */}
      <h2 className="font-medium text-[2rem] py-1">
        Edit Education Experience
      </h2>
      <form
        onSubmit={() => setEdited(false)}
        action={updateUserEducation}
        className="flex flex-col w-[500px] form-amber p-3   rounded"
      >
        <input
          required
          readOnly
          hidden
          name="education_id"
          id="education_id"
          defaultValue={education?.id}
        />
        <input
          required
          readOnly
          hidden
          name="resume_id"
          id="resume_id"
          value="blank"
          type="text"
        />
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="institution_name">
            Institution Name
          </label>
          <input
            required
            name="institution_name"
            id="institution_name"
            onChange={() => onChangeHandler()}
            defaultValue={education?.institution_name}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="location">
            Location
          </label>
          <input
            name="location"
            id="location"
            onChange={() => onChangeHandler()}
            defaultValue={education?.location}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="start_date">
            Start Date
          </label>
          <input
            name="start_date"
            id="start_date"
            onChange={() => onChangeHandler()}
            defaultValue={education?.start_date}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="end_date">
            End Date
          </label>
          <input
            name="end_date"
            id="end_date"
            onChange={() => onChangeHandler()}
            defaultValue={education?.end_date}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="grade">
            Grade
          </label>
          <input
            name="grade"
            id="grade"
            onChange={() => onChangeHandler()}
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
            onChange={() => onChangeHandler()}
            defaultValue={education?.program}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="url">
            Link (Web URL)
          </label>
          <input
            name="url"
            id="url"
            onChange={() => onChangeHandler()}
            defaultValue={education?.url}
          />
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber my-4 p-2 text-center w-auto animate-pulse">
              Save Updates
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

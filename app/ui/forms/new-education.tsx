"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createUserEducation } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function NewEducation({ user }: { user: User }) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="overflow-y-auto w-[500px] h-full px-3 pb-3">
      <BackButton href={"/dashboard/education/"}>Back</BackButton>
      <h2 className="font-medium text-[2rem] py-1">Education Experience</h2>
      <form
        onSubmit={() => setEdited(false)}
        action={createUserEducation}
        className="flex flex-col w-full px-3 pb-3 border form-amber rounded "
      >
        <input
          readOnly
          hidden
          name="user_id"
          id="user_id"
          defaultValue={user?.id}
        />
        <input
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
            className="border border-gray-400"
            required
            name="institution_name"
            id="institution_name"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="location">
            Institution Location
          </label>
          <input
            name="location"
            id="location"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="start_date">
            Program Start Date
          </label>
          <input
            name="start_date"
            id="start_date"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="end_date">
            Program End Date
          </label>
          <input
            name="end_date"
            id="end_date"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="grade">
            Program Grade
          </label>
          <input
            name="grade"
            id="grade"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="program">
            Program Name
          </label>
          <input
            name="program"
            id="program"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="url">
            Link (Web URL)
          </label>
          <input
            name="url"
            id="url"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber my-4 p-2 text-center w-auto animate-pulse">
              Save new Education Experience
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

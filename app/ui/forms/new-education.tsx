"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createUserEducation } from "@/app/lib/actions";
import Link from "next/link";
import { User } from "@/app/lib/definitions";

export default function NewEducation({ user }: { user: User }) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="w-full">
      <Link className="px-3 underline" href={"/dashboard/education/"}>
        Back
      </Link>
      <h2 className="font-medium text-[2rem] px-3">Education Experience</h2>
      <form
        onSubmit={() => setEdited(false)}
        action={createUserEducation}
        className="flex flex-col w-full p-3 border  bg-amber-50 rounded m-3"
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
          onChange={(e) => {}}
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
            onChange={() => onChangeHandler()}
            defaultValue={""}
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
            onChange={() => onChangeHandler()}
            defaultValue={""}
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
            onChange={() => onChangeHandler()}
            defaultValue={""}
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
            onChange={() => onChangeHandler()}
            defaultValue={""}
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
            onChange={() => onChangeHandler()}
            defaultValue={""}
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
            defaultValue={""}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="url">
            Url
          </label>
          <input
            name="url"
            id="url"
            onChange={() => onChangeHandler()}
            defaultValue={""}
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

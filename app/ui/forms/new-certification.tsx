"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createCertification } from "@/app/lib/actions";

export default function NewCertification({ user }: { user: any }) {
  //   console.log(application);

  const [edited, setEdited] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div>
      <form
        onSubmit={() => setEdited(false)}
        action={createCertification}
        className="flex flex-col w-[500px] px-1"
      >
        <div hidden>
          <label hidden htmlFor="user_id">
            User Id
          </label>
          <input
            hidden
            readOnly
            name="user_id"
            id="user_id"
            value={user?.id}
          ></input>
          <label hidden htmlFor="section_title">
            Section Title
          </label>
          <input
            readOnly
            hidden
            name="section_title"
            id="section_title"
            value="blank"
          ></input>
          <label hidden htmlFor="resume_id">
            Resume Id
          </label>
          <input
            readOnly
            hidden
            name="resume_id"
            id="resume_id"
            value="blank"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="certification_name">
            Certification Name
          </label>
          <input
            required
            name="certification_name"
            id="certification_name"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={""}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="certification_location">
            Certification Location
          </label>
          <input
            required
            name="certification_location"
            id="certification_location"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={""}
            type="text"
          ></input>
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
              Create Certification
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

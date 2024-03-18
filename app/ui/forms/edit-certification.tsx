"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserCertfication } from "@/app/lib/actions";
import Link from "next/link";

export default function EditCertification({
  certification,
}: {
  certification: any;
}) {
  //   console.log(application);

  const [edited, setEdited] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };
  return (
    <div>
      <Link className="px-3 underline" href={"/dashboard/certifications/"}>
        Back
      </Link>
      <h2 className="font-medium text-[2rem] px-3">Edit Certification</h2>

      <form
        onSubmit={() => setEdited(false)}
        action={updateUserCertfication}
        className="flex flex-col w-[500px] p-3 m-3 border border-black rounded"
      >
        <div hidden>
          <label hidden htmlFor="certification_id">
            Certification Id
          </label>
          <input
            name="certification_id"
            id="certification_id"
            defaultValue={certification?.id}
          ></input>
        </div>
        {/* <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold">Date Created</h1>
            <p>{certification?.created_at.toString().slice(0, 24)}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold">Date Updated</h1>
            <p>{certification?.updated_at.toString().slice(0, 24)}</p>
          </div>
        </div> */}
        <div className="flex flex-col py-2">
          <label hidden className="font-bold" htmlFor="resume_id">
            Resume Id
          </label>
          <input
            required
            hidden
            name="resume_id"
            id="resume_id"
            onChange={(e) => {}}
            value="blank"
            type="text"
          ></input>

          <label hidden className="font-bold" htmlFor="user_id">
            User Id
          </label>
          <input
            required
            hidden
            name="user_id"
            id="user_id"
            onChange={(e) => {}}
            value="blank"
            type="text"
          ></input>
          <label className="font-bold" htmlFor="certification_name">
            Certification Name
          </label>
          <input
            required
            name="certification_name"
            id="certification_name"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={certification?.name}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="location_name">
            Location
          </label>
          <input
            name="location_name"
            id="location_name"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={certification?.location}
            type="text"
          ></input>
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
              Update Certification
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

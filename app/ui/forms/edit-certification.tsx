"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserCertfication } from "@/app/lib/actions";
import Link from "next/link";
import { UserCertification } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function EditCertification({
  certification,
}: {
  certification: UserCertification;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };
  return (
    <div className="px-3">
      <BackButton className="" href={"/dashboard/certifications/"}>
        Back
      </BackButton>
      <h2 className="font-medium text-[2rem] py-1">Edit Certification</h2>
      <form
        onSubmit={() => setEdited(false)}
        action={updateUserCertfication}
        className="flex flex-col w-[500px] p-3 form-amber  tight-shadow rounded"
      >
        <input
          required
          hidden
          readOnly
          name="certification_id"
          id="certification_id"
          defaultValue={certification?.id}
        />
        <div className="flex flex-col py-2">
          <input
            required
            hidden
            readOnly
            name="resume_id"
            id="resume_id"
            value="blank"
            type="text"
          />
          <input
            required
            hidden
            readOnly
            name="user_id"
            id="user_id"
            value="blank"
            type="text"
          />
          <label className="font-bold" htmlFor="certification_name">
            Certification Name
          </label>
          <input
            required
            name="certification_name"
            id="certification_name"
            onChange={() => onChangeHandler()}
            defaultValue={certification?.name}
            type="text"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="location_name">
            Location
          </label>
          <input
            name="location_name"
            id="location_name"
            onChange={() => onChangeHandler()}
            defaultValue={certification?.location}
            type="text"
          />
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
              Save Updates
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

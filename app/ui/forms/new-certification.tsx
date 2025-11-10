"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createCertification } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function NewCertification({ user }: { user: User }) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  // Wrapper to satisfy form action type: (formData: FormData) => void | Promise<void>
  const handleCreate = async (formData: FormData): Promise<void> => {
    try {
      const result = await createCertification(formData);
      if (result?.errors) {
        // handle validation errors (show UI feedback, set state, etc.)
        console.error("Create certification failed:", result);
      } else {
        // success handling (reset edited, redirect, toast, revalidate, etc.)
        setEdited(false);
        // Example: window.location.href = "/dashboard/certifications";
      }
    } catch (err) {
      console.error("Unexpected error creating certification:", err);
    }
  };

  return (
    <div className="px-2">
      <BackButton className="" href={"/dashboard/certifications"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold">Add New Certification</h1>
        </div>
      </div>

      {/* use wrapper here */}
      <form
        action={handleCreate}
        className="flex flex-col w-[500px] p-3 form-amber"
      >
        <input
          required
          hidden
          readOnly
          name="user_id"
          id="user_id"
          value={user?.id}
        />
        <input
          required
          readOnly
          hidden
          name="section_title"
          id="section_title"
          value="blank"
        />
        <input
          required
          readOnly
          hidden
          name="resume_id"
          id="resume_id"
          value="blank"
        />
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="certification_name">
            Certification Name
          </label>
          <input
            required
            name="certification_name"
            id="certification_name"
            onChange={() => onChangeHandler()}
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
            onChange={() => onChangeHandler()}
            defaultValue={""}
            type="text"
          ></input>
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
              Create New Certification
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createCoverExperience } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function NewCoverExperience({ user }: { user: User }) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  // Wrapper so form.action gets (formData: FormData) => void | Promise<void>
  const handleCreate = async (formData: FormData): Promise<void> => {
    try {
      const result = await createCoverExperience(formData);
      if (result?.errors) {
        // handle validation errors (show toast/inline UI, etc.)
        console.error("Create cover experience failed:", result);
      } else {
        // success handling: reset edited and optionally redirect or show a toast
        setEdited(false);
        // e.g. window.location.href = "/dashboard/cover-experience";
      }
    } catch (err) {
      console.error("Unexpected error creating cover experience:", err);
    }
  };

  return (
    <div className="pb-3">
      <BackButton className="" href={"/dashboard/cover-experience"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold">Add New Cover Experience</h1>
        </div>
      </div>

      {/* use wrapper as action */}
      <form
        action={handleCreate}
        className="flex flex-col tight-shadow form-amber rounded p-2"
      >
        <input
          readOnly
          hidden
          name="user_id"
          id="user_id"
          defaultValue={user?.id}
        />

        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="title">
            Title
          </label>
          <input
            required
            name="title"
            id="title"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="description">
            Description
          </label>
          <textarea
            className="h-[200px]"
            required
            name="description"
            id="description"
            onChange={onChangeHandler}
            defaultValue={""}
          />
        </div>

        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber my-4 animate-pulse">
              Create New Cover Experience
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

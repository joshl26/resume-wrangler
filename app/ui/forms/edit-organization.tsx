"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserOrganization } from "@/app/lib/actions";
import { UserOrganization } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function EditOrganization({
  organization,
}: {
  organization: UserOrganization;
}) {
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  // Wrapper so form.action gets (formData: FormData) => void | Promise<void>
  const handleUpdateUserOrganization = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      setIsSubmitting(true);
      const result = await updateUserOrganization(formData);
      if (result?.errors) {
        console.error("Update user organization failed:", result);
      } else {
        setEdited(false);
      }
    } catch (err) {
      console.error("Unexpected error updating user organization:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-3">
      <BackButton className="" href={"/dashboard/organizations/"}>
        Back
      </BackButton>
      <h2 className="font-medium text-[2rem] py-1">Edit Organization</h2>
      <form
        action={handleUpdateUserOrganization}
        className="flex flex-col w-[500px] p-3 tight-shadow form-amber rounded"
      >
        <input
          required
          hidden
          readOnly
          name="organization_id"
          id="organization_id"
          defaultValue={organization?.id}
        />
        <div className="flex flex-col py-2">
          <input
            required
            hidden
            readOnly
            name="resume_id"
            id="resume_id"
            defaultValue="blank"
          />
          <input
            readOnly
            required
            hidden
            name="user_id"
            id="user_id"
            defaultValue="blank"
          />
          <label className="font-bold" htmlFor="organization_name">
            Organization Name
          </label>
          <input
            required
            name="organization_name"
            id="organization_name"
            onChange={onChangeHandler}
            defaultValue={organization?.name}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="organization_location">
            Location
          </label>
          <input
            name="organization_location"
            id="organization_location"
            onChange={onChangeHandler}
            defaultValue={organization?.location}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="organization_start">
            Start Date
          </label>
          <input
            name="organization_start"
            id="organization_start"
            onChange={onChangeHandler}
            defaultValue={organization?.start_date}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="organization_end">
            End Date
          </label>
          <input
            name="organization_end"
            id="organization_end"
            onChange={onChangeHandler}
            defaultValue={organization?.end_date}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="organization_description">
            Description
          </label>
          <textarea
            name="organization_description"
            id="organization_description"
            onChange={onChangeHandler}
            defaultValue={organization?.description}
          />
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton
              className="btn btn-amber p-2 text-center w-auto animate-pulse"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving…" : "Save Updates"}
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

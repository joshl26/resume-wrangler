import React from "react";
import { SubmitButton } from "../submit-button";
import {
  updateApplication,
  updateCompany,
  updateUserCertfication,
} from "@/app/lib/actions";
import { Button } from "../button";

export default async function EditCertification({
  certification,
}: {
  certification: any;
}) {
  //   console.log(application);
  return (
    <div>
      <form
        action={updateUserCertfication}
        className="flex flex-col w-[500px] px-1"
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
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold">Date Created</h1>
            <p>{certification?.created_at.toString().slice(0, 24)}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold">Date Updated</h1>
            <p>{certification?.updated_at.toString().slice(0, 24)}</p>
          </div>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="certification_name">
            Certification Name
          </label>
          <input
            required
            name="certification_name"
            id="certification_name"
            defaultValue={certification?.name}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="certification_location">
            Location
          </label>
          <input
            name="certification_location"
            id="certification_location"
            defaultValue={certification?.location}
            type="text"
          ></input>
        </div>
        <SubmitButton className="hover:bg-blue-400 bg-blue-600 text-white w-[200px] m-auto py-1 my-2 rounded">
          Update Company
        </SubmitButton>
      </form>
    </div>
  );
}

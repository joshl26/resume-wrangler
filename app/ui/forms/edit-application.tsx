import React from "react";
import { SubmitButton } from "../submit-button";
import { updateApplication } from "@/app/lib/actions";

export default async function EditApplication({
  application,
  companies,
}: {
  application: any;
  companies: any;
}) {
  async function editApplication(formData: FormData) {
    "use server";

    const rawFormData = {
      applicationId: formData.get("application_id"),
      postingText: formData.get("posting_text"),
      isComplete: formData.get("is_complete"),
    };

    console.log(rawFormData);

    // await updateApplication(formData);
  }

  //   console.log(application);
  return (
    <div>
      <form action={editApplication} className="flex flex-col w-[500px]">
        <h1 className="font-bold">Date Created</h1>
        <p>{application?.created_at.toString()}</p>
        <div hidden>
          <label hidden htmlFor="application_id">
            Application Id
          </label>
          <input
            name="application_id"
            id="application_id"
            defaultValue={application?.id}
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="posting_text">
            Posting Text
          </label>
          <input
            name="posting_text"
            id="posting_text"
            defaultValue={application?.posting_text}
            type="text"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="is_complete">
            Is Complete?
          </label>
          <input
            name="is_complete"
            defaultChecked={application?.is_complete}
            type="checkbox"
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="date_submitted">
            Date Submitted
          </label>
          <p>
            {application?.date_submitted != null
              ? application?.date_submitted.toString()
              : "Not Submitted"}
          </p>
        </div>

        <SubmitButton
          buttonText={"Update Application"}
          className="hover:bg-blue-300 bg-blue-400 w-[200px] m-auto py-1 my-2 rounded"
        />
      </form>
    </div>
  );
}

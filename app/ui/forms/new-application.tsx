"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createApplication } from "@/app/lib/actions";
import { Companies, Company, User } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function NewApplication({
  companies,
  user,
}: {
  companies: Companies;
  user: User;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (!edited) {
      setEdited(true);
    }
  };

  const handleCreate = async (formData: FormData) => {
    const result = await createApplication(formData);
    if (result?.errors) {
      console.error("Create failed:", result.message);
      // Optionally, add user feedback here (toast, alert, etc.)
    }
  };

  return (
    <div className="new-application-container px-4 py-6 max-w-3xl mx-auto my-15">
      <h2 className="text-3xl font-semibold mb-6">Create New Application</h2>

      <form
        action={handleCreate}
        className="new-application-form flex flex-col gap-6"
      >
        <input type="hidden" name="user_id" id="user_id" value={user.id} />

        <div className="form-group">
          <label htmlFor="company_id" className="form-label">
            Select a Company
          </label>
          <select
            id="company_id"
            name="company_id"
            defaultValue=""
            onChange={onChangeHandler}
            required
            className="form-select"
          >
            <option value="" disabled>
              -- Select a company --
            </option>
            {companies?.map((company: Company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="job_position" className="form-label">
            Job Position
          </label>
          <input
            type="text"
            id="job_position"
            name="job_position"
            defaultValue=""
            onChange={onChangeHandler}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="posting_url" className="form-label">
            Posting URL
          </label>
          <input
            type="url"
            id="posting_url"
            name="posting_url"
            defaultValue=""
            onChange={onChangeHandler}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="posting_text" className="form-label">
            Posting Text
          </label>
          <textarea
            id="posting_text"
            name="posting_text"
            defaultValue=""
            onChange={onChangeHandler}
            className="form-textarea"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="analyzed_posting_text" className="form-label">
            Analyzed Posting Text
          </label>
          <textarea
            id="analyzed_posting_text"
            name="analyzed_posting_text"
            defaultValue=""
            onChange={onChangeHandler}
            className="form-textarea"
            rows={4}
          />
        </div>

        {edited && (
          <SubmitButton className="btn btn-amber w-auto rounded animate-pulse self-start">
            Create New Application
          </SubmitButton>
        )}
      </form>
    </div>
  );
}

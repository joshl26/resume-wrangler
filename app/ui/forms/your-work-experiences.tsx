"use client";

import {
  createResumeLine,
  deleteResumeLine,
  updateUserWorkExperience,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import {
  Resume,
  User,
  UserWorkExperience,
  UserWorkExperiences,
} from "@/app/lib/definitions";
import "./your-work-experiences.css";

interface YourWorkExperiencesProps {
  userWorkExperiences: UserWorkExperiences;
  user: User;
  resume: Resume;
  workResumeLines: any;
}

export default function YourWorkExperiences({
  userWorkExperiences,
  user,
  resume,
  workResumeLines,
}: YourWorkExperiencesProps) {
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = () => {
    if (!edited) setEdited(true);
  };

  const handleCreateResumeLine = async (formData: FormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      const result = await createResumeLine(formData);
      if (result?.errors) {
        console.error("Create resume line failed:", result);
      } else {
        setEdited(false);
      }
    } catch (err) {
      console.error("Unexpected error creating resume line:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteResumeLine = async (formData: FormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      const result = await deleteResumeLine(formData);
      if (result?.errors) {
        console.error("Delete resume line failed:", result);
      } else {
        setEdited(false);
      }
    } catch (err) {
      console.error("Unexpected error deleting resume line:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUserWorkExperience = async (
    formData: FormData,
  ): Promise<void> => {
    setIsSubmitting(true);
    try {
      const result = await updateUserWorkExperience(formData);
      if (result?.errors) {
        console.error("Update work experience failed:", result);
      } else {
        setEdited(false);
      }
    } catch (err) {
      console.error("Unexpected error updating work experience:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="your-work-experiences">
      <div className="your-work-experiences-header">
        <h2>Your Work Experience</h2>
      </div>
      <div className="your-work-experiences-form form-amber rounded px-6 py-4 mt-4">
        <h3 className="your-work-experiences-subheader">Previous Experience</h3>
        <div className="work-experience-list h-[100px] rounded overflow-y-auto tight-shadow bg-white mb-6">
          <ul>
            {userWorkExperiences?.map((experience: UserWorkExperience) => (
              <li key={experience.id} className="work-experience-item">
                <div>
                  <h2 className="work-experience-company">
                    {experience.company_name}
                  </h2>
                  <p className="work-experience-location">
                    {experience.location}
                  </p>
                </div>
                <form action={handleCreateResumeLine}>
                  <input
                    type="hidden"
                    name="resume_id"
                    value={resume.id}
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="user_id"
                    value={user.id}
                    readOnly
                  />
                  <input type="hidden" name="line_type" value="work" readOnly />
                  <input
                    type="hidden"
                    name="id"
                    value={experience.id}
                    readOnly
                  />
                  <SubmitButton
                    className="btn btn-azure"
                    disabled={isSubmitting}
                  >
                    Add
                  </SubmitButton>
                </form>
              </li>
            ))}
          </ul>
        </div>

        <ul>
          {workResumeLines.length > 0 &&
            workResumeLines.map((workExperience: any) => (
              <li
                key={workExperience.id}
                className="chosen-work-experience-item  pt-3"
              >
                <div className="chosen-work-experience-container flex flex-row w-auto">
                  <input
                    type="hidden"
                    name="resume_id"
                    value={workExperience.id}
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="user_id"
                    value={user.id}
                    readOnly
                  />
                  <div className="chosen-work-experience-content flex flex-col w-full py-1 px-1">
                    <div className="chosen-work-experience-header flex flex-row justify-between mb-2">
                      <form className="p-1" action={handleDeleteResumeLine}>
                        <input
                          type="hidden"
                          name="line_type"
                          value="work"
                          readOnly
                        />
                        <input
                          type="hidden"
                          name="id"
                          value={workExperience.id}
                          readOnly
                        />
                        <input
                          type="hidden"
                          name="resume_id"
                          value={resume.id}
                          readOnly
                        />
                        <input
                          type="hidden"
                          name="user_id"
                          value={user.id}
                          readOnly
                        />
                        <SubmitButton
                          className="btn btn-rose"
                          disabled={isSubmitting}
                        >
                          Remove
                        </SubmitButton>
                      </form>
                    </div>

                    <form
                      action={handleUpdateUserWorkExperience}
                      className="work-experience-edit-form rounded tight-shadow bg-gray-50 px-4 py-3"
                    >
                      <input
                        type="hidden"
                        id="experience_id"
                        name="experience_id"
                        value={workExperience.id}
                        readOnly
                      />
                      <input
                        type="hidden"
                        id="resume_id"
                        name="resume_id"
                        value={resume.id}
                        readOnly
                      />

                      <div className="work-experience-fields space-y-4">
                        <div>
                          <label htmlFor="company_name" className="input-label">
                            Company Name
                          </label>
                          <input
                            required
                            id="company_name"
                            name="company_name"
                            className="input-field"
                            defaultValue={workExperience.company_name}
                            onChange={onChangeHandler}
                            placeholder="Company Name"
                          />
                        </div>

                        <div>
                          <label htmlFor="job_title" className="input-label">
                            Job Title
                          </label>
                          <input
                            required
                            id="job_title"
                            name="job_title"
                            className="input-field"
                            defaultValue={workExperience.job_title}
                            onChange={onChangeHandler}
                            placeholder="Job Title"
                          />
                        </div>

                        <div>
                          <label htmlFor="location" className="input-label">
                            Company Location
                          </label>
                          <input
                            id="location"
                            name="location"
                            className="input-field"
                            defaultValue={workExperience.location}
                            onChange={onChangeHandler}
                            placeholder="Company Location"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="start_date" className="input-label">
                              Start Date
                            </label>
                            <input
                              id="start_date"
                              name="start_date"
                              className="input-field"
                              defaultValue={workExperience.start_date}
                              onChange={onChangeHandler}
                              placeholder="Start Date"
                            />
                          </div>
                          <div>
                            <label htmlFor="end_date" className="input-label">
                              End Date
                            </label>
                            <input
                              id="end_date"
                              name="end_date"
                              className="input-field"
                              defaultValue={workExperience.end_date}
                              onChange={onChangeHandler}
                              placeholder="End Date"
                            />
                          </div>
                        </div>

                        {[
                          "description_one",
                          "description_two",
                          "description_three",
                          "description_four",
                        ].map((descKey) => (
                          <div key={descKey}>
                            <label htmlFor={descKey} className="input-label">
                              {descKey
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                            </label>
                            <textarea
                              id={descKey}
                              name={descKey}
                              className="input-field textarea-field"
                              defaultValue={workExperience[descKey]}
                              onChange={onChangeHandler}
                              placeholder={descKey
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                            />
                          </div>
                        ))}

                        {edited && (
                          <SubmitButton
                            className="btn btn-amber my-4 p-2 text-center w-auto animate-pulse"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Saving…" : "Save Change"}
                          </SubmitButton>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

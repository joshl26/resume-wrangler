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

export default function YourWorkExperiences({
  userWorkExperiences,
  user,
  resume,
  workResumeLines,
}: {
  userWorkExperiences: UserWorkExperiences;
  user: User;
  resume: Resume;
  workResumeLines: any;
}) {
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  // Wrappers so form.action gets (formData: FormData) => void | Promise<void>
  const handleCreateResumeLine = async (formData: FormData): Promise<void> => {
    try {
      setIsSubmitting(true);
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
    try {
      setIsSubmitting(true);
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
    try {
      setIsSubmitting(true);
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
    <div>
      <div className="py-2 font-bold text-xl">
        <h2>Your Work Experience</h2>
      </div>
      <div className="your-work-experiences  form-amber rounded px-4 py-2">
        <h3 className="font-medium py-1">Previous Experience</h3>
        <div className="h-[100px] rounded overflow-y-auto tight-shadow bg-white">
          <ul className="">
            {userWorkExperiences?.map((experience: UserWorkExperience) => (
              <li key={experience?.id} className="border p-2">
                <div className="flex flex-row">
                  <div className="flex flex-col w-3/4">
                    <h2 className="font-bold">{experience?.company_name}</h2>
                    <p>{experience?.location}</p>
                  </div>
                  <div className="flex flex-col pt-3 pr-6">
                    <form action={handleCreateResumeLine}>
                      <input
                        hidden
                        readOnly
                        name="resume_id"
                        defaultValue={resume?.id}
                      />
                      <input
                        hidden
                        readOnly
                        name="user_id"
                        defaultValue={user?.id}
                      />
                      <input
                        hidden
                        readOnly
                        name="line_type"
                        defaultValue={"work"}
                      />
                      <input
                        hidden
                        readOnly
                        name="id"
                        defaultValue={experience?.id}
                      />
                      <SubmitButton
                        className={"hover:text-azure-radiance-500"}
                        disabled={isSubmitting}
                      >
                        Add
                      </SubmitButton>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ul>
          {workResumeLines[0] &&
            workResumeLines?.map((workExperience: any) => (
              <li className="pt-3" key={workExperience?.id}>
                <div className="flex flex-row w-auto">
                  <input
                    readOnly
                    hidden
                    name="resume_id"
                    id="resume_id"
                    defaultValue={workExperience?.id}
                  />
                  <input
                    readOnly
                    hidden
                    name="user_id"
                    id="user_id"
                    defaultValue={user?.id}
                  />
                  <div className="flex flex-col w-full py-1 px-1">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col w-1/4">
                        <div className="flex flex-row justify-between" />
                      </div>
                      <div className="flex flex-col" />
                      <form className="p-1" action={handleDeleteResumeLine}>
                        <input
                          readOnly
                          hidden
                          name="line_type"
                          defaultValue={"work"}
                        />
                        <input
                          readOnly
                          hidden
                          name="id"
                          defaultValue={workExperience?.id}
                        />
                        <input
                          readOnly
                          hidden
                          name="resume_id"
                          defaultValue={resume?.id}
                        />
                        <input
                          readOnly
                          hidden
                          name="user_id"
                          defaultValue={user?.id}
                        />
                        <SubmitButton
                          className={"hover:text-rose-500"}
                          disabled={isSubmitting}
                        >
                          Remove
                        </SubmitButton>
                      </form>
                    </div>

                    <form
                      action={handleUpdateUserWorkExperience}
                      className="rounded tight-shadow bg-gray-50 px-2"
                    >
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <input
                            hidden
                            readOnly
                            id="experience_id"
                            name="experience_id"
                            defaultValue={workExperience?.id}
                          />
                          <input
                            hidden
                            readOnly
                            defaultValue={resume?.id}
                            id="resume_id"
                            name="resume_id"
                          />
                          <label
                            className="py-1 font-medium"
                            htmlFor="company_name"
                          >
                            Company Name
                          </label>
                          <input
                            required
                            id="company_name"
                            name="company_name"
                            className="rounded"
                            defaultValue={workExperience?.company_name}
                            onChange={onChangeHandler}
                            placeholder="Company Name"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="job_title"
                          >
                            Job Title
                          </label>
                          <input
                            required
                            id="job_title"
                            name="job_title"
                            className="rounded"
                            defaultValue={workExperience?.job_title}
                            onChange={onChangeHandler}
                            placeholder="Job Title"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="location"
                          >
                            Company Location
                          </label>
                          <input
                            id="location"
                            name="location"
                            className="rounded"
                            defaultValue={workExperience?.location}
                            onChange={onChangeHandler}
                            placeholder="Company Location"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-1/2 py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="start_date"
                          >
                            Start Date
                          </label>
                          <input
                            id="start_date"
                            name="start_date"
                            className="rounded"
                            defaultValue={workExperience?.start_date}
                            onChange={onChangeHandler}
                            placeholder="Start Date"
                          />
                        </div>
                        <div className="flex flex-col w-1/2 py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="end_date"
                          >
                            End Date
                          </label>
                          <input
                            id="end_date"
                            name="end_date"
                            className="rounded"
                            defaultValue={workExperience?.end_date}
                            onChange={onChangeHandler}
                            placeholder="End Date"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="description"
                          >
                            Description One
                          </label>
                          <textarea
                            id="description_one"
                            name="description_one"
                            className="rounded h-[150px]"
                            defaultValue={workExperience?.description_one}
                            onChange={onChangeHandler}
                            placeholder="Description One"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="description_two"
                          >
                            Description Two
                          </label>
                          <textarea
                            id="description_two"
                            name="description_two"
                            className="rounded h-[150px]"
                            defaultValue={workExperience?.description_two}
                            onChange={onChangeHandler}
                            placeholder="Description Two"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="description_three"
                          >
                            Description Three
                          </label>
                          <textarea
                            id="description_three"
                            name="description_three"
                            className="rounded h-[150px]"
                            defaultValue={workExperience?.description_three}
                            onChange={onChangeHandler}
                            placeholder="Description Three"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="description_four"
                          >
                            Description Four
                          </label>
                          <textarea
                            id="description_four"
                            name="description_four"
                            className="rounded h-[150px]"
                            defaultValue={workExperience?.description_four}
                            onChange={onChangeHandler}
                            placeholder="Description Four"
                          />
                        </div>
                      </div>
                      {edited && (
                        <SubmitButton
                          className="btn btn-amber my-4 p-2 text-center w-auto animate-pulse"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Saving…" : "Save Change"}
                        </SubmitButton>
                      )}
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

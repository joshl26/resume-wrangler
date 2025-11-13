"use client";

import {
  createResumeLine,
  deleteResumeLine,
  updateEducationSection,
  updateUserEducation,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "@/app/ui/submit-button";
import {
  Resume,
  User,
  UserEducationExperience,
  UserEducationExperiences,
} from "@/app/lib/definitions";

export default function YourEducation({
  userEducation,
  user,
  resume,
  showEducation,
  setShowEducation,
  educationResumeLines,
}: {
  userEducation: UserEducationExperiences;
  user: User;
  resume: Resume;
  showEducation: any;
  setShowEducation: (e: string) => void;
  educationResumeLines: any;
}) {
  const [edited, setEdited] = useState(false);
  const [sectionEdited, setSectionEdited] = useState(false);

  const showEducationOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked === true) {
      setShowEducation("true");
    } else {
      setShowEducation("false");
    }

    if (sectionEdited === false) {
      setSectionEdited(true);
    }
  };

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  // Wrappers so form.action gets (formData: FormData) => void | Promise<void>
  const handleCreateResumeLine = async (formData: FormData): Promise<void> => {
    try {
      const result = await createResumeLine(formData);
      if (result?.errors) {
        console.error("Create resume line failed:", result);
      } else {
        // success — optionally revalidate or update local UI
      }
    } catch (err) {
      console.error("Unexpected error creating resume line:", err);
    }
  };

  const handleDeleteResumeLine = async (formData: FormData): Promise<void> => {
    try {
      const result = await deleteResumeLine(formData);
      if (result?.errors) {
        console.error("Delete resume line failed:", result);
      } else {
        // success — optionally revalidate or update local UI
      }
    } catch (err) {
      console.error("Unexpected error deleting resume line:", err);
    }
  };

  const handleUpdateUserEducation = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      const result = await updateUserEducation(formData);
      if (result?.errors) {
        console.error("Update user education failed:", result);
      } else {
        setEdited(false);
        // success — optionally revalidate or show toast
      }
    } catch (err) {
      console.error("Unexpected error updating user education:", err);
    }
  };

  const handleUpdateEducationSection = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      const result = await updateEducationSection(formData);
      if (result?.errors) {
        console.error("Update education section failed:", result);
      } else {
        setSectionEdited(false);
        // success — optionally revalidate or show toast
      }
    } catch (err) {
      console.error("Unexpected error updating education section:", err);
    }
  };

  return (
    <div>
      <div className="your-education">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="py-2 font-bold text-xl">
              <h2 className="">Your Education</h2>
            </div>
          </div>
          <div className="flex flex-col "></div>
        </div>
        <div className="form-amber rounded p-4">
          {showEducation === "true" ? (
            <>
              <h2 className="font-medium">Choose Education Experiences</h2>
              <div className="h-[150px] overflow-y-auto tight-shadow mt-2 rounded bg-white">
                <ul className="">
                  {userEducation?.map((education: UserEducationExperience) => (
                    <li className="border" key={education?.id}>
                      <div className="flex flex-row p-2 justify-between">
                        <div className="flex flex-col w-3/4">
                          <h2 className="font-bold">
                            {education?.institution_name}
                          </h2>
                          <p>{education?.program}</p>
                        </div>
                        <div className="flex flex-col pt-3 pr-6 ">
                          <div className="flex flex-row m-auto">
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
                                defaultValue={"education"}
                              />
                              <input
                                hidden
                                readOnly
                                name="id"
                                defaultValue={education?.id}
                              />
                              <SubmitButton
                                className={"hover:text-azure-radiance-500"}
                              >
                                Add
                              </SubmitButton>
                            </form>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col w-full py-2">
                <ul className="">
                  {educationResumeLines[0] ? (
                    educationResumeLines?.map((education: any) => (
                      <li className="mt-3 py-3" key={education?.id}>
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col w-1/3">
                            <div className="flex flex-row justify-between"></div>
                          </div>
                          <div className="flex flex-col"></div>
                          <div className="flex flex-col">
                            <form action={handleDeleteResumeLine}>
                              <input
                                hidden
                                readOnly
                                name="user_id"
                                id="user_id"
                                defaultValue={user?.id}
                              />
                              <input
                                hidden
                                readOnly
                                name="resume_id"
                                id="resume_id"
                                defaultValue={resume?.id}
                              />
                              <input
                                hidden
                                readOnly
                                name="user_education_id"
                                id="user_education_id"
                                defaultValue={education?.user_education_id}
                              />
                              <div className="flex flex-row justify-end">
                                <SubmitButton className={"hover:text-rose-500"}>
                                  Remove
                                </SubmitButton>
                              </div>
                            </form>
                          </div>
                        </div>
                        <form
                          action={handleUpdateUserEducation}
                          className="tight-shadow bg-slate-50 rounded w-full pb-2 px-2"
                        >
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label htmlFor="resume_id" hidden />
                              <input
                                hidden
                                defaultValue={resume?.id}
                                name="resume_id"
                                id="resume_id"
                              />
                              <label htmlFor="education_id" hidden />
                              <input
                                hidden
                                defaultValue={education?.id}
                                name="education_id"
                                id="education_id"
                              />
                              <label
                                className="py-1 font-medium"
                                htmlFor="institution_name"
                              >
                                Institution Name
                              </label>
                              <input
                                id="institution_name"
                                name="institution_name"
                                className="rounded"
                                defaultValue={education?.institution_name}
                                onChange={onChangeHandler}
                                placeholder="Institution Name"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label
                                className="py-1 font-medium"
                                htmlFor="location"
                              >
                                Location
                              </label>
                              <input
                                id="location"
                                name="location"
                                className="rounded"
                                defaultValue={education?.location}
                                onChange={onChangeHandler}
                                placeholder="Location"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-1/3 py-1 px-1">
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
                                defaultValue={education?.start_date}
                                onChange={onChangeHandler}
                                placeholder="Start Date"
                              />
                            </div>
                            <div className="flex flex-col w-1/3 py-1 px-1">
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
                                defaultValue={education?.end_date}
                                onChange={onChangeHandler}
                                placeholder="End Date"
                              />
                            </div>
                            <div className="flex flex-col w-1/3 py-1 px-1">
                              <label
                                className="py-1 font-medium"
                                htmlFor="grade"
                              >
                                GPA/AVG
                              </label>
                              <input
                                id="grade"
                                name="grade"
                                className="rounded"
                                defaultValue={education?.grade}
                                onChange={onChangeHandler}
                                placeholder="GPA/AVG"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label
                                className="py-1 font-medium"
                                htmlFor="program"
                              >
                                Program
                              </label>
                              <input
                                id="program"
                                name="program"
                                className="rounded"
                                defaultValue={education?.program}
                                onChange={onChangeHandler}
                                placeholder="Degree"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label className="py-1 font-medium" htmlFor="url">
                                Link (Web URL)
                              </label>
                              <input
                                id="url"
                                name="url"
                                className="rounded"
                                defaultValue={education?.url}
                                onChange={onChangeHandler}
                                placeholder="Web link"
                              />
                            </div>
                          </div>
                          {edited && (
                            <SubmitButton className="btn btn-amber my-4 animate-pulse">
                              Save Change
                            </SubmitButton>
                          )}
                        </form>
                      </li>
                    ))
                  ) : (
                    <li></li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            ""
          )}
          <form action={handleUpdateEducationSection}>
            <div className="flex flex-row py-1">
              <div className="flex flex-col px-1 py-2">
                <input
                  hidden
                  readOnly
                  id="user_id"
                  name="user_id"
                  defaultValue={user?.id}
                />
                <input
                  hidden
                  readOnly
                  id="resume_id"
                  name="resume_id"
                  defaultValue={resume?.id}
                />
                <input
                  hidden
                  readOnly
                  id="show_education_section"
                  name="show_education_section"
                  defaultValue={showEducation}
                />
                <label htmlFor="show_education_section_input" hidden />
                <input
                  title="Show Education Section?"
                  type="checkbox"
                  className="rounded bg-slate-200"
                  checked={showEducation === "true" ? true : false}
                  value={showEducation}
                  onChange={showEducationOnChangeHandler}
                  name="show_education_section_input"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="py-1 px-1 font-medium">
                  Show Education Section?
                </h2>
              </div>
            </div>
            {sectionEdited && (
              <SubmitButton className="btn btn-amber my-4 p-2 text-center w-auto animate-pulse">
                Save Change
              </SubmitButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

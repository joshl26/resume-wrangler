"use client";

import {
  createResumeLine,
  deleteResumeLine,
  updateSkillsSection,
} from "@/app/lib/actions";
import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { Resume, User, UserSkill, UserSkills } from "@/app/lib/definitions";

export default function YourSkills({
  userSkills,
  user,
  resume,
  setShowSkills,
  showSkills,
  showSkillProgress,
  setShowSkillProgress,
  skillResumeLines,
}: {
  userSkills: UserSkills;
  user: User;
  resume: Resume;
  setShowSkills: (e: string) => void;
  showSkills: string;
  setShowSkillProgress: (e: string) => void;
  showSkillProgress: string;
  skillResumeLines: any;
}) {
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showSkillsOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked === true) {
      setShowSkills("true");
    } else {
      setShowSkills("false");
    }

    if (edited === false) {
      setEdited(true);
    }
  };

  const showSkillProgressBarsOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked === true) {
      setShowSkillProgress("true");
    } else {
      setShowSkillProgress("false");
    }

    if (edited === false) {
      setEdited(true);
    }
  };

  // Wrapper so form.action gets (formData: FormData) => void | Promise<void>
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

  const handleUpdateSkillsSection = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      setIsSubmitting(true);
      const result = await updateSkillsSection(formData);
      if (result?.errors) {
        console.error("Update skills section failed:", result);
      } else {
        setEdited(false);
      }
    } catch (err) {
      console.error("Unexpected error updating skills section:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="your-skills">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="py-2 font-bold text-xl">
            <h2>Your Skills</h2>
          </div>
        </div>
        <div className="flex flex-col " />
      </div>
      <div className="form-amber rounded px-5 py-2 ">
        {showSkills === "true" ? (
          <>
            <h2 className="font-medium py-1">Choose Skills</h2>

            <div className="flex flex-row h-[300px] w-full overflow-y-auto tight-shadow bg-white">
              <ul className="w-full">
                {userSkills.map((skill: UserSkill) => (
                  <li className="border  p-2" key={skill?.id}>
                    <div className="flex flex-row  justify-between">
                      <div className="flex flex-col w-1/3 mr-8">
                        <h2 className="font-bold">{skill?.skill}</h2>
                      </div>
                      <div className="flex flex-col w-1/3 m-auto">
                        <input
                          readOnly
                          type="range"
                          value={skill?.skill_level}
                        />
                      </div>
                      <div className="flex flex-col w-1/3 m-auto">
                        <div className="flex flex-row justify-end">
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
                              defaultValue={"skill"}
                            />
                            <input
                              hidden
                              readOnly
                              name="id"
                              defaultValue={skill?.id}
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
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col py-2">
              <p className="py-1 font-medium">Chosen Resume Skills</p>
              <div className="flex flex-col h-[100px] tight-shadow overflow-y-auto bg-white">
                {skillResumeLines[0] ? (
                  skillResumeLines?.map((userSkill: UserSkill) => (
                    <div
                      key={userSkill?.id}
                      className="flex flex-row justify-between border p-2 "
                    >
                      <div className="flex flex-col w-3/4">
                        <div className="text-center w-full h-full">
                          <h2 className="font-bold">{userSkill?.skill}</h2>
                        </div>
                        {showSkillProgress === "true" ? (
                          <div className="flex flex-row p-2">
                            <input
                              title="skill_level"
                              readOnly
                              className="w-full"
                              value={userSkill?.skill_level}
                              type="range"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-row py-3">
                            <input
                              hidden
                              className="w-full"
                              defaultValue={userSkill?.skill_level}
                              type="range"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col w-1/4 m-auto">
                        <form className="p-1" action={handleDeleteResumeLine}>
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
                            defaultValue={"skill"}
                          />
                          <input
                            hidden
                            readOnly
                            id="resume_id"
                            name="resume_id"
                            defaultValue={resume?.id}
                            type="text"
                          />
                          <input
                            readOnly
                            type="text"
                            name="id"
                            id="id"
                            defaultValue={userSkill?.id}
                            hidden
                          />
                          <SubmitButton
                            className={"hover:text-rose-500"}
                            disabled={isSubmitting}
                          >
                            Remove
                          </SubmitButton>
                        </form>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2 className="text-center animate-pulse py-2">
                    Please add a skill from the list above
                  </h2>
                )}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <form action={handleUpdateSkillsSection} className="flex flex-col">
          {showSkills === "true" ? (
            <div className="flex flex-row py-2">
              <div className="px-1 flex align-middle">
                <input
                  hidden
                  readOnly
                  id="show_skill_progress"
                  name="show_skill_progress"
                  defaultValue={showSkillProgress}
                />
                <input
                  title="show_skill_progress_input"
                  checked={showSkillProgress === "true" ? true : false}
                  value={showSkillProgress}
                  onChange={showSkillProgressBarsOnChangeHandler}
                  className="m-auto rounded"
                  type="checkbox"
                  name="show_skill_progress_input"
                />
              </div>
              <div className="flex flex-col">
                <p className="py-1 px-1 font-medium">
                  Show skills progress bars?
                </p>
              </div>
            </div>
          ) : (
            <div className="px-1 flex align-middle">
              <input
                hidden
                readOnly
                id="show_skill_progress"
                name="show_skill_progress"
                defaultValue={showSkillProgress}
              />
            </div>
          )}
          <div className="flex flex-row py-1">
            <div className="flex flex-col px-1 py-2">
              <label hidden htmlFor="user_id" />
              <input
                hidden
                readOnly
                id="user_id"
                name="user_id"
                defaultValue={user?.id}
              />
              <label hidden htmlFor="resume_id" />
              <input
                hidden
                readOnly
                id="resume_id"
                name="resume_id"
                defaultValue={resume?.id}
              />
              <label hidden htmlFor="show_skills_section" />
              <input
                hidden
                readOnly
                id="show_skills_section"
                name="show_skills_section"
                defaultValue={showSkills}
              />
              <input
                title="show_skills_section_input"
                type="checkbox"
                className="rounded"
                checked={showSkills === "true" ? true : false}
                value={showSkills}
                onChange={showSkillsOnChangeHandler}
                name="show_skills_section_input"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="py-1 px-1 font-medium">Show skills section?</h2>
            </div>
          </div>
          {edited && (
            <>
              <div style={{ height: "0.5rem" }} />
              <SubmitButton
                className="btn btn-amber my-4 animate-pulse"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving…" : "Save Change"}
              </SubmitButton>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

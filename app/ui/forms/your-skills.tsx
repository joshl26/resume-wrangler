"use client";

import {
  createResumeLine,
  deleteResumeLine,
  updateSkillsSection,
} from "@/app/lib/actions";
import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { Resume, User, UserSkill, UserSkills } from "@/app/lib/definitions";
import "./your-skills.css";

export default function YourSkills({
  userSkills,
  user,
  resume,
  setShowSkills,
  showSkills,
  setShowSkillProgress,
  showSkillProgress,
  skillResumeLines,
}: {
  userSkills: UserSkills;
  user: User;
  resume: Resume;
  setShowSkills: (value: boolean) => void;
  showSkills: boolean;
  setShowSkillProgress: (value: boolean) => void;
  showSkillProgress: boolean;
  skillResumeLines: any;
}) {
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showSkillsOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShowSkills(e.target.checked);
    if (!edited) setEdited(true);
  };

  const showSkillProgressBarsOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShowSkillProgress(e.target.checked);
    if (!edited) setEdited(true);
  };

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
      <div className="your-skills-header">
        <h2>Your Skills</h2>
      </div>
      <div className="your-skills-form">
        {showSkills && (
          <>
            <h3 className="your-skills-subheader">Choose Skills</h3>

            <div className="skills-list">
              <ul>
                {userSkills.map((skill: UserSkill) => (
                  <li key={skill?.id} className="skill-item">
                    <div className="skill-name">{skill?.skill}</div>
                    <div className="skill-level">
                      <input
                        readOnly
                        type="range"
                        value={skill?.skill_level}
                        className="skill-range"
                      />
                    </div>
                    <div className="skill-action">
                      <form action={handleCreateResumeLine}>
                        <input
                          type="hidden"
                          name="resume_id"
                          value={resume?.id}
                        />
                        <input type="hidden" name="user_id" value={user?.id} />
                        <input type="hidden" name="line_type" value="skill" />
                        <input type="hidden" name="id" value={skill?.id} />
                        <SubmitButton
                          disabled={isSubmitting}
                          className="btn btn-amber"
                        >
                          Add
                        </SubmitButton>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="chosen-skills-section">
              <p className="chosen-skills-title">Chosen Resume Skills</p>
              <div className="chosen-skills-list">
                {skillResumeLines[0] ? (
                  skillResumeLines.map((userSkill: UserSkill) => (
                    <div key={userSkill?.id} className="chosen-skill-item">
                      <div className="chosen-skill-info">
                        <h4 className="chosen-skill-name">
                          {userSkill?.skill}
                        </h4>
                        {showSkillProgress ? (
                          <input
                            title="skill_level"
                            readOnly
                            className="skill-range"
                            value={userSkill?.skill_level}
                            type="range"
                          />
                        ) : (
                          <input
                            hidden
                            defaultValue={userSkill?.skill_level}
                            type="range"
                          />
                        )}
                      </div>
                      <div className="chosen-skill-action">
                        <form action={handleDeleteResumeLine}>
                          <input
                            type="hidden"
                            name="user_id"
                            value={user?.id}
                          />
                          <input type="hidden" name="line_type" value="skill" />
                          <input
                            type="hidden"
                            name="resume_id"
                            value={resume?.id}
                          />
                          <input
                            type="hidden"
                            name="id"
                            value={userSkill?.id}
                          />
                          <SubmitButton
                            disabled={isSubmitting}
                            className="btn btn-rose"
                          >
                            Remove
                          </SubmitButton>
                        </form>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-skills-message">
                    Please add a skill from the list above
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        <form
          action={handleUpdateSkillsSection}
          className="skills-section-toggle-form"
        >
          {showSkills && (
            <div className="toggle-row">
              <input
                type="hidden"
                id="show_skill_progress"
                name="show_skill_progress"
                value={showSkillProgress ? "true" : "false"}
              />
              <input
                type="checkbox"
                id="show_skill_progress_input"
                name="show_skill_progress_input"
                checked={showSkillProgress}
                onChange={showSkillProgressBarsOnChangeHandler}
                className="toggle-checkbox"
              />
              <label
                htmlFor="show_skill_progress_input"
                className="toggle-label"
              >
                Show skills progress bars?
              </label>
            </div>
          )}
          <div className="toggle-row">
            <input type="hidden" id="user_id" name="user_id" value={user?.id} />
            <input
              type="hidden"
              id="resume_id"
              name="resume_id"
              value={resume?.id}
            />
            <input
              type="hidden"
              id="show_skills_section"
              name="show_skills_section"
              value={showSkills ? "true" : "false"}
            />
            <input
              type="checkbox"
              id="show_skills_section_input"
              name="show_skills_section_input"
              checked={showSkills}
              onChange={showSkillsOnChangeHandler}
              className="toggle-checkbox"
            />
            <label htmlFor="show_skills_section_input" className="toggle-label">
              Show skills section?
            </label>
          </div>
          {edited && (
            <div className="submit-button-wrapper">
              <SubmitButton
                disabled={isSubmitting}
                className="btn btn-amber animate-pulse"
              >
                {isSubmitting ? "Saving…" : "Save Change"}
              </SubmitButton>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

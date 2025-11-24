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
import "./your-education.css";

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
  showEducation: boolean;
  setShowEducation: (value: boolean) => void;
  educationResumeLines: any;
}) {
  const [edited, setEdited] = useState(false);
  const [sectionEdited, setSectionEdited] = useState(false);

  const showEducationOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShowEducation(e.target.checked);
    if (!sectionEdited) {
      setSectionEdited(true);
    }
  };

  const onChangeHandler = () => {
    if (!edited) {
      setEdited(true);
    }
  };

  const handleCreateResumeLine = async (formData: FormData): Promise<void> => {
    try {
      const result = await createResumeLine(formData);
      if (result?.errors) {
        console.error("Create resume line failed:", result);
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
      }
    } catch (err) {
      console.error("Unexpected error updating education section:", err);
    }
  };

  return (
    <div className="your-education">
      <div className="your-education-header">
        <h2>Your Education</h2>
      </div>
      <div className="your-education-form">
        {showEducation && (
          <>
            <h3 className="your-education-subheader">
              Choose Education Experiences
            </h3>
            <div className="education-list">
              <ul>
                {userEducation?.map((education: UserEducationExperience) => (
                  <li key={education?.id} className="education-item">
                    <div>
                      <h3 className="education-institution">
                        {education?.institution_name}
                      </h3>
                      <p className="education-program">{education?.program}</p>
                    </div>
                    <form action={handleCreateResumeLine}>
                      <input
                        type="hidden"
                        name="resume_id"
                        value={resume?.id}
                        readOnly
                      />
                      <input
                        type="hidden"
                        name="user_id"
                        value={user?.id}
                        readOnly
                      />
                      <input
                        type="hidden"
                        name="line_type"
                        value="education"
                        readOnly
                      />
                      <input
                        type="hidden"
                        name="id"
                        value={education?.id}
                        readOnly
                      />
                      <SubmitButton className="btn btn-amber">Add</SubmitButton>
                    </form>
                  </li>
                ))}
              </ul>
            </div>

            <div className="chosen-education-section">
              <ul>
                {educationResumeLines[0] ? (
                  educationResumeLines.map((education: any) => (
                    <li key={education?.id} className="chosen-education-item">
                      <div className="chosen-education-header">
                        <div />
                        <form action={handleDeleteResumeLine}>
                          <input
                            type="hidden"
                            name="user_id"
                            value={user?.id}
                            readOnly
                          />
                          <input
                            type="hidden"
                            name="resume_id"
                            value={resume?.id}
                            readOnly
                          />
                          <input
                            type="hidden"
                            name="user_education_id"
                            value={education?.user_education_id}
                            readOnly
                          />
                          <SubmitButton className="btn btn-rose">
                            Remove
                          </SubmitButton>
                        </form>
                      </div>

                      <form
                        action={handleUpdateUserEducation}
                        className="education-edit-form"
                      >
                        <input
                          type="hidden"
                          name="resume_id"
                          value={resume?.id}
                        />
                        <input
                          type="hidden"
                          name="education_id"
                          value={education?.id}
                        />
                        <div className="education-fields">
                          <div>
                            <label htmlFor="institution_name">
                              Institution Name
                            </label>
                            <input
                              id="institution_name"
                              name="institution_name"
                              className="input-field"
                              defaultValue={education?.institution_name}
                              onChange={onChangeHandler}
                              placeholder="Institution Name"
                            />
                          </div>
                          <div>
                            <label htmlFor="location">Location</label>
                            <input
                              id="location"
                              name="location"
                              className="input-field"
                              defaultValue={education?.location}
                              onChange={onChangeHandler}
                              placeholder="Location"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label htmlFor="start_date">Start Date</label>
                              <input
                                id="start_date"
                                name="start_date"
                                className="input-field"
                                defaultValue={education?.start_date}
                                onChange={onChangeHandler}
                                placeholder="Start Date"
                              />
                            </div>
                            <div>
                              <label htmlFor="end_date">End Date</label>
                              <input
                                id="end_date"
                                name="end_date"
                                className="input-field"
                                defaultValue={education?.end_date}
                                onChange={onChangeHandler}
                                placeholder="End Date"
                              />
                            </div>
                            <div>
                              <label htmlFor="grade">GPA/AVG</label>
                              <input
                                id="grade"
                                name="grade"
                                className="input-field"
                                defaultValue={education?.grade}
                                onChange={onChangeHandler}
                                placeholder="GPA/AVG"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="program">Program</label>
                            <input
                              id="program"
                              name="program"
                              className="input-field"
                              defaultValue={education?.program}
                              onChange={onChangeHandler}
                              placeholder="Degree"
                            />
                          </div>
                          <div>
                            <label htmlFor="url">Link (Web URL)</label>
                            <input
                              id="url"
                              name="url"
                              className="input-field"
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
        )}
        <form
          action={handleUpdateEducationSection}
          className="education-section-toggle-form"
        >
          <div className="toggle-row">
            <input type="hidden" name="user_id" value={user?.id} readOnly />
            <input type="hidden" name="resume_id" value={resume?.id} readOnly />
            <input
              type="hidden"
              name="show_education_section"
              value={showEducation ? "true" : "false"}
            />
            <input
              type="checkbox"
              id="show_education_section_input"
              name="show_education_section_input"
              checked={showEducation}
              onChange={showEducationOnChangeHandler}
              className="toggle-checkbox"
            />
            <label
              htmlFor="show_education_section_input"
              className="toggle-label"
            >
              Show Education Section?
            </label>
          </div>
          {sectionEdited && (
            <div className="submit-button-wrapper">
              <SubmitButton className="btn btn-amber animate-pulse">
                Save Change
              </SubmitButton>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

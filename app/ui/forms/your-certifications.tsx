"use client";

import {
  createCertification,
  createResumeLine,
  deleteResumeLine,
  updateCertificationSectionTitle,
  updateCertificationsSection,
  updateUserCertfication,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import {
  Resume,
  User,
  UserCertification,
  UserCertifications,
} from "@/app/lib/definitions";
import "./your-certifications.css";

export default function YourCertifications({
  userCertifications,
  resume,
  user,
  showCustomSectionTwo,
  setShowCustomSectionTwo,
  certificationResumeLines,
}: {
  userCertifications: UserCertifications;
  resume: Resume;
  user: User;
  showCustomSectionTwo: boolean;
  setShowCustomSectionTwo: (value: boolean) => void;
  certificationResumeLines: any;
}) {
  const [sectionTitle, setSectionTitle] = useState(
    resume?.custom_section_two_name,
  );

  const [edited, setEdited] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [editSectionTitle, setEditSectionTitle] = useState(false);
  const [addCertification, setAddCertification] = useState(false);

  const onChangeHandler = () => {
    if (!edited) {
      setEdited(true);
    }
  };

  const newCertificationOnChangeHandler = () => {
    if (!addCertification) {
      setAddCertification(true);
    }
  };

  const setSectionTitleOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSectionTitle(e.target.value);

    if (!edited) {
      setEditSectionTitle(true);
    }
  };

  const showCertificationsOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShowCustomSectionTwo(e.target.checked);

    if (!editSection) {
      setEditSection(true);
    }
  };

  // Wrappers so form.action gets (formData: FormData) => void | Promise<void>
  const handleUpdateSectionTitle = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      const result = await updateCertificationSectionTitle(formData);
      if (result?.errors) {
        console.error("Update section title failed:", result);
      } else {
        setEditSectionTitle(false);
      }
    } catch (err) {
      console.error("Unexpected error updating section title:", err);
    }
  };

  const handleCreateCertification = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      const result = await createCertification(formData);
      if (result?.errors) {
        console.error("Create certification failed:", result);
      } else {
        setAddCertification(false);
      }
    } catch (err) {
      console.error("Unexpected error creating certification:", err);
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

  const handleUpdateUserCertification = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      const result = await updateUserCertfication(formData);
      if (result?.errors) {
        console.error("Update certification failed:", result);
      } else {
        setEdited(false);
      }
    } catch (err) {
      console.error("Unexpected error updating certification:", err);
    }
  };

  const handleUpdateCertificationsSection = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      const result = await updateCertificationsSection(formData);
      if (result?.errors) {
        console.error("Update certifications section failed:", result);
      } else {
        setEditSection(false);
      }
    } catch (err) {
      console.error("Unexpected error updating certifications section:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="font-bold text-xl py-2 border-b border-gray-300">
        <h2>Your {sectionTitle}</h2>
      </div>
      <div className="your-certifications rounded tight-shadow form-amber px-6 py-4 mt-4">
        <div className="flex flex-row justify-between mb-4">
          <div />
          <div />
        </div>
        {showCustomSectionTwo && (
          <>
            <form action={handleUpdateSectionTitle} className="pb-4">
              <div className="flex flex-col max-w-md">
                <input
                  readOnly
                  hidden
                  name="resume_id"
                  id="resume_id"
                  defaultValue={resume?.id}
                />
                <input
                  readOnly
                  hidden
                  name="user_id"
                  id="user_id"
                  defaultValue={user?.id}
                />
                <label
                  className="py-2 font-semibold text-gray-700"
                  htmlFor="section_title"
                >
                  Section Title
                </label>
                <input
                  required
                  type="text"
                  maxLength={14}
                  id="section_title"
                  name="section_title"
                  className="rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  defaultValue={sectionTitle}
                  onChange={setSectionTitleOnChangeHandler}
                  placeholder="Section Title"
                />
              </div>
              {editSectionTitle && (
                <div className="mt-4">
                  <SubmitButton className="btn btn-amber animate-pulse">
                    Save Change
                  </SubmitButton>
                </div>
              )}
            </form>

            <form
              action={handleCreateCertification}
              className="flex flex-col max-w-md space-y-4 mb-6"
            >
              <input
                readOnly
                hidden
                name="resume_id"
                id="resume_id"
                defaultValue={resume?.id}
              />
              <input
                hidden
                name="user_id"
                id="user_id"
                defaultValue={user.id}
              />
              <input
                hidden
                required
                type="text"
                maxLength={14}
                id="section_title"
                name="section_title"
                className="rounded"
                defaultValue={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="Section Title"
              />
              <h2 className="text-lg font-semibold">Add New {sectionTitle}</h2>
              <div className="rounded tight-shadow bg-gray-50 p-4">
                <div className="mb-4">
                  <label
                    className="block mb-1 font-medium text-gray-700"
                    htmlFor="certification_name"
                  >
                    Name
                  </label>
                  <input
                    required
                    id="certification_name"
                    name="certification_name"
                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    defaultValue={""}
                    onChange={() => {}}
                    placeholder="Title, Activity, name, etc.."
                  />
                </div>
                <div>
                  <label
                    className="block mb-1 font-medium text-gray-700"
                    htmlFor="certification_location"
                  >
                    Location
                  </label>
                  <input
                    id="certification_location"
                    name="certification_location"
                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    defaultValue={""}
                    onChange={newCertificationOnChangeHandler}
                    placeholder="Location"
                  />
                </div>
              </div>
              {addCertification && (
                <SubmitButton className="btn btn-amber animate-pulse mt-4">
                  Add New Entry
                </SubmitButton>
              )}
            </form>

            <h2 className="font-semibold text-lg mb-3">Your Certifications</h2>
            <ul className="overflow-y-auto max-h-[150px] tight-shadow rounded bg-white mb-6">
              {userCertifications[0] &&
                userCertifications.map((certification: UserCertification) => (
                  <li
                    className="p-3 border-b border-gray-200 flex justify-between items-center"
                    key={certification.id}
                  >
                    <div>
                      <h3 className="font-bold">{certification.name}</h3>
                      <p className="text-gray-600">{certification.location}</p>
                    </div>
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
                        defaultValue={"custom-section-two"}
                      />
                      <input
                        hidden
                        readOnly
                        name="id"
                        defaultValue={certification.id}
                      />
                      <SubmitButton className="hover:text-amber-600">
                        Add
                      </SubmitButton>
                    </form>
                  </li>
                ))}
            </ul>

            <h2 className="font-semibold text-lg mb-3">
              Selected Certifications
            </h2>
            <ul className="overflow-y-auto max-h-[200px] tight-shadow rounded bg-white">
              {certificationResumeLines[0] &&
                certificationResumeLines.map((certification: any) => (
                  <li
                    className="border-b border-gray-200 bg-white p-3 flex flex-col space-y-3"
                    key={certification.id}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold">{certification.name}</h3>
                      <form action={handleDeleteResumeLine}>
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
                          defaultValue={"custom-section-two"}
                        />
                        <input
                          readOnly
                          hidden
                          name="id"
                          id="id"
                          defaultValue={certification.id}
                        />
                        <input
                          readOnly
                          hidden
                          name="resume_id"
                          id="resume_id"
                          defaultValue={resume?.id}
                        />
                        <SubmitButton className="hover:text-red-600">
                          Remove
                        </SubmitButton>
                      </form>
                    </div>

                    <form
                      className="pb-4"
                      action={handleUpdateUserCertification}
                    >
                      <div className="flex flex-col space-y-4">
                        <input
                          readOnly
                          hidden
                          name="user_id"
                          id="user_id"
                          defaultValue={user?.id}
                        />
                        <input
                          readOnly
                          hidden
                          name="certification_id"
                          id="certification_id"
                          defaultValue={certification.id}
                        />
                        <input
                          readOnly
                          hidden
                          name="resume_id"
                          id="resume_id"
                          defaultValue={resume?.id}
                        />
                        <div>
                          <label
                            className="block mb-1 font-medium"
                            htmlFor="certification_name"
                          >
                            Name
                          </label>
                          <input
                            required
                            id="certification_name"
                            name="certification_name"
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            defaultValue={certification.name}
                            onChange={onChangeHandler}
                            placeholder="Title, Activity, name, etc.."
                          />
                        </div>
                        <div>
                          <label
                            className="block mb-1 font-medium"
                            htmlFor="location_name"
                          >
                            Location
                          </label>
                          <input
                            required
                            id="location_name"
                            name="location_name"
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            defaultValue={certification.location}
                            onChange={onChangeHandler}
                            placeholder="Title, Activity, name, etc.."
                          />
                        </div>
                      </div>
                      {edited && (
                        <div className="mt-4">
                          <SubmitButton className="btn btn-amber animate-pulse">
                            Save Change
                          </SubmitButton>
                        </div>
                      )}
                    </form>
                  </li>
                ))}
            </ul>
          </>
        )}

        <form action={handleUpdateCertificationsSection}>
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
            name="show_custom_section_two"
            id="show_custom_section_two"
            type="text"
            value={showCustomSectionTwo ? "true" : "false"}
          />
          <div className="flex flex-row items-center space-x-4 mt-4">
            <input
              title="Show Certifications Section"
              className="rounded cursor-pointer"
              type="checkbox"
              checked={showCustomSectionTwo}
              onChange={showCertificationsOnChangeHandler}
              name="show_custom_section_two_input"
              id="show_custom_section_two_input"
            />
            <label
              htmlFor="show_custom_section_two_input"
              className="font-medium select-none cursor-pointer"
            >
              Show {sectionTitle} section?
            </label>
          </div>
          {editSection && (
            <div className="mt-4">
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

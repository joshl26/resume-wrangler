"use client";

import {
  createOrganization,
  createResumeLine,
  deleteResumeLine,
  updateOrganizationSection,
  updateOrganizationSectionTitle,
  updateUserOrganization,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import {
  Resume,
  User,
  UserOrganization,
  userOrganizations,
} from "@/app/lib/definitions";
import "./your-organizations.css";

export default function YourOrganizations({
  userOrganizations,
  resume,
  user,
  showCustomSectionOne,
  setShowCustomSectionOne,
  organizationResumeLines,
}: {
  userOrganizations: userOrganizations;
  resume: Resume;
  user: User;
  showCustomSectionOne: boolean;
  setShowCustomSectionOne: (value: boolean) => void;
  organizationResumeLines: any;
}) {
  const [sectionTitle, setSectionTitle] = useState(
    resume?.custom_section_one_name,
  );

  const [edited, setEdited] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [editSectionTitle, setEditSectionTitle] = useState(false);

  const onChangeHandler = () => {
    if (!edited) {
      setEdited(true);
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

  const showOrganizationsOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShowCustomSectionOne(e.target.checked);

    if (!editSection) {
      setEditSection(true);
    }
  };

  // Wrappers so form.action gets (formData: FormData) => void | Promise<void>
  const handleUpdateSectionTitle = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      const result = await updateOrganizationSectionTitle(formData);
      if (result?.errors) {
        console.error("Update section title failed:", result);
      } else {
        setEditSectionTitle(false);
      }
    } catch (err) {
      console.error("Unexpected error updating section title:", err);
    }
  };

  const handleCreateOrganization = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      const result = await createOrganization(formData);
      if (result?.errors) {
        console.error("Create organization failed:", result);
      } else {
        setEdited(false);
      }
    } catch (err) {
      console.error("Unexpected error creating organization:", err);
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

  const handleUpdateUserOrganization = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      const result = await updateUserOrganization(formData);
      if (result?.errors) {
        console.error("Update user organization failed:", result);
      } else {
        setEdited(false);
      }
    } catch (err) {
      console.error("Unexpected error updating user organization:", err);
    }
  };

  const handleUpdateOrganizationSection = async (
    formData: FormData,
  ): Promise<void> => {
    try {
      const result = await updateOrganizationSection(formData);
      if (result?.errors) {
        console.error("Update organization section failed:", result);
      } else {
        setEditSection(false);
      }
    } catch (err) {
      console.error("Unexpected error updating organization section:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="py-2 font-bold text-xl border-b border-gray-300">
        <h2>Your {sectionTitle}</h2>
      </div>
      <div className="your-organizations rounded form-amber px-6 py-4 mt-4">
        <div className="flex justify-between mb-4">
          <div />
          <div />
        </div>
        {showCustomSectionOne && (
          <>
            <form action={handleUpdateSectionTitle} className="pb-4 max-w-md">
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
                maxLength={14}
                id="section_title"
                name="section_title"
                className="rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                defaultValue={sectionTitle}
                onChange={setSectionTitleOnChangeHandler}
                placeholder="Section Title"
              />
              {editSectionTitle && (
                <div className="mt-4">
                  <SubmitButton className="btn btn-amber animate-pulse">
                    Save Change
                  </SubmitButton>
                </div>
              )}
            </form>

            <h2 className="py-2 font-semibold text-lg max-w-md">
              Add New {sectionTitle}
            </h2>
            <form
              action={handleCreateOrganization}
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
                readOnly
                hidden
                name="section_title"
                id="section_title"
                defaultValue={sectionTitle}
              />
              <input
                readOnly
                hidden
                name="user_id"
                id="user_id"
                defaultValue={user?.id}
              />
              <div className="rounded tight-shadow bg-gray-50 p-4">
                <div className="mb-4">
                  <label
                    className="block mb-1 font-medium text-gray-700"
                    htmlFor="organization_name"
                  >
                    Name
                  </label>
                  <input
                    required
                    id="organization_name"
                    name="organization_name"
                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    defaultValue={""}
                    onChange={onChangeHandler}
                    placeholder="Title, Activity, name, etc.."
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-1 font-medium text-gray-700"
                    htmlFor="organization_location"
                  >
                    Location
                  </label>
                  <input
                    id="organization_location"
                    name="organization_location"
                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    defaultValue={""}
                    onChange={onChangeHandler}
                    placeholder="Location"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-1 font-medium text-gray-700"
                    htmlFor="organization_start"
                  >
                    Start Date
                  </label>
                  <input
                    id="organization_start"
                    name="organization_start"
                    defaultValue={""}
                    onChange={onChangeHandler}
                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Start Date"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-1 font-medium text-gray-700"
                    htmlFor="organization_end"
                  >
                    End Date
                  </label>
                  <input
                    id="organization_end"
                    name="organization_end"
                    defaultValue={""}
                    onChange={onChangeHandler}
                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="End Date"
                  />
                </div>
                <div>
                  <label
                    className="block mb-1 font-medium text-gray-700"
                    htmlFor="organization_description"
                  >
                    Description
                  </label>
                  <textarea
                    id="organization_description"
                    name="organization_description"
                    defaultValue={""}
                    onChange={onChangeHandler}
                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Description"
                  />
                </div>
              </div>
              {edited && (
                <SubmitButton className="btn btn-amber animate-pulse mt-4">
                  Add New Entry
                </SubmitButton>
              )}
            </form>

            <ul className="bg-white overflow-y-auto tight-shadow rounded max-h-[100px] mb-6">
              {userOrganizations?.map((organization: UserOrganization) => (
                <li
                  className="border-b border-gray-200 p-3 flex justify-between items-center"
                  key={organization?.id}
                >
                  <div>
                    <h3 className="font-bold">{organization?.name}</h3>
                    <p className="text-gray-600">{organization?.location}</p>
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
                      defaultValue={"custom-section-one"}
                    />
                    <input
                      hidden
                      readOnly
                      name="id"
                      defaultValue={organization?.id}
                    />
                    <SubmitButton className="hover:text-amber-600">
                      Add
                    </SubmitButton>
                  </form>
                </li>
              ))}
            </ul>

            <h2 className="font-semibold text-lg mb-3">
              Selected Organizations
            </h2>
            <ul className="overflow-y-auto max-h-[300px] tight-shadow rounded bg-white px-4 py-3 space-y-6">
              {organizationResumeLines[0] &&
                organizationResumeLines.map(
                  (organization: UserOrganization) => (
                    <li key={organization?.id}>
                      <form action={handleDeleteResumeLine}>
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
                          defaultValue={"custom-section-one"}
                        />
                        <input
                          hidden
                          readOnly
                          name="id"
                          defaultValue={organization?.id}
                        />
                        <div className="flex justify-end">
                          <SubmitButton className="hover:text-red-600">
                            Remove
                          </SubmitButton>
                        </div>
                      </form>

                      <form
                        action={handleUpdateUserOrganization}
                        className="rounded tight-shadow bg-gray-50 p-4 mt-2"
                      >
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
                          name="organization_id"
                          id="organization_id"
                          defaultValue={organization?.id}
                        />
                        <input
                          readOnly
                          hidden
                          name="resume_id"
                          id="resume_id"
                          defaultValue={resume?.id}
                        />
                        <div className="space-y-4">
                          <div>
                            <label
                              className="block mb-1 font-medium"
                              htmlFor="organization_name"
                            >
                              Name
                            </label>
                            <input
                              required
                              id="organization_name"
                              name="organization_name"
                              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                              defaultValue={organization?.name}
                              onChange={onChangeHandler}
                              placeholder="Title, Activity, name, etc.."
                            />
                          </div>
                          <div>
                            <label
                              className="block mb-1 font-medium"
                              htmlFor="organization_location"
                            >
                              Location
                            </label>
                            <input
                              id="organization_location"
                              name="organization_location"
                              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                              defaultValue={organization?.location}
                              onChange={onChangeHandler}
                              placeholder="Location"
                            />
                          </div>
                          <div>
                            <label
                              className="block mb-1 font-medium"
                              htmlFor="organization_start"
                            >
                              Start Date
                            </label>
                            <input
                              id="organization_start"
                              name="organization_start"
                              defaultValue={organization?.start_date}
                              onChange={onChangeHandler}
                              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                              placeholder="Start Date"
                            />
                          </div>
                          <div>
                            <label
                              className="block mb-1 font-medium"
                              htmlFor="organization_end"
                            >
                              End Date
                            </label>
                            <input
                              id="organization_end"
                              name="organization_end"
                              defaultValue={organization?.end_date}
                              onChange={onChangeHandler}
                              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                              placeholder="End Date"
                            />
                          </div>
                          <div>
                            <label
                              className="block mb-1 font-medium"
                              htmlFor="organization_description"
                            >
                              Description
                            </label>
                            <textarea
                              id="organization_description"
                              name="organization_description"
                              defaultValue={organization?.description}
                              onChange={onChangeHandler}
                              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                              placeholder="Description"
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
                  ),
                )}
            </ul>
          </>
        )}

        <form action={handleUpdateOrganizationSection}>
          <div className="flex items-center space-x-4 mt-6">
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
              name="show_custom_section_one"
              id="show_custom_section_one"
              type="text"
              value={showCustomSectionOne ? "true" : "false"}
            />
            <input
              title="Show Organizations Section"
              className="rounded cursor-pointer"
              type="checkbox"
              checked={showCustomSectionOne}
              onChange={showOrganizationsOnChangeHandler}
              name="show_organizations_section_input"
              id="show_organizations_section_input"
            />
            <label
              htmlFor="show_organizations_section_input"
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

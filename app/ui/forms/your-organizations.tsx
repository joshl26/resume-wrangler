import {
  createOrganization,
  createResumeLine,
  deleteOrganization,
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
  showCustomSectionOne: string;
  setShowCustomSectionOne: (e: any) => void;
  organizationResumeLines: any;
}) {
  const [sectionTitle, setSectionTitle] = useState(
    resume?.custom_section_one_name
  );

  const [edited, setEdited] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [editSectionTitle, setEditSectionTitle] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  const setSectionTitleOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSectionTitle(e.target.value);

    if (edited === false) {
      setEditSectionTitle(true);
    }
  };

  const showOrganizationsOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked === true) {
      setShowCustomSectionOne("true");
    } else {
      setShowCustomSectionOne("false");
    }

    if (edited === false) {
      setEditSection(true);
    }
  };

  return (
    <div className=" w-full px-2">
      <div className="py-2 font-bold text-xl">
        <h2>Your {sectionTitle}</h2>
      </div>
      <div className="your-organizations rounded border p-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col"></div>
          <div className="flex flex-col "></div>
        </div>
        {showCustomSectionOne === "true" ? (
          <>
            <form
              onSubmit={() => setEditSectionTitle(false)}
              action={updateOrganizationSectionTitle}
              className="pb-2"
            >
              <div className="flex flex-col">
                <input
                  readOnly
                  hidden
                  name="resume_id"
                  id="resume_id"
                  value={resume?.id}
                />
                <label hidden htmlFor="user_id" />
                <input
                  readOnly
                  hidden
                  name="user_id"
                  id="user_id"
                  value={user?.id}
                />
                <label className="py-1" htmlFor="section_title">
                  Section Title
                </label>
                <input
                  required
                  type="text"
                  maxLength={14}
                  id="section_title"
                  name="section_title"
                  className="rounded bg-slate-200"
                  defaultValue={sectionTitle}
                  onChange={setSectionTitleOnChangeHandler}
                  placeholder="Section Title"
                />
              </div>
              {editSectionTitle && (
                <>
                  <div style={{ height: "0.5rem" }} />
                  <SubmitButton className="btn btn-amber my-4 animate-pulse">
                    Save Change
                  </SubmitButton>
                </>
              )}
            </form>
            <h2 className="py-1">{sectionTitle}</h2>
            <form action={createOrganization} className="flex flex-row w-auto">
              <div className="flex flex-col w-full py-1 px-1">
                <input
                  readOnly
                  hidden
                  name="resume_id"
                  id="resume_id"
                  value={resume?.id}
                />
                <input
                  readOnly
                  hidden
                  name="user_id"
                  id="user_id"
                  value={user?.id}
                />
                <div className="rounded border border-black w-full px-2">
                  <div className="flex flex-row w-auto">
                    <div className="flex flex-col w-full py-1 px-1">
                      <label className="py-1" htmlFor="organization_name">
                        Name
                      </label>
                      <input
                        required
                        id="organization_name"
                        name="organization_name"
                        className="rounded bg-slate-200"
                        defaultValue={""}
                        onChange={(e) => {}}
                        placeholder="Title, Activity, name, etc.."
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-auto">
                    <div className="flex flex-col w-full py-1 px-1">
                      <label className="py-1" htmlFor="organization_location">
                        Location
                      </label>
                      <input
                        id="organization_location"
                        name="organization_location"
                        className="rounded bg-slate-200"
                        defaultValue={""}
                        onChange={(e) => {}}
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-auto">
                    <div className="flex flex-col w-full py-1 px-1">
                      <label className="py-1" htmlFor="organization_start">
                        Start Date
                      </label>
                      <input
                        id="organization_start"
                        name="organization_start"
                        defaultValue={""}
                        onChange={(e) => {}}
                        className="rounded bg-slate-200"
                        placeholder="Start Date"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-auto">
                    <div className="flex flex-col w-full py-1 px-1">
                      <label className="py-1" htmlFor="organization_end">
                        End Date
                      </label>
                      <input
                        id="organization_end"
                        name="organization_end"
                        defaultValue={""}
                        onChange={(e) => {}}
                        className="rounded bg-slate-200"
                        placeholder="End Date"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-auto pb-3">
                    <div className="flex flex-col w-full pt-1  px-1">
                      <label
                        className="py-1"
                        htmlFor="organization_description"
                      >
                        Description
                      </label>
                      <textarea
                        id="organization_description"
                        name="organization_description"
                        defaultValue={""}
                        onChange={(e) => {}}
                        className="rounded bg-slate-200"
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full pt-4 pb-2 px-1">
                  <SubmitButton className="btn btn-amber animate-pulse">
                    Add New Entry
                  </SubmitButton>
                </div>
              </div>
            </form>
            <ul>
              {userOrganizations?.map((organization: UserOrganization) => (
                <li className="border my-2 p-1 rounded" key={organization?.id}>
                  <form action={createResumeLine}>
                    <input
                      hidden
                      readOnly
                      name="resume_id"
                      value={resume?.id}
                    />
                    <input hidden readOnly name="user_id" value={user?.id} />
                    <input
                      hidden
                      readOnly
                      name="line_type"
                      value={"custom-section-one"}
                    />
                    <input hidden readOnly name="id" value={organization?.id} />
                    <div className="flex flex-row justify-between ">
                      <div className="flex flex-col w-3/4">
                        <h2 className="font-bold">{organization?.name}</h2>
                        <h2>{organization?.location}</h2>
                      </div>
                      <div className="flex flex-col w-1/4 m-auto">
                        <SubmitButton className={""}>Add</SubmitButton>
                      </div>
                    </div>
                  </form>
                </li>
              ))}
            </ul>
            <ul>
              {organizationResumeLines[0] &&
                organizationResumeLines?.map(
                  (organization: UserOrganization) => (
                    <li className="mt-6" key={organization?.id}>
                      <form action={deleteResumeLine}>
                        <input
                          hidden
                          readOnly
                          name="resume_id"
                          value={resume?.id}
                        />
                        <input
                          hidden
                          readOnly
                          name="user_id"
                          value={user?.id}
                        />
                        <input
                          hidden
                          readOnly
                          name="line_type"
                          value={"custom-section-one"}
                        />
                        <input
                          hidden
                          readOnly
                          name="id"
                          value={organization?.id}
                        />
                        <div className="flex flex-row justify-between ">
                          <div className="flex flex-col w-3/4">
                            <h2 className="font-bold">{organization?.name}</h2>
                            <h2>{organization?.location}</h2>
                          </div>
                          <div className="flex flex-col w-1/4 m-auto">
                            <SubmitButton className={""}>Remove</SubmitButton>
                          </div>
                        </div>
                      </form>
                      <form
                        onSubmit={() => setEdited(false)}
                        action={updateUserOrganization}
                      >
                        <input
                          readOnly
                          hidden
                          name="user_id"
                          id="user_id"
                          value={user?.id}
                        />
                        <input
                          readOnly
                          hidden
                          name="organization_id"
                          id="organization_id"
                          value={organization?.id}
                        />
                        <input
                          readOnly
                          hidden
                          name="resume_id"
                          id="resume_id"
                          value={resume?.id}
                        />
                        <div className="rounded border border-black w-full px-2 ">
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label
                                className="py-1"
                                htmlFor="organization_name"
                              >
                                Name
                              </label>
                              <input
                                required
                                id="organization_name"
                                name="organization_name"
                                className="rounded bg-slate-200"
                                defaultValue={organization?.name}
                                onChange={onChangeHandler}
                                placeholder={"Title, Activity, name, etc.."}
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label
                                className="py-1"
                                htmlFor="organization_location"
                              >
                                Location
                              </label>
                              <input
                                id="organization_location"
                                name="organization_location"
                                className="rounded bg-slate-200"
                                defaultValue={organization?.location}
                                onChange={onChangeHandler}
                                placeholder="Location"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label
                                className="py-1"
                                htmlFor="organization_start"
                              >
                                Start Date
                              </label>
                              <input
                                id="organization_start"
                                name="organization_start"
                                defaultValue={organization?.start_date}
                                onChange={onChangeHandler}
                                className="rounded bg-slate-200"
                                placeholder="Start Date"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label
                                className="py-1"
                                htmlFor="organization_end"
                              >
                                End Date
                              </label>
                              <input
                                id="organization_end"
                                name="organization_end"
                                defaultValue={organization?.end_date}
                                onChange={onChangeHandler}
                                className="rounded bg-slate-200"
                                placeholder="End Date"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto pb-3">
                            <div className="flex flex-col w-full pt-1  px-1">
                              <label
                                className="py-1"
                                htmlFor="organization_description"
                              >
                                Description
                              </label>
                              <textarea
                                id="organization_description"
                                name="organization_description"
                                defaultValue={organization?.description}
                                onChange={onChangeHandler}
                                className="rounded bg-slate-200"
                                placeholder="Description"
                              />
                            </div>
                          </div>
                        </div>
                        {edited && (
                          <>
                            <SubmitButton className="btn btn-amber my-4 animate-pulse">
                              Save Change
                            </SubmitButton>
                          </>
                        )}
                      </form>
                    </li>
                  )
                )}
            </ul>
          </>
        ) : (
          ""
        )}
        <form
          action={updateOrganizationSection}
          onSubmit={() => setEditSection(false)}
        >
          <div className="flex flex-row py-2">
            <div className="px-1 flex align-middle">
              <input
                hidden
                readOnly
                id="user_id"
                name="user_id"
                value={user?.id}
              />
              <input
                hidden
                readOnly
                id="resume_id"
                name="resume_id"
                value={resume?.id}
              />
              <label htmlFor="show_custom_section_one" hidden />
              <input
                hidden
                readOnly
                name="show_custom_section_one"
                id="show_custom_section_one"
                type="text"
                value={showCustomSectionOne}
              />
              <input
                className="m-auto bg-slate-200 rounded"
                type="checkbox"
                checked={showCustomSectionOne === "true" ? true : false}
                value={showCustomSectionOne}
                onChange={showOrganizationsOnChangeHandler}
              />
            </div>
            <div className="flex flex-col">
              <p>Show {sectionTitle} section?</p>
            </div>
          </div>
          {editSection && (
            <>
              <div style={{ height: "0.5rem" }} />
              <SubmitButton className="my-4 btn btn-amber animate-pulse">
                Save Change
              </SubmitButton>
            </>
          )}
        </form>
      </div>
      <div className="py-2" />
    </div>
  );
}

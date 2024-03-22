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

export default function YourOrganizations({
  userOrganizations,
  resume,
  user,
  showCustomSectionOne,
  setShowCustomSectionOne,
  organizationResumeLines,
}: {
  userOrganizations: any;
  resume: any;
  user: any;
  showCustomSectionOne: any;
  setShowCustomSectionOne: (e: any) => void;
  organizationResumeLines: any;
}) {
  // console.log(user.id);

  const [sectionTitle, setSectionTitle] = useState(
    resume?.custom_section_one_name
  );

  const [edited, setEdited] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [editSectionTitle, setEditSectionTitle] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  const setSectionTitleOnChangeHandler = (e: any) => {
    console.log(e);

    setSectionTitle(e);

    if (edited === false) {
      setEditSectionTitle(true);
    }
  };

  const showOrganizationsOnChangeHandler = (e: any) => {
    console.log(e.target.checked);
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
          <div className="flex flex-col ">
            {/* <div className="flex flex-row m-auto">
              <div className="flex flex-col px-4">Move Up</div>
              <div className="flex flex-col">Move Down</div>
            </div> */}
          </div>
        </div>
        {showCustomSectionOne === "true" ? (
          <>
            <form
              onSubmit={() => setEditSectionTitle(false)}
              action={updateOrganizationSectionTitle}
              className="pb-2"
            >
              <div className="flex flex-col">
                <label hidden htmlFor="resume_id" />
                <input
                  readOnly
                  hidden
                  name="resume_id"
                  id="resume_id"
                  value={resume.id}
                />
                <label hidden htmlFor="user_id" />
                <input
                  readOnly
                  hidden
                  name="user_id"
                  id="user_id"
                  value={user.id}
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
                  onChange={(e) =>
                    setSectionTitleOnChangeHandler(e.target.value)
                  }
                  placeholder="Section Title"
                ></input>
              </div>
              {editSectionTitle && (
                <>
                  <div style={{ height: "0.5rem" }} />
                  <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
                    Save Change
                  </SubmitButton>
                </>
              )}
            </form>
            <h2 className="py-1">{sectionTitle}</h2>
            <form action={createOrganization} className="flex flex-row w-auto">
              <div className="flex flex-col w-full py-1 px-1">
                <label hidden htmlFor="resume_id" />
                <input
                  readOnly
                  hidden
                  name="resume_id"
                  id="resume_id"
                  value={resume.id}
                />
                <label hidden htmlFor="user_id" />
                <input
                  readOnly
                  hidden
                  name="user_id"
                  id="user_id"
                  value={user.id}
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
                      ></input>
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
                      ></input>
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
                      ></input>
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
                      ></input>
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
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full pt-4 pb-2 px-1">
                  <button
                    type="submit"
                    className="rounded bg-amber-300 h-10 border border-black"
                  >
                    Add New Entry
                  </button>
                </div>
              </div>
            </form>
            <ul>
              {userOrganizations.map((organization: any) => (
                <li className="border my-2 p-1 rounded" key={organization.id}>
                  <form action={createResumeLine}>
                    <input hidden readOnly name="resume_id" value={resume.id} />
                    <input hidden readOnly name="user_id" value={user.id} />
                    <input
                      hidden
                      readOnly
                      name="line_type"
                      value={"custom-section-one"}
                    />
                    <input hidden readOnly name="id" value={organization.id} />
                    <div className="flex flex-row justify-between ">
                      <div className="flex flex-col w-3/4">
                        <h2 className="font-bold">{organization.name}</h2>
                        <h2>{organization.location}</h2>
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
                organizationResumeLines.map((organization: any) => (
                  <li className="mt-6" key={organization.id}>
                    <form action={deleteResumeLine}>
                      <input
                        hidden
                        readOnly
                        name="resume_id"
                        value={resume.id}
                      />
                      <input hidden readOnly name="user_id" value={user.id} />
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
                        value={organization.id}
                      />
                      <div className="flex flex-row justify-between ">
                        <div className="flex flex-col w-3/4">
                          <h2 className="font-bold">{organization.name}</h2>
                          <h2>{organization.location}</h2>
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
                      <label hidden htmlFor="user_id" />
                      <input
                        readOnly
                        hidden
                        name="user_id"
                        id="user_id"
                        value={user.id}
                      />
                      <label hidden htmlFor="organization_id" />
                      <input
                        readOnly
                        hidden
                        name="organization_id"
                        id="organization_id"
                        value={organization.id}
                      />
                      <label hidden htmlFor="resume_id" />
                      <input
                        readOnly
                        hidden
                        name="resume_id"
                        id="resume_id"
                        value={resume.id}
                      />
                      {/* <h2 className="font-bold">{organization.name}</h2> */}
                      <div className="rounded border border-black w-full px-2 ">
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
                              defaultValue={organization.name}
                              onChange={(e) => onChangeHandler(e)}
                              placeholder="Title, Activity, name, etc.."
                            ></input>
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
                              defaultValue={organization.location}
                              onChange={(e) => onChangeHandler(e)}
                              placeholder="Location"
                            ></input>
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
                              defaultValue={organization.start_date}
                              onChange={(e) => onChangeHandler(e)}
                              className="rounded bg-slate-200"
                              placeholder="Start Date"
                            ></input>
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
                              defaultValue={organization.end_date}
                              onChange={(e) => onChangeHandler(e)}
                              className="rounded bg-slate-200"
                              placeholder="End Date"
                            ></input>
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
                              defaultValue={organization.description}
                              onChange={(e) => onChangeHandler(e)}
                              className="rounded bg-slate-200"
                              placeholder="Description"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      {edited && (
                        <>
                          <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
                            Save Change
                          </SubmitButton>
                        </>
                      )}
                    </form>
                  </li>
                ))}
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
              <label hidden htmlFor="user_id" />
              <input
                hidden
                readOnly
                id="user_id"
                name="user_id"
                value={user.id}
                onChange={() => {}}
              />
              <label hidden htmlFor="resume_id" />
              <input
                hidden
                readOnly
                id="resume_id"
                name="resume_id"
                value={resume.id}
                onChange={() => {}}
              />
              <label htmlFor="show_custom_section_one" hidden />
              <input
                hidden
                readOnly
                name="show_custom_section_one"
                id="show_custom_section_one"
                type="text"
                value={showCustomSectionOne}
                onChange={() => {}}
              />
              <input
                className="m-auto bg-slate-200 rounded"
                type="checkbox"
                checked={showCustomSectionOne === "true" ? true : false}
                value={showCustomSectionOne}
                onChange={showOrganizationsOnChangeHandler}
              ></input>
            </div>
            <div className="flex flex-col">
              <p>Show {sectionTitle} section?</p>
            </div>
          </div>
          {editSection && (
            <>
              <div style={{ height: "0.5rem" }} />
              <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
                Save Change
              </SubmitButton>
            </>
          )}
        </form>
      </div>
      <div className="py-2"></div>
    </div>
  );
}

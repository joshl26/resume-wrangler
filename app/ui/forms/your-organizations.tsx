import {
  createOrganization,
  deleteOrganization,
  updateOrganizationSection,
} from "@/app/lib/actions";
import { use, useState } from "react";
import { SubmitButton } from "../submit-button";

export default function YourOrganizations({
  userOrganizations,
  resume,
  user,
  showCustomSectionOne,
  setShowCustomSectionOne,
}: {
  userOrganizations: any;
  resume: any;
  user: any;
  showCustomSectionOne: any;
  setShowCustomSectionOne: (e: any) => void;
}) {
  // console.log(user.id);

  const [sectionTitle, setSectionTitle] = useState(
    resume?.custom_section_one_name
  );

  const [edited, setEdited] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  const setSectionTitleOnChangeHandler = (e: any) => {
    console.log(e);
    if (e.target.checked === true) {
      setShowCustomSectionOne("true");
    } else {
      setShowCustomSectionOne("false");
    }

    setSectionTitle(e);

    if (edited === false) {
      setEdited(true);
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
      setEdited(true);
    }
  };

  return (
    <div className="rounded border border-black w-full px-2">
      <div className="your-organizations">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="py-2 font-bold text-xl">
              <h2>{sectionTitle}</h2>
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-row m-auto">
              <div className="flex flex-col px-4">Move Up</div>
              <div className="flex flex-col">Move Down</div>
            </div>
          </div>
        </div>
        {showCustomSectionOne === "true" ? (
          <>
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
                  // onChange={(e) => setSectionTitleOnChangeHandler(e.target.value)}
                  placeholder="Section Title"
                ></input>
                <h2 className="py-1">{sectionTitle}</h2>
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
                <li key={organization.id}>
                  <form action={deleteOrganization}>
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
                    <h2 className="font-bold">{organization.name}</h2>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <p>{organization.location}</p>
                        <p>
                          {organization.start_date} - {organization.end_date}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <button type="submit" className="font-bold">
                          Delete
                        </button>
                      </div>
                    </div>
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
          onSubmit={() => setEdited(false)}
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
          {edited && (
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

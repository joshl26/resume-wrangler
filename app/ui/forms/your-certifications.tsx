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
  showCustomSectionTwo: string;
  setShowCustomSectionTwo: (e: string) => void;
  certificationResumeLines: any;
}) {
  const [sectionTitle, setSectionTitle] = useState(
    resume?.custom_section_two_name
  );

  const [edited, setEdited] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [editSectionTitle, setEditSectionTitle] = useState(false);
  const [addCertification, setAddCertification] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  const newCertificationOnChangeHandler = () => {
    if (addCertification === false) {
      setAddCertification(true);
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

  const showCertificationsOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked === true) {
      setShowCustomSectionTwo("true");
    } else {
      setShowCustomSectionTwo("false");
    }

    if (edited === false) {
      setEditSection(true);
    }
  };

  return (
    <div className="w-full">
      <div className=" font-bold text-xl py-1">
        <h2 className="">Your {sectionTitle}</h2>
      </div>
      <div className="your-certifications rounded tight-shadow form-amber px-4 py-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col"></div>
          <div className="flex flex-col "></div>
        </div>
        {showCustomSectionTwo === "true" ? (
          <>
            <form
              onSubmit={() => setEditSectionTitle(false)}
              action={updateCertificationSectionTitle}
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
                <input
                  readOnly
                  hidden
                  name="user_id"
                  id="user_id"
                  value={user?.id}
                />
                <label className="py-1 font-medium" htmlFor="section_title">
                  Section Title
                </label>
                <input
                  required
                  type="text"
                  maxLength={14}
                  id="section_title"
                  name="section_title"
                  className="rounded"
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
            <form
              onSubmit={() => setAddCertification(false)}
              action={createCertification}
              className="flex flex-row w-auto"
            >
              <div className="flex flex-col w-full py-1 px-1">
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
                <label hidden className="py-1" htmlFor="section_title">
                  Section Title
                </label>
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
                ></input>
                <h2 className="py-1 font-medium">Add New {sectionTitle}</h2>
                <div className="rounded tight-shadow bg-gray-50 w-full px-2">
                  <div className="flex flex-row w-auto">
                    <div className="flex flex-col w-full py-1 px-1">
                      <label
                        className="py-1 font-medium"
                        htmlFor="certification_name"
                      >
                        Name
                      </label>
                      <input
                        required
                        id="certification_name"
                        name="certification_name"
                        className="rounded"
                        defaultValue={""}
                        onChange={(e) => {}}
                        placeholder="Title, Activity, name, etc.."
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-auto">
                    <div className="flex flex-col w-full py-1 pb-3 px-1">
                      <label
                        className="py-1 font-medium"
                        htmlFor="certification_location"
                      >
                        Location
                      </label>
                      <input
                        id="certification_location"
                        name="certification_location"
                        className="rounded"
                        defaultValue={""}
                        onChange={newCertificationOnChangeHandler}
                        placeholder="Location"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full pt-4 pb-2 px-1">
                  {addCertification && (
                    <>
                      <SubmitButton className="btn btn-amber animate-pulse">
                        Add New Entry
                      </SubmitButton>
                    </>
                  )}
                </div>
              </div>
            </form>
            <h2 className="font-medium py-1">Your Certifications</h2>
            <ul className="overflow-y-auto h-[150px] tight-shadow rounded bg-white">
              {userCertifications[0] &&
                userCertifications?.map((certification: UserCertification) => (
                  <li className="p-2 border" key={certification?.id}>
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
                        value={"custom-section-two"}
                      />
                      <input
                        hidden
                        readOnly
                        name="id"
                        value={certification?.id}
                      />
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col w-3/4">
                          <h2 className="font-bold">{certification?.name}</h2>
                          <h2>{certification?.location}</h2>
                        </div>
                        <div className="flex flex-col m-auto">
                          <SubmitButton
                            className={"hover:text-azure-radiance-500"}
                          >
                            Add
                          </SubmitButton>
                        </div>
                      </div>
                    </form>
                  </li>
                ))}
            </ul>
            <h2 className="font-medium pt-4">Selected Certifications</h2>
            <ul className="overflow-y-auto h-[200px] tight-shadow bg-white">
              {certificationResumeLines[0] &&
                certificationResumeLines?.map((certification: any) => (
                  <li className="border bg-white p-2" key={certification?.id}>
                    <div className="flex flex-row justify-between">
                      <h2 className="font-bold">{certification?.name}</h2>
                      <form action={deleteResumeLine}>
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
                          value={"custom-section-two"}
                        />
                        <input
                          readOnly
                          hidden
                          name="id"
                          id="id"
                          value={certification?.id}
                        />
                        <input
                          readOnly
                          hidden
                          name="resume_id"
                          id="resume_id"
                          value={resume?.id}
                        />
                        <div className="flex flex-col">
                          <SubmitButton className="hover:text-rose-500">
                            Remove
                          </SubmitButton>
                        </div>
                      </form>
                    </div>
                    <form
                      className="pb-4"
                      onSubmit={() => setEdited(false)}
                      action={updateUserCertfication}
                    >
                      <div className="flex flex-col">
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
                          name="certification_id"
                          id="certification_id"
                          value={certification?.id}
                        />
                        <input
                          readOnly
                          hidden
                          name="resume_id"
                          id="resume_id"
                          value={resume?.id}
                        />
                        <label className="py-1" htmlFor="certification_name">
                          Name
                        </label>
                        <input
                          required
                          id="certification_name"
                          name="certification_name"
                          className="rounded"
                          defaultValue={certification?.name}
                          onChange={onChangeHandler}
                          placeholder="Title, Activity, name, etc.."
                        />
                        <label className="py-1" htmlFor="location_name">
                          Location
                        </label>
                        <input
                          required
                          id="location_name"
                          name="location_name"
                          className="rounded"
                          defaultValue={certification?.location}
                          onChange={onChangeHandler}
                          placeholder="Title, Activity, name, etc.."
                        />
                      </div>
                      {edited && (
                        <div>
                          <div style={{ height: "0.5rem" }} />
                          <SubmitButton className="btn btn-amber my-4 animate-pulse">
                            Save Change
                          </SubmitButton>
                        </div>
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
          onSubmit={() => setEditSection(false)}
          action={updateCertificationsSection}
        >
          <input hidden readOnly id="user_id" name="user_id" value={user?.id} />
          <input
            hidden
            readOnly
            id="resume_id"
            name="resume_id"
            value={resume?.id}
          />
          <input
            hidden
            readOnly
            name="show_custom_section_two"
            id="show_custom_section_two"
            type="text"
            value={showCustomSectionTwo}
          />
          <div className="flex flex-row ">
            <div className="px-2 flex align-middle">
              <input
                className="m-auto rounded"
                type="checkbox"
                checked={showCustomSectionTwo === "true" ? true : false}
                value={showCustomSectionTwo}
                onChange={showCertificationsOnChangeHandler}
                name="show_custom_section_two_input"
              />
            </div>
            <div className="flex flex-col py-2">
              <p className="font-medium">Show {sectionTitle} section?</p>
            </div>
          </div>
          {editSection && (
            <>
              <div style={{ height: "0.5rem" }} />
              <SubmitButton className="btn btn-amber my-4 animate-pulse">
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

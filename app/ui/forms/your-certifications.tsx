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
import { Resume, User, UserCertifications } from "@/app/lib/definitions";

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

  const showCertificationsOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // console.log(e.target.checked);
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
    <div className=" w-full px-2">
      <div className=" font-bold text-xl">
        <h2>Your {sectionTitle}</h2>
      </div>
      <div className="your-certifications rounded border p-2">
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
                  onChange={setSectionTitleOnChangeHandler}
                  placeholder="Section Title"
                ></input>
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
            <form action={createCertification} className="flex flex-row w-auto">
              <div className="flex flex-col w-full py-1 px-1">
                <label hidden htmlFor="resume_id" />
                <input
                  readOnly
                  hidden
                  name="resume_id"
                  id="resume_id"
                  defaultValue={resume.id}
                />

                <label hidden htmlFor="user_id" />
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
                  className="rounded bg-slate-200"
                  defaultValue={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  placeholder="Section Title"
                ></input>
                <h2 className="py-1">{sectionTitle}</h2>
                <div className="rounded border border-black w-full px-2">
                  <div className="flex flex-row w-auto">
                    <div className="flex flex-col w-full py-1 px-1">
                      <label className="py-1" htmlFor="certification_name">
                        Name
                      </label>
                      <input
                        required
                        id="certification_name"
                        name="certification_name"
                        className="rounded bg-slate-200"
                        defaultValue={""}
                        onChange={(e) => {}}
                        placeholder="Title, Activity, name, etc.."
                      ></input>
                    </div>
                  </div>
                  <div className="flex flex-row w-auto">
                    <div className="flex flex-col w-full py-1 pb-3 px-1">
                      <label className="py-1" htmlFor="certification_location">
                        Location
                      </label>
                      <input
                        id="certification_location"
                        name="certification_location"
                        className="rounded bg-slate-200"
                        defaultValue={""}
                        onChange={(e) => {}}
                        placeholder="Location"
                      ></input>
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
              {userCertifications[0] &&
                userCertifications.map((certification: any) => (
                  <li className="p-1 border my-3" key={certification.id}>
                    <form action={createResumeLine}>
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
                        value={"custom-section-two"}
                      />
                      <input
                        hidden
                        readOnly
                        name="id"
                        value={certification.id}
                      />
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                          <h2 className="font-bold">{certification.name}</h2>
                          <h2>{certification.location}</h2>
                        </div>
                        <div className="flex flex-col">
                          <SubmitButton className={""}>Add</SubmitButton>
                        </div>
                      </div>
                    </form>
                  </li>
                ))}
            </ul>
            <ul>
              {certificationResumeLines[0] &&
                certificationResumeLines?.map((certification: any) => (
                  <li className="pt-2" key={certification?.id}>
                    <div className="flex flex-row justify-between">
                      <h2 className="font-bold">{certification?.name}</h2>
                      <form action={deleteResumeLine}>
                        <input hidden readOnly name="user_id" value={user.id} />
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
                          value={resume.id}
                        />
                        <div className="flex flex-col">
                          <SubmitButton className="font-bold">
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
                        <label hidden htmlFor="user_id" />
                        <input
                          readOnly
                          hidden
                          name="user_id"
                          id="user_id"
                          value={user?.id}
                        />
                        <label hidden htmlFor="certification_id" />
                        <input
                          readOnly
                          hidden
                          name="certification_id"
                          id="certification_id"
                          value={certification?.id}
                        />
                        <label hidden htmlFor="resume_id" />
                        <input
                          readOnly
                          hidden
                          name="resume_id"
                          id="resume_id"
                          value={resume.id}
                        />
                        <label className="py-1" htmlFor="certification_name">
                          Name
                        </label>
                        <input
                          required
                          id="certification_name"
                          name="certification_name"
                          className="rounded bg-slate-200"
                          defaultValue={certification?.name}
                          onChange={onChangeHandler}
                          placeholder="Title, Activity, name, etc.."
                        ></input>
                        <label className="py-1" htmlFor="location_name">
                          Location
                        </label>
                        <input
                          required
                          id="location_name"
                          name="location_name"
                          className="rounded bg-slate-200"
                          defaultValue={certification?.location}
                          onChange={onChangeHandler}
                          placeholder="Title, Activity, name, etc.."
                        ></input>
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
          <label htmlFor="show_custom_section_two" hidden />
          <input
            hidden
            readOnly
            name="show_custom_section_two"
            id="show_custom_section_two"
            type="text"
            value={showCustomSectionTwo}
            onChange={() => {}}
          />
          <div className="flex flex-row ">
            <div className="px-2 flex align-middle">
              <input
                className="m-auto bg-slate-200 rounded"
                type="checkbox"
                checked={showCustomSectionTwo === "true" ? true : false}
                value={showCustomSectionTwo}
                onChange={showCertificationsOnChangeHandler}
              ></input>
            </div>
            <div className="flex flex-col py-2">
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

import {
  createCertification,
  deleteCertification,
  updateCertificationSectionTitle,
  updateCertificationsSection,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";

export default function YourCertifications({
  userCertifications,
  resume,
  user,
  showCustomSectionTwo,
  setShowCustomSectionTwo,
}: {
  userCertifications: any;
  resume: any;
  user: any;
  showCustomSectionTwo: any;
  setShowCustomSectionTwo: (e: any) => void;
}) {
  // console.log(user.id);

  const [sectionTitle, setSectionTitle] = useState(
    resume?.custom_section_two_name
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

  const showCertificationsOnChangeHandler = (e: any) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      setShowCustomSectionTwo("true");
    } else {
      setShowCustomSectionTwo("false");
    }

    if (edited === false) {
      setEditSection(true);
    }
  };

  // const showCertificationsOnChangeHandler = (e: any) => {
  //   console.log(e.target.checked);
  //   if (e.target.checked === true) {
  //     setShowCustomSectionTwo("true");
  //   } else {
  //     setShowCustomSectionTwo("false");
  //   }

  //   if (edited === false) {
  //     setEdited(true);
  //   }
  // };

  return (
    <div className="rounded border border-black w-full px-2">
      <div className="your-certifications">
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
              {userCertifications?.map((certification: any) => (
                <li key={certification?.id}>
                  <form action={deleteCertification}>
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
                    <h2 className="font-bold">{certification?.name}</h2>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <p>{certification?.location}</p>
                        <p>
                          {certification?.start_date} -{" "}
                          {certification?.end_date}
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
          onSubmit={() => setEdited(false)}
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
          <div className="flex flex-row py-2">
            <div className="px-1 flex align-middle">
              <input
                className="m-auto bg-slate-200 rounded"
                type="checkbox"
                checked={showCustomSectionTwo === "true" ? true : false}
                value={showCustomSectionTwo}
                onChange={showCertificationsOnChangeHandler}
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

import {
  createResumeLine,
  createUserEducation,
  deleteEducation,
  deleteResumeLine,
  updateEducationSection,
  updateResumeLine,
  updateUserEducation,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";

export default function YourEducation({
  userEducation,
  user,
  resume,
  showEducation,
  setShowEducation,
  educationResumeLines,
}: {
  userEducation: any;
  user: any;
  resume: any;
  showEducation: any;
  setShowEducation: (e: any) => void;
  educationResumeLines: any;
}) {
  console.log(educationResumeLines);

  const [edited, setEdited] = useState(false);
  const [sectionEdited, setSectionEdited] = useState(false);

  const showEducationOnChangeHandler = (e: any) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      setShowEducation("true");
    } else {
      setShowEducation("false");
    }

    if (sectionEdited === false) {
      setSectionEdited(true);
    }
  };

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  const buttonClickHandler = (e: any) => {
    console.log(e);
  };

  return (
    <div>
      <div className="your-education">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="py-2 font-bold text-xl">
              <h2>Education</h2>
            </div>
          </div>
          <div className="flex flex-col ">
            {/* <div className="flex flex-row m-auto">
              <div className="flex flex-col px-4">Move Up</div>
              <div className="flex flex-col">Move Down</div>
            </div> */}
          </div>
        </div>
        <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
          {showEducation === "true" ? (
            <>
              {/* <div className="flex flex-row w-auto">
                <div className="flex flex-col w-full py-1 px-1">
                  <label className="py-1" htmlFor="school-name">
                    Education
                  </label>
                  <form
                    action={createUserEducation}
                    className="rounded border border-black w-full px-2"
                  >
                    <div className="flex flex-row w-auto">
                      <div className="flex flex-col w-full py-1 px-1">
                        <label htmlFor="resume_id" hidden />
                        <input
                          hidden
                          defaultValue={resume?.id}
                          name="resume_id"
                          id="resume_id"
                        />
                        <label htmlFor="user_id" hidden />
                        <input
                          hidden
                          defaultValue={user.id}
                          name="user_id"
                          id="user_id"
                        />
                        <label className="py-1" htmlFor="institution_name">
                          Institution Name
                        </label>
                        <input
                          id="institution_name"
                          name="institution_name"
                          className="rounded bg-slate-200"
                          onChange={(e) => {}}
                          placeholder="Institution Name"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-row w-auto">
                      <div className="flex flex-col w-full py-1 px-1">
                        <label className="py-1" htmlFor="location">
                          Location
                        </label>
                        <input
                          id="location"
                          name="location"
                          className="rounded bg-slate-200"
                          onChange={(e) => {}}
                          placeholder="Location"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-row w-auto">
                      <div className="flex flex-col w-1/3 py-1 px-1">
                        <label className="py-1" htmlFor="start_date">
                          Start Date
                        </label>
                        <input
                          id="start_date"
                          name="start_date"
                          className="rounded bg-slate-200"
                          onChange={(e) => {}}
                          placeholder="Start Date"
                        ></input>
                      </div>
                      <div className="flex flex-col w-1/3 py-1 px-1">
                        <label className="py-1" htmlFor="end_date">
                          End Date
                        </label>
                        <input
                          id="end_date"
                          name="end_date"
                          className="rounded bg-slate-200"
                          onChange={(e) => {}}
                          placeholder="End Date"
                        ></input>
                      </div>
                      <div className="flex flex-col w-1/3 py-1 px-1">
                        <label className="py-1" htmlFor="grade">
                          GPA/AVG
                        </label>
                        <input
                          id="grade"
                          name="grade"
                          className="rounded bg-slate-200"
                          onChange={(e) => {}}
                          placeholder="GPA/AVG"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-row w-auto">
                      <div className="flex flex-col w-full py-1 px-1">
                        <label className="py-1" htmlFor="program">
                          Program
                        </label>
                        <input
                          id="program"
                          name="program"
                          className="rounded bg-slate-200"
                          onChange={(e) => {}}
                          placeholder="Degree"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-row w-auto">
                      <div className="flex flex-col w-full py-1 px-1">
                        <label className="py-1" htmlFor="url">
                          Web Link
                        </label>
                        <input
                          id="url"
                          name="url"
                          className="rounded bg-slate-200"
                          onChange={(e) => {}}
                          placeholder="Web link"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-row w-auto pt-2 pb-2">
                      <div className="flex flex-col w-full py-1 px-1">
                        <button
                          type="submit"
                          className="rounded bg-amber-300 h-10 border border-black"
                        >
                          Add School
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div> */}
              <div className="h-[100px] overflow-y-auto">
                <ul>
                  {userEducation.map((education: any) => (
                    <li key={education.id}>
                      <div className="flex flex-row pt-2 ">
                        <div className="flex flex-col w-3/4">
                          <h2 className="font-bold">
                            {education.institution_name}
                          </h2>
                          <p>{education.program}</p>
                        </div>
                        <div className="flex flex-col pt-3 pr-6">
                          <form action={createResumeLine}>
                            <input
                              hidden
                              readOnly
                              name="resume_id"
                              value={resume.id}
                            />
                            <input
                              hidden
                              readOnly
                              name="user_id"
                              value={user.id}
                            />
                            <input
                              hidden
                              readOnly
                              name="line_type"
                              value={"education"}
                            />
                            <input
                              hidden
                              readOnly
                              name="education_id"
                              value={education.id}
                            />
                            <SubmitButton className={""}>Add</SubmitButton>
                          </form>
                          <form action={deleteResumeLine}>
                            <input
                              hidden
                              readOnly
                              name="user_id"
                              value={user.id}
                            />
                            <input
                              hidden
                              readOnly
                              name="user_education_id"
                              value={education.id}
                            />
                            <input
                              hidden
                              readOnly
                              name="resume_id"
                              value={resume.id}
                            />
                            <SubmitButton className={""}>Remove</SubmitButton>
                          </form>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div>
                <ul>
                  {educationResumeLines?.map((education: any) => (
                    <li key={userEducation?.id}>
                      <h2>{education?.institution_name}</h2>
                    </li>
                  ))}
                </ul>
              </div> */}
              <div className="flex flex-col w-full py-2 px-1">
                <ul className="">
                  {educationResumeLines[0] ? (
                    educationResumeLines?.map((education: any) => (
                      <li
                        className="mt-3 p-2 py-3 rounded border border-black "
                        key={education?.id}
                      >
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col w-1/3">
                            <div className="flex flex-row justify-between">
                              <form action={updateResumeLine}>
                                <SubmitButton className={""}>Up</SubmitButton>
                              </form>
                              <form action={updateResumeLine}>
                                <SubmitButton className={""}>Down</SubmitButton>
                              </form>
                            </div>
                          </div>
                          <div className="flex flex-col"></div>
                          <div className="flex flex-col">
                            <form action={deleteResumeLine}>
                              <input
                                hidden
                                readOnly
                                name="user_id"
                                id="user_id"
                                value={user?.id}
                              />
                              <input
                                hidden
                                readOnly
                                name="resume_id"
                                id="resume_id"
                                value={resume?.id}
                              />
                              <input
                                hidden
                                name="user_education_id"
                                id="user_education_id"
                                value={education?.user_education_id}
                              />
                              <div className="flex flex-row justify-end">
                                <SubmitButton className={""}>
                                  Remove
                                </SubmitButton>
                              </div>
                            </form>
                          </div>
                        </div>
                        <form
                          onSubmit={() => setEdited(false)}
                          action={updateUserEducation}
                          className="rounded border border-black w-full pb-2 px-2"
                        >
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label htmlFor="resume_id" hidden />
                              <input
                                hidden
                                defaultValue={resume?.id}
                                name="resume_id"
                                id="resume_id"
                              />
                              <label htmlFor="education_id" hidden />
                              <input
                                hidden
                                defaultValue={education?.id}
                                name="education_id"
                                id="education_id"
                              />
                              <label
                                className="py-1"
                                htmlFor="institution_name"
                              >
                                Institution Name
                              </label>
                              <input
                                id="institution_name"
                                name="institution_name"
                                className="rounded bg-slate-200"
                                defaultValue={education?.institution_name}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="Institution Name"
                              ></input>
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label className="py-1" htmlFor="location">
                                Location
                              </label>
                              <input
                                id="location"
                                name="location"
                                className="rounded bg-slate-200"
                                defaultValue={education?.location}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="Location"
                              ></input>
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-1/3 py-1 px-1">
                              <label className="py-1" htmlFor="start_date">
                                Start Date
                              </label>
                              <input
                                id="start_date"
                                name="start_date"
                                className="rounded bg-slate-200"
                                defaultValue={education?.start_date}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="Start Date"
                              ></input>
                            </div>
                            <div className="flex flex-col w-1/3 py-1 px-1">
                              <label className="py-1" htmlFor="end_date">
                                End Date
                              </label>
                              <input
                                id="end_date"
                                name="end_date"
                                className="rounded bg-slate-200"
                                defaultValue={education?.end_date}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="End Date"
                              ></input>
                            </div>
                            <div className="flex flex-col w-1/3 py-1 px-1">
                              <label className="py-1" htmlFor="grade">
                                GPA/AVG
                              </label>
                              <input
                                id="grade"
                                name="grade"
                                className="rounded bg-slate-200"
                                defaultValue={education?.grade}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="GPA/AVG"
                              ></input>
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label className="py-1" htmlFor="program">
                                Program
                              </label>
                              <input
                                id="program"
                                name="program"
                                className="rounded bg-slate-200"
                                defaultValue={education?.program}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="Degree"
                              ></input>
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label className="py-1" htmlFor="url">
                                Web Link
                              </label>
                              <input
                                id="url"
                                name="url"
                                className="rounded bg-slate-200"
                                defaultValue={education?.url}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="Web link"
                              ></input>
                            </div>
                          </div>
                          {edited && (
                            <SubmitButton className={""}>
                              <div className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
                                Save Change
                              </div>
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
          ) : (
            ""
          )}
          <form
            onSubmit={() => setSectionEdited(false)}
            action={updateEducationSection}
          >
            <div className="flex flex-row py-1">
              <div className="flex flex-col px-1 py-2">
                <label hidden htmlFor="user_id" />
                <input
                  hidden
                  readOnly
                  id="user_id"
                  name="user_id"
                  value={user?.id}
                />
                <label hidden htmlFor="resume_id" />
                <input
                  hidden
                  readOnly
                  id="resume_id"
                  name="resume_id"
                  value={resume?.id}
                />
                <label hidden htmlFor="show_education_section" />
                <input
                  hidden
                  readOnly
                  id="show_education_section"
                  name="show_education_section"
                  value={showEducation}
                />
                <input
                  type="checkbox"
                  className="rounded bg-slate-200"
                  checked={showEducation === "true" ? true : false}
                  value={showEducation}
                  onChange={showEducationOnChangeHandler}
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="py-1 px-1" htmlFor="social_icons">
                  Show Education Section?
                </label>
              </div>
            </div>
            {sectionEdited && (
              <SubmitButton className={""}>
                <div className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
                  Save Change
                </div>
              </SubmitButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

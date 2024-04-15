import {
  createResumeLine,
  deleteResumeLine,
  updateEducationSection,
  updateUserEducation,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import {
  Resume,
  User,
  UserEducationExperience,
  UserEducationExperiences,
} from "@/app/lib/definitions";

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
  showEducation: any;
  setShowEducation: (e: string) => void;
  educationResumeLines: any;
}) {
  const [edited, setEdited] = useState(false);
  const [sectionEdited, setSectionEdited] = useState(false);

  const showEducationOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked === true) {
      setShowEducation("true");
    } else {
      setShowEducation("false");
    }

    if (sectionEdited === false) {
      setSectionEdited(true);
    }
  };

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div>
      <div className="your-education">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="py-2 font-bold text-xl">
              <h2 className="">Your Education</h2>
            </div>
          </div>
          <div className="flex flex-col "></div>
        </div>
        <div className="form-amber rounded p-4">
          {showEducation === "true" ? (
            <>
              <h2 className="font-medium">Choose Education Experiences</h2>
              <div className="h-[150px] overflow-y-auto tight-shadow mt-2 rounded bg-white">
                <ul className="">
                  {userEducation?.map((education: UserEducationExperience) => (
                    <li className="border" key={education?.id}>
                      <div className="flex flex-row p-2 justify-between">
                        <div className="flex flex-col w-3/4">
                          <h2 className="font-bold">
                            {education?.institution_name}
                          </h2>
                          <p>{education?.program}</p>
                        </div>
                        <div className="flex flex-col pt-3 pr-6 ">
                          <div className="flex flex-row m-auto">
                            <form action={createResumeLine}>
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
                                value={"education"}
                              />
                              <input
                                hidden
                                readOnly
                                name="id"
                                value={education?.id}
                              />
                              <SubmitButton
                                className={"hover:text-azure-radiance-500"}
                              >
                                Add
                              </SubmitButton>
                            </form>
                          </div>
                          {/* <form action={deleteResumeLine}>
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
                          </form> */}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col w-full py-2">
                <ul className="">
                  {educationResumeLines[0] ? (
                    educationResumeLines?.map((education: any) => (
                      <li className="mt-3 py-3" key={education?.id}>
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col w-1/3">
                            <div className="flex flex-row justify-between"></div>
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
                                readOnly
                                name="user_education_id"
                                id="user_education_id"
                                value={education?.user_education_id}
                              />
                              <div className="flex flex-row justify-end">
                                <SubmitButton className={"hover:text-rose-500"}>
                                  Remove
                                </SubmitButton>
                              </div>
                            </form>
                          </div>
                        </div>
                        <form
                          onSubmit={() => setEdited(false)}
                          action={updateUserEducation}
                          className="tight-shadow bg-slate-50 rounded w-full pb-2 px-2"
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
                                className="py-1 font-medium"
                                htmlFor="institution_name"
                              >
                                Institution Name
                              </label>
                              <input
                                id="institution_name"
                                name="institution_name"
                                className="rounded"
                                defaultValue={education?.institution_name}
                                onChange={onChangeHandler}
                                placeholder="Institution Name"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label
                                className="py-1 font-medium"
                                htmlFor="location"
                              >
                                Location
                              </label>
                              <input
                                id="location"
                                name="location"
                                className="rounded"
                                defaultValue={education?.location}
                                onChange={onChangeHandler}
                                placeholder="Location"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-1/3 py-1 px-1">
                              <label
                                className="py-1 font-medium"
                                htmlFor="start_date"
                              >
                                Start Date
                              </label>
                              <input
                                id="start_date"
                                name="start_date"
                                className="rounded"
                                defaultValue={education?.start_date}
                                onChange={onChangeHandler}
                                placeholder="Start Date"
                              />
                            </div>
                            <div className="flex flex-col w-1/3 py-1 px-1">
                              <label
                                className="py-1 font-medium"
                                htmlFor="end_date"
                              >
                                End Date
                              </label>
                              <input
                                id="end_date"
                                name="end_date"
                                className="rounded"
                                defaultValue={education?.end_date}
                                onChange={onChangeHandler}
                                placeholder="End Date"
                              />
                            </div>
                            <div className="flex flex-col w-1/3 py-1 px-1">
                              <label
                                className="py-1 font-medium"
                                htmlFor="grade"
                              >
                                GPA/AVG
                              </label>
                              <input
                                id="grade"
                                name="grade"
                                className="rounded"
                                defaultValue={education?.grade}
                                onChange={onChangeHandler}
                                placeholder="GPA/AVG"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label
                                className="py-1 font-medium"
                                htmlFor="program"
                              >
                                Program
                              </label>
                              <input
                                id="program"
                                name="program"
                                className="rounded"
                                defaultValue={education?.program}
                                onChange={onChangeHandler}
                                placeholder="Degree"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-auto">
                            <div className="flex flex-col w-full py-1 px-1">
                              <label className="py-1 font-medium" htmlFor="url">
                                Link (Web URL)
                              </label>
                              <input
                                id="url"
                                name="url"
                                className="rounded"
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
          ) : (
            ""
          )}
          <form
            onSubmit={() => setSectionEdited(false)}
            action={updateEducationSection}
          >
            <div className="flex flex-row py-1">
              <div className="flex flex-col px-1 py-2">
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
                  name="show_education_section_input"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="py-1 px-1 font-medium">
                  Show Education Section?
                </h2>
              </div>
            </div>
            {sectionEdited && (
              <SubmitButton className="btn btn-amber my-4 p-2 text-center w-auto animate-pulse">
                Save Change
              </SubmitButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

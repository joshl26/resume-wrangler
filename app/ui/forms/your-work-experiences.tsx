import {
  createResumeLine,
  deleteResumeLine,
  updateUserWorkExperience,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";

export default function YourWorkExperiences({
  userWorkExperiences,
  user,
  resume,
  workResumeLines,
}: {
  userWorkExperiences: any;
  user: any;
  resume: any;
  workResumeLines: any;
}) {
  // console.log(userWorkExperiences);

  const [edited, setEdited] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div>
      <div className="py-2 font-bold text-xl">
        <h2>Your Work Experience</h2>
      </div>
      <div className="your-work-experiences border rounded p-1">
        <h3 className="font-medium px-1 pb-1">Previous Experience</h3>
        <div className="h-[100px] rounded  overflow-y-auto border border-black mx-1 px-2">
          <ul className="">
            {userWorkExperiences.map((experience: any) => (
              <li key={experience.id}>
                <div className="flex flex-row pt-2 ">
                  <div className="flex flex-col w-3/4">
                    <h2 className="font-bold">{experience.company_name}</h2>
                    <p>{experience.location}</p>
                  </div>
                  <div className="flex flex-col pt-3 pr-6">
                    <form action={createResumeLine}>
                      <input
                        hidden
                        readOnly
                        name="resume_id"
                        value={resume.id}
                      />
                      <input hidden readOnly name="user_id" value={user.id} />
                      <input hidden readOnly name="line_type" value={"work"} />
                      <input hidden readOnly name="id" value={experience.id} />
                      <SubmitButton className={""}>Add</SubmitButton>
                    </form>
                    {/* <form action={deleteResumeLine}>
                      <input hidden readOnly name="user_id" value={user.id} />
                      <input hidden readOnly name="line_type" value={"work"} />
                      <input hidden readOnly name="id" value={experience.id} />
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

        <ul>
          {workResumeLines[0] &&
            workResumeLines?.map((workExperience: any) => (
              <li className="pt-3" key={workExperience?.id}>
                <div className="flex flex-row w-auto">
                  <label hidden htmlFor="resume_id" />
                  <input
                    readOnly
                    hidden
                    name="resume_id"
                    id="resume_id"
                    value={workExperience?.id}
                  />
                  <label hidden htmlFor="user_id" />
                  <input
                    readOnly
                    hidden
                    name="user_id"
                    id="user_id"
                    value={user?.id}
                  />
                  <div className="flex flex-col w-full py-1 px-1">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col w-1/4">
                        <div className="flex flex-row justify-between">
                          <form action={""}>
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
                            <SubmitButton className={""}>Up</SubmitButton>
                          </form>
                          <form action={""}>
                            <input
                              hidden
                              readOnly
                              name="user_id"
                              value={user?.id}
                            />
                            <input
                              hidden
                              readOnly
                              name="resume_id"
                              value={resume?.id}
                            />
                            <SubmitButton className={""}>Down</SubmitButton>
                          </form>
                        </div>
                      </div>
                      <div className="flex flex-col"> </div>

                      <form action={deleteResumeLine}>
                        <input
                          readOnly
                          hidden
                          name="line_type"
                          id="line_type"
                          value={"work"}
                        />
                        <input
                          readOnly
                          hidden
                          name="id"
                          id="id"
                          value={workExperience?.id}
                        />
                        <label hidden htmlFor="resume_id" />
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
                        <button type="submit">Remove</button>
                      </form>
                    </div>
                    <form
                      onSubmit={() => setEdited(false)}
                      action={updateUserWorkExperience}
                      className="rounded border border-black w-full pb-2 px-2"
                    >
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label hidden htmlFor="experience_id" />
                          <input
                            hidden
                            readOnly
                            id="experience_id"
                            name="experience_id"
                            value={workExperience?.id}
                          />
                          <label hidden htmlFor="resume_id" />
                          <input
                            hidden
                            readOnly
                            value={resume?.id}
                            id="resume_id"
                            name="resume_id"
                          />
                          <label className="py-1" htmlFor="company_name">
                            Company Name
                          </label>
                          <input
                            required
                            id="company_name"
                            name="company_name"
                            className="rounded bg-slate-200"
                            defaultValue={workExperience?.company_name}
                            onChange={(e) => onChangeHandler(e)}
                            placeholder="Company Name"
                          ></input>
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label className="py-1" htmlFor="job_title">
                            Job Title
                          </label>
                          <input
                            required
                            id="job_title"
                            name="job_title"
                            className="rounded bg-slate-200"
                            defaultValue={workExperience?.job_title}
                            onChange={(e) => onChangeHandler(e)}
                            placeholder="Job Title"
                          ></input>
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label className="py-1" htmlFor="location">
                            Loation
                          </label>
                          <input
                            id="location"
                            name="location"
                            className="rounded bg-slate-200"
                            defaultValue={workExperience?.location}
                            onChange={(e) => onChangeHandler(e)}
                            placeholder="Company Location"
                          ></input>
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-1/2 py-1 px-1">
                          <label className="py-1" htmlFor="start_date">
                            Start Date
                          </label>
                          <input
                            id="start_date"
                            name="start_date"
                            className="rounded bg-slate-200"
                            defaultValue={workExperience?.start_date}
                            onChange={(e) => onChangeHandler(e)}
                            placeholder="Start Date"
                          ></input>
                        </div>
                        <div className="flex flex-col w-1/2 py-1 px-1">
                          <label className="py-1" htmlFor="end_date">
                            End Date
                          </label>
                          <input
                            id="end_date"
                            name="end_date"
                            className="rounded bg-slate-200"
                            defaultValue={workExperience?.end_date}
                            onChange={(e) => onChangeHandler(e)}
                            placeholder="End Date"
                          ></input>
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label className="py-1" htmlFor="description">
                            Description One
                          </label>
                          <textarea
                            id="description_one"
                            name="description_one"
                            className="rounded bg-slate-200 h-[150px]"
                            defaultValue={workExperience?.description_one}
                            onChange={(e) => onChangeHandler(e)}
                            placeholder="Description One"
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label className="py-1" htmlFor="description_two">
                            Description Two
                          </label>
                          <textarea
                            id="description_two"
                            name="description_two"
                            className="rounded bg-slate-200 h-[150px]"
                            defaultValue={workExperience?.description_two}
                            onChange={(e) => onChangeHandler(e)}
                            placeholder="Description Two"
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label className="py-1" htmlFor="description_three">
                            Description Three
                          </label>
                          <textarea
                            id="description_three"
                            name="description_three"
                            className="rounded bg-slate-200 h-[150px]"
                            defaultValue={workExperience?.description_three}
                            onChange={(e) => onChangeHandler(e)}
                            placeholder="Description One"
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label className="py-1" htmlFor="description_four">
                            Description Four
                          </label>
                          <textarea
                            id="description_four"
                            name="description_four"
                            className="rounded bg-slate-200 h-[150px]"
                            defaultValue={workExperience?.description_four}
                            onChange={(e) => onChangeHandler(e)}
                            placeholder="Description Four"
                          ></textarea>
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
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

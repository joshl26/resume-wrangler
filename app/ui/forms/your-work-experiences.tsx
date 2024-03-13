import { createWorkExperience, deleteWorkExperience } from "@/app/lib/actions";
import { useState } from "react";

export default function YourWorkExperiences({
  userWorkExperiences,
  user,
  resume,
}: {
  userWorkExperiences: any;
  user: any;
  resume: any;
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
      <div className="your-work-experiences">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="py-2 font-bold text-xl">
              <h2>Experience</h2>
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-row m-auto">
              <div className="flex flex-col px-4">Move Up</div>
              <div className="flex flex-col">Move Down</div>
            </div>
          </div>
        </div>
        <form
          action={createWorkExperience}
          className="mb-1 drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 "
        >
          <div className="flex flex-row w-auto">
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
            <div className="flex flex-col w-full py-1 px-1">
              <label className="py-1" htmlFor="work-experience">
                Work Experience
              </label>
              <div className="rounded border border-black w-full pb-2 px-2">
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="company_name">
                      Company Name
                    </label>
                    <input
                      required
                      id="company_name"
                      name="company_name"
                      className="rounded bg-slate-200"
                      defaultValue={""}
                      onChange={(e) => {}}
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
                      defaultValue={""}
                      onChange={(e) => {}}
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
                      defaultValue={""}
                      onChange={(e) => {}}
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
                      defaultValue={""}
                      onChange={(e) => {}}
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
                      defaultValue={""}
                      onChange={(e) => {}}
                      placeholder="End Date"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="rounded bg-slate-200"
                      defaultValue={""}
                      onChange={(e) => {}}
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
                {/* <div className="flex flex-row justify-end py-2 px-2 font-bold">
                  <p>Delete</p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full py-2 px-1">
            <button className="rounded bg-amber-300 h-10 border border-black">
              Add Work Experience
            </button>
          </div>
        </form>
        <ul>
          {userWorkExperiences.map((workExperience: any) => (
            <li className="pt-3" key={workExperience.id}>
              <div className="flex flex-row w-auto">
                <label hidden htmlFor="resume_id" />
                <input
                  readOnly
                  hidden
                  name="resume_id"
                  id="resume_id"
                  value={workExperience.id}
                />
                <label hidden htmlFor="user_id" />
                <input
                  readOnly
                  hidden
                  name="user_id"
                  id="user_id"
                  value={user.id}
                />
                <div className="flex flex-col w-full py-1 px-1">
                  <div className="flex flex-row justify-between">
                    <label className="py-1" htmlFor="work-experience">
                      Work Experience
                    </label>
                    <form action={deleteWorkExperience}>
                      <label hidden htmlFor="work_experience_id" />
                      <input
                        readOnly
                        hidden
                        name="work_experience_id"
                        id="work_experience_id"
                        value={workExperience.id}
                      />
                      <label hidden htmlFor="resume_id" />
                      <input
                        readOnly
                        hidden
                        name="resume_id"
                        id="resume_id"
                        value={resume.id}
                      />
                      <button type="submit">Delete</button>
                    </form>
                  </div>
                  <form className="rounded border border-black w-full pb-2 px-2">
                    <div className="flex flex-row w-auto">
                      <div className="flex flex-col w-full py-1 px-1">
                        <label className="py-1" htmlFor="company_name">
                          Company Name
                        </label>
                        <input
                          required
                          id="company_name"
                          name="company_name"
                          className="rounded bg-slate-200"
                          defaultValue={workExperience.company_name}
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
                          defaultValue={workExperience.job_title}
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
                          defaultValue={workExperience.location}
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
                          defaultValue={workExperience.start_date}
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
                          defaultValue={""}
                          onChange={(e) => onChangeHandler(e)}
                          placeholder="End Date"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-row w-auto">
                      <div className="flex flex-col w-full py-1 px-1">
                        <label className="py-1" htmlFor="description">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          className="rounded bg-slate-200"
                          defaultValue={""}
                          onChange={(e) => onChangeHandler(e)}
                          placeholder="Description"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-2"></div>
    </div>
  );
}

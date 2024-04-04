import {
  createResumeLine,
  deleteResumeLine,
  updateUserWorkExperience,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import {
  Resume,
  User,
  UserWorkExperience,
  UserWorkExperiences,
} from "@/app/lib/definitions";

export default function YourWorkExperiences({
  userWorkExperiences,
  user,
  resume,
  workResumeLines,
}: {
  userWorkExperiences: UserWorkExperiences;
  user: User;
  resume: Resume;
  workResumeLines: any;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div>
      <div className="py-2 font-bold text-xl">
        <h2>Your Work Experience</h2>
      </div>
      <div className="your-work-experiences  form-amber rounded px-4 py-2">
        <h3 className="font-medium py-1">Previous Experience</h3>
        <div className="h-[100px] rounded overflow-y-auto tight-shadow bg-white">
          <ul className="">
            {userWorkExperiences?.map((experience: UserWorkExperience) => (
              <li key={experience?.id} className="border p-2">
                <div className="flex flex-row">
                  <div className="flex flex-col w-3/4">
                    <h2 className="font-bold">{experience?.company_name}</h2>
                    <p>{experience?.location}</p>
                  </div>
                  <div className="flex flex-col pt-3 pr-6">
                    <form action={createResumeLine}>
                      <input
                        hidden
                        readOnly
                        name="resume_id"
                        value={resume?.id}
                      />
                      <input hidden readOnly name="user_id" value={user?.id} />
                      <input hidden readOnly name="line_type" value={"work"} />
                      <input hidden readOnly name="id" value={experience?.id} />
                      <SubmitButton className={"hover:text-azure-radiance-500"}>
                        Add
                      </SubmitButton>
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
                  <input
                    readOnly
                    hidden
                    name="resume_id"
                    id="resume_id"
                    value={workExperience?.id}
                  />
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
                          {/* <form action={""}>
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
                          </form> */}
                        </div>
                      </div>
                      <div className="flex flex-col" />
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
                        <button className="hover:text-rose-500" type="submit">
                          Remove
                        </button>
                      </form>
                    </div>
                    <form
                      onSubmit={() => setEdited(false)}
                      action={updateUserWorkExperience}
                      className="rounded tight-shadow bg-gray-50 px-2"
                    >
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <input
                            hidden
                            readOnly
                            id="experience_id"
                            name="experience_id"
                            value={workExperience?.id}
                          />
                          <input
                            hidden
                            readOnly
                            value={resume?.id}
                            id="resume_id"
                            name="resume_id"
                          />
                          <label
                            className="py-1 font-medium"
                            htmlFor="company_name"
                          >
                            Company Name
                          </label>
                          <input
                            required
                            id="company_name"
                            name="company_name"
                            className="rounded"
                            defaultValue={workExperience?.company_name}
                            onChange={onChangeHandler}
                            placeholder="Company Name"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="job_title"
                          >
                            Job Title
                          </label>
                          <input
                            required
                            id="job_title"
                            name="job_title"
                            className="rounded"
                            defaultValue={workExperience?.job_title}
                            onChange={onChangeHandler}
                            placeholder="Job Title"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="location"
                          >
                            Company Location
                          </label>
                          <input
                            id="location"
                            name="location"
                            className="rounded"
                            defaultValue={workExperience?.location}
                            onChange={onChangeHandler}
                            placeholder="Company Location"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-1/2 py-1 px-1">
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
                            defaultValue={workExperience?.start_date}
                            onChange={onChangeHandler}
                            placeholder="Start Date"
                          />
                        </div>
                        <div className="flex flex-col w-1/2 py-1 px-1">
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
                            defaultValue={workExperience?.end_date}
                            onChange={onChangeHandler}
                            placeholder="End Date"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="description"
                          >
                            Description One
                          </label>
                          <textarea
                            id="description_one"
                            name="description_one"
                            className="rounded h-[150px]"
                            defaultValue={workExperience?.description_one}
                            onChange={onChangeHandler}
                            placeholder="Description One"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="description_two"
                          >
                            Description Two
                          </label>
                          <textarea
                            id="description_two"
                            name="description_two"
                            className="rounded h-[150px]"
                            defaultValue={workExperience?.description_two}
                            onChange={onChangeHandler}
                            placeholder="Description Two"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="description_three"
                          >
                            Description Three
                          </label>
                          <textarea
                            id="description_three"
                            name="description_three"
                            className="rounded h-[150px]"
                            defaultValue={workExperience?.description_three}
                            onChange={onChangeHandler}
                            placeholder="Description Three"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-auto">
                        <div className="flex flex-col w-full py-1 px-1">
                          <label
                            className="py-1 font-medium"
                            htmlFor="description_four"
                          >
                            Description Four
                          </label>
                          <textarea
                            id="description_four"
                            name="description_four"
                            className="rounded h-[150px]"
                            defaultValue={workExperience?.description_four}
                            onChange={onChangeHandler}
                            placeholder="Description Four"
                          />
                        </div>
                      </div>
                      {edited && (
                        <SubmitButton className="btn btn-amber my-4 p-2 text-center w-auto animate-pulse">
                          Save Change
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

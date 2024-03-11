import { createWorkExperience, deleteWorkExperience } from "@/app/lib/actions";

export default function YourWorkExperiences({
  userWorkExperiences,
  user,
}: {
  userWorkExperiences: any;
  user: any;
}) {
  // console.log(userWorkExperiences);
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
          className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 "
        >
          <div className="flex flex-row w-auto">
            <div className="flex flex-col w-full py-1 px-1">
              <label className="py-1" htmlFor="work-experience">
                Work Experience
              </label>
              <div className="rounded border border-black w-full px-2">
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="company-name">
                      Company Name
                    </label>
                    <input
                      id="company-name"
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
                      placeholder="Company Name"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="job-title">
                      Job Title
                    </label>
                    <input
                      id="job-title"
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
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
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
                      placeholder="Company Location"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-1/2 py-1 px-1">
                    <label className="py-1" htmlFor="start-date">
                      Start Date
                    </label>
                    <input
                      id="start-date"
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
                      placeholder="Start Date"
                    ></input>
                  </div>
                  <div className="flex flex-col w-1/2 py-1 px-1">
                    <label className="py-1" htmlFor="end-date">
                      End Date
                    </label>
                    <input
                      id="end-date"
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
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
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-row justify-end py-2 px-2 font-bold">
                  <p>Delete</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full py-2 px-1">
            <button
              className="rounded bg-amber-300 h-10 border border-black"
              //   value={resumeStyling.resumeTemplate}
              // onChange={(e) => resumeTemplateAction(e)}
              name="add-experience"
              id="add-experience"
            >
              Add Work Experience
            </button>
          </div>
        </form>
        <ul>
          {userWorkExperiences.map((workExperience: any) => (
            <li className="pt-3" key={workExperience.id}>
              <form action={deleteWorkExperience}>
                <div className="flex flex-row">
                  <div className="flex flex-col w-3/4">
                    <h2 className="font-bold">{workExperience.job_title}</h2>
                    <p>{workExperience.company_name}</p>
                  </div>
                  <div className="flex flex-col w-1/4">
                    <button type="submit">Delete</button>
                  </div>
                </div>
              </form>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-2"></div>
    </div>
  );
}

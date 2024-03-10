export default function YourEducation({
  userEducation,
}: {
  userEducation: any;
}) {
  console.log(userEducation);

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
            <div className="flex flex-row m-auto">
              <div className="flex flex-col px-4">Move Up</div>
              <div className="flex flex-col">Move Down</div>
            </div>
          </div>
        </div>
        <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
          <div className="flex flex-row w-auto">
            <div className="flex flex-col w-full py-1 px-1">
              <label className="py-1" htmlFor="school-name">
                Education
              </label>
              <form className="rounded border border-black w-full px-2">
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
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
                <div className="flex flex-row w-auto pt-2 pb-2">
                  <div className="flex flex-col w-full py-1 px-1">
                    <button
                      type="submit"
                      className="rounded bg-amber-300 h-10 border border-black"
                      //   value={resumeStyling.resumeTemplate}
                      // onChange={(e) => resumeTemplateAction(e)}
                      name="add-school"
                      id="add-school"
                    >
                      Add School
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-col w-full py-2 px-1"></div>

          <div className="flex flex-col w-full py-2 px-1">
            {" "}
            <ul>
              {userEducation.map((education: any) => (
                <li key={education.id}>
                  <div className="p-2 my-4 rounded border border-black">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <h2>{education.institution_name}</h2>
                        <p>{education.location}</p>
                        <p>{education.program}</p>
                      </div>
                      <div className="flex flex-col">
                        <button>Delete</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row py-2">
              <div className="px-1 flex align-middle">
                <input
                  className="m-auto bg-slate-200 rounded"
                  type="checkbox"
                ></input>
              </div>
              <div className="flex flex-col">
                <p>Show education section?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2"></div>
    </div>
  );
}

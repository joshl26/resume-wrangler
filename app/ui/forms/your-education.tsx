export default function YourEducation() {
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
                Schools
              </label>
              <div className="rounded border border-black w-full px-2">
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="school-name">
                      School Name
                    </label>
                    <input
                      id="school-name"
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
                      placeholder="School Name"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="section-location">
                      School Location
                    </label>
                    <input
                      id="section-location"
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
                      placeholder="School Location"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-1/3 py-1 px-1">
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
                  <div className="flex flex-col w-1/3 py-1 px-1">
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
                  <div className="flex flex-col w-1/3 py-1 px-1">
                    <label className="py-1" htmlFor="section-title">
                      GPA/AVG
                    </label>
                    <input
                      id="section-title"
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
                      placeholder="GPA/AVG"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="degree">
                      Degree
                    </label>
                    <input
                      id="degree"
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
                      placeholder="Degree"
                    ></input>
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
              name="add-school"
              id="add-school"
            >
              Add School
            </button>
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

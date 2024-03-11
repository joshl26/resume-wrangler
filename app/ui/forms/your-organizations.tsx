export default function YourOrganizations() {
  return (
    <div>
      <div className="your-organizations">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="py-2 font-bold text-xl">
              <h2>Organizations</h2>
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
              <label className="py-1" htmlFor="section-title">
                Section Title
              </label>
              <input
                id="section-title"
                className="rounded bg-slate-200"
                // value={resumeStyling.resumeTitle}
                // onChange={(e) => resumeTitleAction(e)}
                placeholder="Section Title"
              ></input>
            </div>
          </div>
          <div className="flex flex-row w-auto">
            <div className="flex flex-col w-full py-1 px-1">
              <label className="py-1" htmlFor="organization">
                Organization
              </label>
              <div className="rounded border border-black w-full px-2">
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="organization-name">
                      Name
                    </label>
                    <input
                      id="organization-name"
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
                      placeholder="Title, Activity, name, etc.."
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="organization-location">
                      Location
                    </label>
                    <input
                      id="organization-location"
                      className="rounded bg-slate-200"
                      placeholder="Location"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="organization-start-date">
                      Start Date
                    </label>
                    <input
                      id="organization-start-date"
                      className="rounded bg-slate-200"
                      placeholder="Start Date"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="organization-end-date">
                      End Date
                    </label>
                    <input
                      id="organization-end-date"
                      className="rounded bg-slate-200"
                      placeholder="End Date"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="organization-description">
                      Description
                    </label>
                    <textarea
                      id="organization-description"
                      className="rounded bg-slate-200"
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
              name="add-organization"
              id="add-organization"
            >
              Add Organization
            </button>
          </div>
          <div className="flex flex-row py-2">
            <div className="px-1 flex align-middle">
              <input
                className="m-auto bg-slate-200 rounded"
                type="checkbox"
              ></input>
            </div>
            <div className="flex flex-col">
              <p>Show organization section?</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2"></div>
    </div>
  );
}

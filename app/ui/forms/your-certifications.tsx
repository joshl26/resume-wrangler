export default function YourCertifications() {
  return (
    <div>
      <div className="your-certifications">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="py-2 font-bold text-xl">
              <h2>Certification</h2>
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
              <label className="py-1" htmlFor="company-name">
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
              <label className="py-1" htmlFor="work-certification">
                Work Certification
              </label>
              <div className="rounded border border-black w-full px-2">
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="certification-name">
                      Name
                    </label>
                    <input
                      id="certification-name"
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
                      placeholder="Certification Name"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col w-full py-1 px-1">
                    <label className="py-1" htmlFor="certification-date">
                      Date
                    </label>
                    <input
                      id="certification-date"
                      className="rounded bg-slate-200"
                      //   value={resumeStyling.resumeTitle}
                      //   onChange={(e) => resumeTitleAction(e)}
                      placeholder="Certification Date"
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
              name="add-certification"
              id="add-certification"
            >
              Add Certification
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
              <p>Show certification section?</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2"></div>
    </div>
  );
}

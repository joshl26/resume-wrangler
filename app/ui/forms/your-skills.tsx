export default function YourSkills() {
  return (
    <div>
      <div className="your-skills">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="py-2 font-bold text-xl">
              <h2>Your Skills</h2>
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
          <div className="flex flex-col w-full py-2 px-1">
            <label className="py-1" htmlFor="resume-template" hidden>
              Profile Image
            </label>
            <button
              className="rounded bg-amber-300 h-10 border border-black"
              //   value={resumeStyling.resumeTemplate}
              // onChange={(e) => resumeTemplateAction(e)}
              name="resume-template"
              id="resume-template"
            >
              Add Skill
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col py-1 px-1">
              <label className="py-1" htmlFor="skills">
                Skills
              </label>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col w-3/4">
                  <div className="flex flex-row w-full">
                    <input
                      id="skills"
                      value={"TEST"}
                      className="rounded bg-slate-200 w-full"
                    ></input>
                  </div>
                  <div className="flex flex-row py-3">
                    <input className="w-full" type="range"></input>
                  </div>
                </div>
                <div className="flex flex-col w-auto align-middle">
                  {/* <p onClick={(e) => deleteSkill(e)}>Delete</p> */}
                </div>
              </div>
            </div>
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
                <p>Show skills progress bars?</p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="px-1 flex align-middle">
                <input
                  className="m-auto bg-slate-200 rounded"
                  type="checkbox"
                ></input>
              </div>
              <div className="flex flex-col">
                <p>Show skills section?</p>
              </div>
            </div>
          </div>
          <div style={{ height: "0.5rem" }}></div>
        </div>
      </div>
      <div className="py-2"></div>
    </div>
  );
}

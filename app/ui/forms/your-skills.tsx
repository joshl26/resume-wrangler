export default function YourSkills({ userSkills }: { userSkills: any }) {
  console.log(userSkills);
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
              <label className="py-1" htmlFor="skill_title">
                Skill Title
              </label>
              <input
                id="skill_title"
                name="skill_title"
                className="rounded bg-slate-200"
                value={""}
                onChange={() => {}}
                placeholder="Skill Title"
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
              <p className="py-1">Skills</p>
              {userSkills?.map((userSkill: any) => (
                <div
                  key={userSkill.id}
                  className="flex flex-row justify-between"
                >
                  <div className="flex flex-col w-3/4">
                    <div className="flex text-center align-middle flex-col w-full h-full">
                      <p className="rounded bg-slate-200 w-full h-[35px]">
                        {userSkill.skill}
                      </p>
                    </div>
                    <div className="flex flex-row py-3">
                      <input
                        className="w-full"
                        defaultValue={userSkill.skill_level * 100}
                        type="range"
                      ></input>
                    </div>
                  </div>
                  <div className="flex flex-col w-auto align-middle">
                    <button onClick={(e) => {}}>Delete</button>
                  </div>
                </div>
              ))}
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

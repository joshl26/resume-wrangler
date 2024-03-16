import { createUserSkill, deleteUserSkill } from "@/app/lib/actions";
import { useState } from "react";

export default function YourSkills({
  userSkills,
  user,
  resume,
  setShowSkills,
  showSkills,
  showSkillProgress,
  setShowSkillProgress,
}: {
  userSkills: any;
  user: any;
  resume: any;
  setShowSkills: (e: any) => void;
  showSkills: any;
  setShowSkillProgress: (e: any) => void;
  showSkillProgress: any;
}) {
  // console.log(userSkills);

  const [edited, setEdited] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  const showSkillsOnChangeHandler = (e: any) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      setShowSkills("true");
    } else {
      setShowSkills("false");
    }

    if (edited === false) {
      setEdited(true);
    }
  };

  const showSkillProgressBarsOnChangeHandler = (e: any) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      setShowSkillProgress("true");
    } else {
      setShowSkillProgress("false");
    }

    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="your-skills">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="py-2 font-bold text-xl">
            <h2>Your Skills</h2>
            {showSkills}
            {showSkillProgress}
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
        {showSkills === "true" ? (
          <>
            <form action={createUserSkill}>
              <div className="flex flex-row w-auto">
                <div className="flex flex-col w-full py-1 px-1">
                  <label hidden htmlFor="user_id" />
                  <input
                    hidden
                    id="user_id"
                    name="user_id"
                    defaultValue={user.id}
                    type="text"
                  />
                  <label hidden htmlFor="resume_id" />
                  <input
                    hidden
                    id="resume_id"
                    name="resume_id"
                    defaultValue={resume.id}
                    type="text"
                  />
                  <label className="py-1" htmlFor="skill_title">
                    Skill Title
                  </label>
                  <input
                    required
                    id="skill_title"
                    name="skill_title"
                    className="rounded bg-slate-200"
                    defaultValue={""}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder="Skill Title"
                  ></input>
                  <label hidden htmlFor="skill_level" />
                  {showSkillProgress === "true" ? (
                    <input
                      className="py-4"
                      id="skill_level"
                      name="skill_level"
                      type="range"
                      defaultValue={50}
                    />
                  ) : (
                    <input
                      hidden
                      className="py-4"
                      id="skill_level"
                      name="skill_level"
                      type="range"
                      defaultValue={50}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full pb-1 px-1">
                <button
                  type="submit"
                  className="rounded bg-amber-300 h-10 border border-black"
                  //   value={resumeStyling.resumeTemplate}
                  // onChange={(e) => resumeTemplateAction(e)}
                >
                  Add Skill
                </button>
              </div>
            </form>
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
                      {showSkillProgress === "true" ? (
                        <div className="flex flex-row py-3">
                          <input
                            className="w-full"
                            defaultValue={userSkill.skill_level}
                            type="range"
                          ></input>
                        </div>
                      ) : (
                        <div className="flex flex-row py-3">
                          <input
                            hidden
                            className="w-full"
                            defaultValue={userSkill.skill_level}
                            type="range"
                          ></input>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-auto align-middle">
                      <form action={deleteUserSkill}>
                        <label hidden htmlFor="resume_id" />
                        <input
                          hidden
                          id="resume_id"
                          name="resume_id"
                          defaultValue={resume.id}
                          type="text"
                        />
                        <label hidden htmlFor="id" />
                        <input
                          type="text"
                          name="id"
                          id="id"
                          defaultValue={userSkill.id}
                          hidden
                        />
                        <button type="submit">Delete</button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="flex flex-col">
          {showSkills === "true" ? (
            <div className="flex flex-row py-2">
              <div className="px-1 flex align-middle">
                <input
                  hidden
                  readOnly
                  id="show_skill_progress"
                  name="show_skill_progress"
                  value={showSkillProgress}
                />
                <input
                  checked={showSkillProgress === "true" ? true : false}
                  value={showSkillProgress}
                  onChange={showSkillProgressBarsOnChangeHandler}
                  className="m-auto bg-slate-200 rounded"
                  type="checkbox"
                ></input>
              </div>
              <div className="flex flex-col">
                <p>Show skills progress bars?</p>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-row py-1">
            <div className="flex flex-col px-1 py-2">
              <label hidden htmlFor="show_socials" />
              <input
                hidden
                readOnly
                id="show_socials"
                name="show_socials"
                value={showSkills}
              />
              <input
                type="checkbox"
                className="rounded bg-slate-200"
                checked={showSkills === "true" ? true : false}
                value={showSkills}
                onChange={showSkillsOnChangeHandler}
              ></input>
            </div>
            <div className="flex flex-col">
              <label className="py-1 px-1" htmlFor="social_icons">
                Show Skills section?
              </label>
            </div>
          </div>
        </div>
        <div style={{ height: "0.5rem" }}></div>{" "}
        {edited && <button type="submit">Save</button>}
      </div>
      <div className="py-2"></div>
    </div>
  );
}

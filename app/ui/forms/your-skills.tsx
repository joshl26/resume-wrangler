import {
  createUserSkill,
  deleteUserSkill,
  updateSkillsSection,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";

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
            {/* {showSkills}
            {showSkillProgress} */}
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
            <form
              // className="border border-red"
              onSubmit={() => setEdited(false)}
              action={createUserSkill}
            >
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
                    onChange={(e) => {}}
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
                    key={userSkill?.id}
                    className="flex flex-row justify-between"
                  >
                    <div className="flex flex-col w-3/4">
                      <div className="flex text-center align-middle flex-col w-full h-full">
                        <input
                          readOnly
                          type="text"
                          onChange={(e) => {}}
                          defaultValue={userSkill?.skill}
                          className="rounded bg-slate-200 w-full h-[35px]"
                        />
                      </div>
                      {showSkillProgress === "true" ? (
                        <div className="flex flex-row py-3">
                          <input
                            readOnly
                            className="w-full"
                            value={userSkill?.skill_level}
                            type="range"
                          ></input>
                        </div>
                      ) : (
                        <div className="flex flex-row py-3">
                          <input
                            hidden
                            className="w-full"
                            defaultValue={userSkill?.skill_level}
                            type="range"
                          ></input>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-auto align-middle ">
                      <form
                        className="border border-black rounded p-1"
                        action={deleteUserSkill}
                      >
                        <label hidden htmlFor="resume_id" />
                        <input
                          hidden
                          id="resume_id"
                          name="resume_id"
                          defaultValue={resume?.id}
                          type="text"
                        />
                        <label hidden htmlFor="id" />
                        <input
                          type="text"
                          name="id"
                          id="id"
                          defaultValue={userSkill?.id}
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
        <form
          onSubmit={() => setEdited(false)}
          action={updateSkillsSection}
          className="flex flex-col"
        >
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
                />
              </div>
              <div className="flex flex-col">
                <p>Show skills progress bars?</p>
              </div>
            </div>
          ) : (
            <div className="px-1 flex align-middle">
              <input
                hidden
                readOnly
                id="show_skill_progress"
                name="show_skill_progress"
                value={showSkillProgress}
              />
              {/* <input
                hidden
                readOnly
                checked={showSkillProgress === "true" ? true : false}
                value={showSkillProgress}
                onChange={() => {}}
                className="m-auto bg-slate-200 rounded"
                type="checkbox"
              /> */}
            </div>
          )}
          <div className="flex flex-row py-1">
            <div className="flex flex-col px-1 py-2">
              <label hidden htmlFor="user_id" />
              <input
                hidden
                readOnly
                id="user_id"
                name="user_id"
                value={user?.id}
              />
              <label hidden htmlFor="resume_id" />
              <input
                hidden
                readOnly
                id="resume_id"
                name="resume_id"
                value={resume.id}
              />
              <label hidden htmlFor="show_skills_section" />
              <input
                hidden
                readOnly
                id="show_skills_section"
                name="show_skills_section"
                value={showSkills}
              />
              <input
                type="checkbox"
                className="rounded bg-slate-200"
                checked={showSkills === "true" ? true : false}
                value={showSkills}
                onChange={showSkillsOnChangeHandler}
              />
            </div>
            <div className="flex flex-col">
              <label className="py-1 px-1" htmlFor="social_icons">
                Show Skills section?
              </label>
            </div>
          </div>
          {edited && (
            <>
              <div style={{ height: "0.5rem" }} />
              <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
                Save Change
              </SubmitButton>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

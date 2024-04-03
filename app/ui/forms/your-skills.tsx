import {
  createResumeLine,
  deleteResumeLine,
  updateSkillsSection,
} from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import { Resume, User, UserSkill, UserSkills } from "@/app/lib/definitions";

export default function YourSkills({
  userSkills,
  user,
  resume,
  setShowSkills,
  showSkills,
  showSkillProgress,
  setShowSkillProgress,
  skillResumeLines,
}: {
  userSkills: UserSkills;
  user: User;
  resume: Resume;
  setShowSkills: (e: string) => void;
  showSkills: string;
  setShowSkillProgress: (e: string) => void;
  showSkillProgress: string;
  skillResumeLines: any;
}) {
  const [edited, setEdited] = useState(false);

  const showSkillsOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked === true) {
      setShowSkills("true");
    } else {
      setShowSkills("false");
    }

    if (edited === false) {
      setEdited(true);
    }
  };

  const showSkillProgressBarsOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
          </div>
        </div>
        <div className="flex flex-col "></div>
      </div>
      <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
        {showSkills === "true" ? (
          <>
            <div className="flex flex-row">
              <ul>
                {userSkills.map((skill: UserSkill) => (
                  <li className="border my-2 p-2" key={skill?.id}>
                    <div className="flex flex-row justify-between py-1">
                      <div className="flex flex-col w-[150px]">
                        <h2 className="font-bold">{skill.skill}</h2>
                      </div>
                      <div className="flex flex-col w-1/3 m-auto">
                        <input type="range" value={skill.skill_level} />
                      </div>
                      <div className="flex flex-col w-1/3 m-auto">
                        <div className="flex flex-row justify-end">
                          {" "}
                          <form action={createResumeLine}>
                            <input
                              hidden
                              readOnly
                              name="resume_id"
                              value={resume.id}
                            />
                            <input
                              hidden
                              readOnly
                              name="user_id"
                              value={user.id}
                            />
                            <input
                              hidden
                              readOnly
                              name="line_type"
                              value={"skill"}
                            />
                            <input hidden readOnly name="id" value={skill.id} />
                            <SubmitButton className={""}>Add</SubmitButton>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col py-1 px-1">
                <p className="py-1">Resume Skills</p>
                {skillResumeLines[0] ? (
                  skillResumeLines?.map((userSkill: UserSkill) => (
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
                            />
                          </div>
                        ) : (
                          <div className="flex flex-row py-3">
                            <input
                              hidden
                              className="w-full"
                              defaultValue={userSkill?.skill_level}
                              type="range"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col w-auto align-middle ">
                        <form className="p-1" action={deleteResumeLine}>
                          <input
                            hidden
                            readOnly
                            name="user_id"
                            value={user.id}
                          />
                          <input
                            hidden
                            readOnly
                            name="line_type"
                            value={"skill"}
                          />
                          <input
                            hidden
                            readOnly
                            id="resume_id"
                            name="resume_id"
                            defaultValue={resume?.id}
                            type="text"
                          />
                          <input
                            readOnly
                            type="text"
                            name="id"
                            id="id"
                            defaultValue={userSkill?.id}
                            hidden
                          />
                          <SubmitButton className={""}>Remove</SubmitButton>
                        </form>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2 className="text-center animate-pulse py-2">
                    Please add a skill from the list above
                  </h2>
                )}
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
                value={resume?.id}
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
              <SubmitButton className="btn btn-amber my-4 animate-pulse">
                Save Change
              </SubmitButton>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { createUserSkill } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function NewSkill({ user }: { user: User }) {
  const [edited, setEdited] = useState(false);
  const [skillLevel, setSkillLevel] = useState("50");

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  const skillOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillLevel(e.target.value);
  };

  return (
    <div className="px-2">
      <BackButton className="" href={"/dashboard/skills/"}>
        Back
      </BackButton>
      <h2 className="font-medium text-[2rem] py-1">Create New Skill</h2>
      <form
        onSubmit={() => setEdited(false)}
        action={createUserSkill}
        className="flex flex-col w-full p-2 form-amber rounded "
      >
        <input hidden readOnly name="user_id" id="user_id" value={user?.id} />
        <input
          readOnly
          hidden
          name="section_title"
          id="section_title"
          value="blank"
        />
        <input readOnly hidden name="resume_id" id="resume_id" value="blank" />
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="skill_title">
            Skill Name
          </label>
          <input
            required
            name="skill_title"
            id="skill_title"
            onChange={onChangeHandler}
            defaultValue={""}
            type="text"
          />
        </div>
        <div className="flex flex-col p-2">
          <label className="font-bold" htmlFor="skill_level">
            Skill Level {skillLevel}%
          </label>
          <input
            required
            name="skill_level"
            id="skill_level"
            onChange={(e) => skillOnChangeHandler(e)}
            defaultValue={skillLevel}
            type="range"
          />
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber my-4 p-2 text-center w-auto animate-pulse">
              Create New Skill
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserSkill } from "@/app/lib/actions";
import Link from "next/link";
import { UserSkill } from "@/app/lib/definitions";
import BackButton from "../back-button";

export default function EditSkill({ skill }: { skill: UserSkill }) {
  const [edited, setEdited] = useState(false);
  const [skillLevel, setSkillLevel] = useState(skill?.skill_level);

  const skillOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillLevel(e.target.value);
    if (edited === false) {
      setEdited(true);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="px-3">
      <BackButton classname="" href={"/dashboard/skills/"}>
        Back
      </BackButton>
      <h2 className="font-medium text-[2rem] py-1">Edit Skill</h2>
      <form
        onSubmit={() => setEdited(false)}
        action={updateUserSkill}
        className="flex flex-col w-[500px] p-3 form-amber rounded"
      >
        <input
          readOnly
          hidden
          name="skill_id"
          id="skill_id"
          defaultValue={skill?.id}
        />
        <div className="flex flex-col pb-1">
          <input
            readOnly
            hidden
            name="resume_id"
            id="resume_id"
            value="blank"
            type="text"
          />
          <input
            readOnly
            hidden
            name="user_id"
            id="user_id"
            value="blank"
            type="text"
          />
          <label className="font-bold" htmlFor="skill_name">
            Skill Name
          </label>
          <input
            required
            name="skill_name"
            id="skill_name"
            onChange={(e) => onChangeHandler(e)}
            defaultValue={skill?.skill}
            type="text"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="font-bold" htmlFor="skill_level">
            Skill Level {skillLevel}%
          </label>
          <input
            name="skill_level"
            id="skill_level"
            className="shadow-none"
            onChange={(e) => skillOnChangeHandler(e)}
            defaultValue={skill?.skill_level}
            type="range"
          />
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="btn btn-amber my-4 p-2 text-center w-auto animate-pulse">
              Save Update
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

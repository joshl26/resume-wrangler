"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateUserSkill } from "@/app/lib/actions";
import Link from "next/link";

export default function EditSkill({ skill }: { skill: any }) {
  const [edited, setEdited] = useState(false);
  const [skillLevel, setSkillLevel] = useState(skill?.skill_level);

  const onChangeHandler = (e: any) => {
    setSkillLevel(e.target.value);
    if (edited === false) {
      setEdited(true);
    }
  };
  return (
    <div>
      <Link className="px-3 underline" href={"/dashboard/skills/"}>
        Back
      </Link>
      <h2 className="font-medium text-[2rem] px-3">Edit Skill</h2>
      <form
        onSubmit={() => setEdited(false)}
        action={updateUserSkill}
        className="flex flex-col w-[500px] p-3 m-3 border border-black rounded"
      >
        <input
          readOnly
          hidden
          name="skill_id"
          id="skill_id"
          defaultValue={skill?.id}
        />
        <div className="flex flex-col py-2">
          <input
            readOnly
            hidden
            name="resume_id"
            id="resume_id"
            onChange={(e) => {}}
            value="blank"
            type="text"
          />
          <input
            readOnly
            hidden
            name="user_id"
            id="user_id"
            onChange={(e) => {}}
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
            onChange={(e) => onChangeHandler(e)}
            defaultValue={skill?.skill_level}
            type="range"
          />
        </div>
        {edited && (
          <>
            <div style={{ height: "0.5rem" }} />
            <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
              Update Certification
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateSocials } from "@/app/lib/actions";
import { useFormState } from "react-dom";

const YourSocialLinks = ({ user, resume }: { user: any; resume: any }) => {
  const [edited, setEdited] = useState(false);
  const [showSocials, setShowSocials] = useState(user.show_socials);

  const initialState = { message: "inital state", formData: null, errors: {} };
  const updateSocialsWithId = updateSocials.bind(null, user?.id!);
  const [state, dispatch] = useFormState(updateSocialsWithId, initialState);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  const showSocialsOnChangeHandler = (e: any) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      setShowSocials("true");
    } else {
      setShowSocials("false");
    }

    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="your-profile pt-4">
      <div className="py-2 font-bold text-xl">
        <h2>Your Social Links</h2>
      </div>
      <form
        onSubmit={() => setEdited(false)}
        action={dispatch}
        className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 "
      >
        <div className="flex flex-row justify-between w-auto">
          <div className="flex flex-col w-1/2 py-1 px-1">
            <label hidden htmlFor="resume_id" />
            <input
              hidden
              readOnly
              value={resume.id}
              id="resume_id"
              name="resume_id"
            />
            <label className="py-1" htmlFor="linked_in">
              LinkedIn
            </label>
            <input
              id="linked_in"
              name="linked_in"
              className="rounded bg-slate-200"
              defaultValue={user.linked_in}
              onChange={(e) => onChangeHandler(e)}
              placeholder="LinkedIn"
            ></input>
          </div>
          <div className="flex flex-col w-1/2 py-1">
            <label className="py-1" htmlFor="facebook">
              Facebook
            </label>
            <input
              id="facebook"
              name="facebook"
              className="rounded bg-slate-200"
              defaultValue={user.facebook}
              onChange={(e) => onChangeHandler(e)}
              placeholder="Facebook"
            ></input>
          </div>
        </div>
        <div className="flex flex-row justify-between w-auto">
          <div className="flex flex-col w-1/2 py-1 px-1">
            <label className="py-1" htmlFor="instagram">
              Instagram
            </label>
            <input
              id="instagram"
              name="instagram"
              className="rounded bg-slate-200"
              defaultValue={user.instagram}
              onChange={(e) => onChangeHandler(e)}
              placeholder="Instagram"
            ></input>
          </div>
          <div className="flex flex-col w-1/2 py-1">
            <label className="py-1" htmlFor="twitter">
              Twitter
            </label>
            <input
              id="twitter"
              name="twitter"
              className="rounded bg-slate-200"
              defaultValue={user.twitter}
              onChange={(e) => onChangeHandler(e)}
              placeholder="Twitter"
            ></input>
          </div>
        </div>
        <div className="flex flex-row justify-between w-auto">
          <div className="flex flex-col w-full py-1 px-1">
            <label className="py-1" htmlFor="github">
              Github
            </label>
            <input
              id="github"
              name="github"
              className="rounded bg-slate-200"
              defaultValue={user.github}
              onChange={(e) => onChangeHandler(e)}
              placeholder="Github"
            ></input>
          </div>
        </div>
        <div className="flex flex-row py-1">
          <div className="flex flex-col px-1 py-2">
            <label hidden htmlFor="show_socials" />
            <input
              hidden
              readOnly
              id="show_socials"
              name="show_socials"
              value={showSocials}
            />
            <input
              type="checkbox"
              className="rounded bg-slate-200"
              checked={showSocials === "true" ? true : false}
              value={showSocials}
              onChange={showSocialsOnChangeHandler}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="py-1 px-1" htmlFor="social_icons">
              Show Social Icons?
            </label>
          </div>
        </div>
        {edited && (
          <SubmitButton className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
            Save Change
          </SubmitButton>
        )}
      </form>
    </div>
  );
};

export default YourSocialLinks;

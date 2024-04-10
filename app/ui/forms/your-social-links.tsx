"use client";

import React, { useState } from "react";
import { SubmitButton } from "../submit-button";
import { updateSocials } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Resume, User } from "@/app/lib/definitions";

const YourSocialLinks = ({
  user,
  resume,
  showSocials,
  setShowSocials,
}: {
  user: User;
  resume: Resume;
  showSocials: string;
  setShowSocials: (e: string) => void;
}) => {
  const [edited, setEdited] = useState(false);

  const initialState = { message: "inital state", formData: null, errors: {} };
  const updateSocialsWithId = updateSocials.bind(null, user?.id!);
  const [state, dispatch] = useFormState(updateSocialsWithId, initialState);

  const onChangeHandler = () => {
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
        className="form-amber rounded px-5 py-2 "
      >
        {showSocials === "true" ? (
          <>
            <div className="flex flex-row justify-between w-auto">
              <div className="flex flex-col w-1/2 py-1 px-1">
                <input
                  hidden
                  readOnly
                  value={resume?.id}
                  id="resume_id"
                  name="resume_id"
                />
                <label className="py-1 font-medium" htmlFor="linked_in">
                  LinkedIn
                </label>
                <input
                  id="linked_in"
                  name="linked_in"
                  className="rounded"
                  defaultValue={user?.linked_in}
                  onChange={onChangeHandler}
                  placeholder="in/username"
                />
              </div>
              <div className="flex flex-col w-1/2 py-1">
                <label className="py-1 font-medium" htmlFor="facebook">
                  Facebook
                </label>
                <input
                  id="facebook"
                  name="facebook"
                  className="rounded"
                  defaultValue={user?.facebook}
                  onChange={onChangeHandler}
                  placeholder="Facebook username"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between w-auto">
              <div className="flex flex-col w-1/2 py-1 px-1">
                <label className="py-1 font-medium" htmlFor="instagram">
                  Instagram
                </label>
                <input
                  id="instagram"
                  name="instagram"
                  className="rounded"
                  defaultValue={user?.instagram}
                  onChange={onChangeHandler}
                  placeholder="Instagram"
                />
              </div>
              <div className="flex flex-col w-1/2 py-1">
                <label className="py-1 font-medium" htmlFor="twitter">
                  Twitter
                </label>
                <input
                  id="twitter"
                  name="twitter"
                  className="rounded"
                  defaultValue={user?.twitter}
                  onChange={onChangeHandler}
                  placeholder="Twitter"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between w-auto">
              <div className="flex flex-col w-full py-1 px-1">
                <label className="py-1 font-medium" htmlFor="github">
                  Github
                </label>
                <input
                  id="github"
                  name="github"
                  className="rounded"
                  defaultValue={user?.github}
                  onChange={onChangeHandler}
                  placeholder="Github"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <input
              hidden
              readOnly
              value={resume?.id}
              id="resume_id"
              name="resume_id"
            />
            <input
              id="linked_in"
              name="linked_in"
              hidden
              readOnly
              value={user?.linked_in}
            />
            <input
              id="facebook"
              name="facebook"
              hidden
              readOnly
              value={user?.facebook}
            />
            <input
              id="instagram"
              name="instagram"
              hidden
              readOnly
              value={user?.instagram}
            />
            <input
              id="twitter"
              name="twitter"
              hidden
              readOnly
              defaultValue={user?.twitter}
            />
            <input
              id="github"
              name="github"
              hidden
              readOnly
              value={user?.github}
            />
          </>
        )}
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
              className="rounded"
              checked={showSocials === "true" ? true : false}
              value={showSocials}
              onChange={showSocialsOnChangeHandler}
            />
          </div>
          <div className="flex flex-col">
            <h2 className="py-1 px-1 font-medium">Show Social Icons?</h2>
          </div>
        </div>
        {edited && (
          <SubmitButton className="btn btn-amber my-4 animate-pulse">
            Save Change
          </SubmitButton>
        )}
      </form>
    </div>
  );
};

export default YourSocialLinks;

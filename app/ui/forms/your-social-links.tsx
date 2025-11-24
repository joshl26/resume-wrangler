"use client";

import React, { useState, useCallback } from "react";
import { SubmitButton } from "../submit-button";
import { updateSocials } from "@/app/lib/actions";
import type { Resume, User } from "@/app/lib/definitions";
import "./your-social-links.css";

interface YourSocialLinksProps {
  user: User;
  resume: Resume;
  showSocials: boolean;
  setShowSocials: (value: boolean) => void;
}

const YourSocialLinks: React.FC<YourSocialLinksProps> = ({
  user,
  resume,
  showSocials,
  setShowSocials,
}) => {
  const [edited, setEdited] = useState(false);

  const initialState = { message: "initial state", formData: null, errors: {} };
  const updateSocialsWithId = updateSocials.bind(null, user.id);
  const [state, dispatch] = React.useActionState(
    updateSocialsWithId,
    initialState,
  );

  const onChangeHandler = useCallback(() => {
    if (!edited) setEdited(true);
  }, [edited]);

  const showSocialsOnChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowSocials(e.target.checked);
      if (!edited) setEdited(true);
    },
    [edited, setShowSocials],
  );

  return (
    <div className="your-social-links">
      <div className="your-social-links-header">
        <h2>Your Social Links</h2>
      </div>
      <form
        onSubmit={() => setEdited(false)}
        action={dispatch}
        className="your-social-links-form"
      >
        <input type="hidden" name="resume_id" value={resume.id} />

        {showSocials ? (
          <div className="social-inputs-grid">
            {[
              {
                id: "linked_in",
                label: "LinkedIn",
                placeholder: "LinkedIn Username",
                value: user.linked_in,
              },
              {
                id: "facebook",
                label: "Facebook",
                placeholder: "Facebook Username",
                value: user.facebook,
              },
              {
                id: "instagram",
                label: "Instagram",
                placeholder: "Instagram Username",
                value: user.instagram,
              },
              {
                id: "twitter",
                label: "Twitter",
                placeholder: "Twitter Username",
                value: user.twitter,
              },
              {
                id: "github",
                label: "Github",
                placeholder: "Github Username",
                value: user.github,
              },
            ].map(({ id, label, placeholder, value }) => (
              <div key={id} className="social-input-group">
                <label htmlFor={id}>{label}</label>
                <input
                  id={id}
                  name={id}
                  className="social-input"
                  value={value ?? ""}
                  onChange={onChangeHandler}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        ) : (
          <>
            <input
              type="hidden"
              name="linked_in"
              value={user.linked_in ?? ""}
            />
            <input type="hidden" name="facebook" value={user.facebook ?? ""} />
            <input
              type="hidden"
              name="instagram"
              value={user.instagram ?? ""}
            />
            <input type="hidden" name="twitter" value={user.twitter ?? ""} />
            <input type="hidden" name="github" value={user.github ?? ""} />
          </>
        )}

        <div className="show-socials-toggle">
          <input
            type="checkbox"
            id="show_socials_input"
            className="show-socials-checkbox"
            checked={showSocials}
            onChange={showSocialsOnChangeHandler}
          />
          <label htmlFor="show_socials_input" className="show-socials-label">
            Show Social Icons?
          </label>
          <input
            type="hidden"
            name="show_socials"
            value={showSocials ? "true" : "false"}
          />
        </div>

        {edited && (
          <div className="submit-button-wrapper">
            <SubmitButton className="btn btn-amber animate-pulse">
              Save Change
            </SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
};

export default YourSocialLinks;

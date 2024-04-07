"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { SubmitButton } from "../submit-button";
import BackButton from "../back-button";
import { CreateNewUser } from "@/app/lib/actions";
import { emailRegex, passwordRegex, usernameRegex } from "@/app/lib/regex";

export default function RegisterUser() {
  const [error, setError] = useState("");
  const { pending } = useFormStatus();
  const [usernameValidated, setUsernameValidated] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (usernameValidated && emailValidated && passwordValidated) {
      setFormValidated(true);
    } else {
      setFormValidated(false);
    }
  }, [usernameValidated, emailValidated, passwordValidated]);

  const usernameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var usernameInput = e.target.value;

    var re = new RegExp(usernameRegex);

    setUsername(usernameInput);

    if (re.test(usernameInput)) {
      setUsernameValidated(true);
    } else {
      setUsernameValidated(false);
    }
  };

  const emailOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var emailInput = e.target.value;

    setEmail(emailInput);

    var re = new RegExp(emailRegex);
    if (re.test(emailInput)) {
      setEmailValidated(true);
    } else {
      setEmailValidated(false);
    }
  };

  const passwordOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var passwordInput = e.target.value;

    setPassword(passwordInput);

    var re = new RegExp(passwordRegex);
    if (re.test(passwordInput)) {
      setPasswordValidated(true);
    } else {
      setPasswordValidated(false);
    }
  };

  return (
    <div className="flex flex-col h-[92vh] justify-center">
      <div className="flex flex-col">
        <h2 className="text-center font-medium text-[2rem] py-4">
          New User Sign Up
        </h2>
        <div className="flex flex-row justify-around">
          <form
            action={CreateNewUser}
            className="flex flex-col form-amber w-auto md:w-[450px] gap-2 tight-shadow px-4 pb-4 pt-3 mb-3"
          >
            <label htmlFor="username">Username</label>
            <input
              disabled={pending}
              name="username"
              className="border border-slate-300 rounded"
              type="text"
              required
              placeholder="Type your Username"
              autoComplete="username"
              onChange={usernameOnChangeHandler}
              minLength={3}
              maxLength={20}
              value={username}
            />
            {usernameValidated === false && (
              <div className="py-1">
                <p>A valid username will:</p>
                <ul className="text-rose-500">
                  <li>- Have six to twenty characters</li>
                  <li>- Contain only A-Z, a-z and 0-9 characters</li>
                  <li>- Not contain spaces or special characters</li>
                </ul>
              </div>
            )}
            {usernameValidated && (
              <>
                <label htmlFor="email">Email</label>
                <input
                  disabled={pending}
                  name="email"
                  className="border border-slate-300 rounded"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Type your email address"
                  onChange={emailOnChangeHandler}
                  value={email}
                />
              </>
            )}
            {usernameValidated && !emailValidated ? (
              <div className="py-1">
                <p>A valid email will:</p>
                <ul className="text-rose-500">
                  <li>- Contain only A-Z, a-z and 0-9 characters</li>
                  <li>- Not contain spaces or special characters</li>
                  <li>- Name and domain seperated by @ symbol</li>
                </ul>
              </div>
            ) : (
              ""
            )}

            {emailValidated && (
              <>
                <label htmlFor="email">Password</label>
                <input
                  disabled={pending}
                  name="password"
                  className="border border-slate-300 rounded"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="Type your password"
                  onChange={passwordOnChangeHandler}
                  minLength={6}
                  maxLength={20}
                  value={password}
                />
              </>
            )}
            {usernameValidated && emailValidated && !passwordValidated ? (
              <div className="py-1">
                <p>A valid password will:</p>
                <ul className="text-rose-500">
                  <li>- Contain at least one upper case A-Z</li>
                  <li>- Contain at least one lower case a-z</li>
                  <li>- At least one digit from 0-9</li>
                  <li>- At least one special character</li>
                  <li>- Minimum six, to max twenty characters</li>
                </ul>
              </div>
            ) : (
              ""
            )}

            {formValidated && (
              <>
                <SubmitButton className="btn btn-amber mt-4 mb-2 animate-pulse">
                  Register New User
                </SubmitButton>
              </>
            )}
            {error && <p>{error}</p>}
          </form>
        </div>
        <BackButton href={"/"}>Back</BackButton>
      </div>
    </div>
  );
}

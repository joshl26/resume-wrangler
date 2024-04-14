"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { SubmitButton } from "../submit-button";
import BackButton from "../back-button";
import { CreateNewUser } from "@/app/lib/actions";
import { emailRegex, passwordRegex, usernameRegex } from "@/app/lib/regex";
import Link from "next/link";
import AzureBlob from "../landing/azure-blob";
import OrangeBlob from "../landing/orange-blob";

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
    <div className="relative flex flex-col h-[92vh] justify-center overflow-x-hidden overflow-clip">
      <AzureBlob className="h-[750px] w-[750px] -z-1 -left-[500px]" />
      <OrangeBlob className="h-[750px] w-[750px] -z-1 -right-[600px]" />

      <div className="relative flex flex-col">
        <h2 className="text-center font-bold text-[2rem] py-4">
          New User Sign Up
        </h2>
        <div className="flex flex-row justify-around z-10">
          <form
            action={CreateNewUser}
            className="flex flex-col form-amber rounded-lg w-auto md:w-[450px] gap-2 tight-shadow p-10 mb-3"
          >
            <label className="font-bold" htmlFor="username">
              Username
            </label>
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
                <p className="font-medium">A valid username will:</p>
                <ul>
                  <li className="font-lite italic">
                    - Have six to twenty characters
                  </li>
                  <li className="font-lite italic">
                    - Contain only A-Z, a-z and 0-9 characters
                  </li>
                  <li className="font-lite italic">
                    - Not contain spaces or special characters
                  </li>
                </ul>
              </div>
            )}
            {usernameValidated && (
              <>
                <label className="font-bold" htmlFor="email">
                  Email
                </label>
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
                <p className="font-medium">A valid email will:</p>
                <ul className="font-lite italic">
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
                <label className="font-bold" htmlFor="email">
                  Password
                </label>
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
                <p className="font-medium">A valid password will:</p>
                <ul className="font-lite italic">
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

        <div className="flex flex-row m-auto">
          <p className="py-2 font-bold">
            Returning user?{" "}
            <Link
              className="font-medium text-rose-500 hover:text-azure-radiance-500"
              href="/login"
            >
              Sign In
            </Link>{" "}
          </p>
        </div>

        <BackButton classname="text-center" href={"/"}>
          Back
        </BackButton>
      </div>
    </div>
  );
}

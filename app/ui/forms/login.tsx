"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { useState } from "react";
import { LoginButton } from "../login-button";
import { emailRegex } from "@/app/lib/regex";

export default function LoginForm() {
  const [code, action] = useFormState(authenticate, undefined);
  const [edited, setEdited] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);

  const emailOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var emailInput = e.target.value;

    var re = new RegExp(emailRegex);

    if (re.test(emailInput)) {
      setEmailValidated(true);
    } else {
      setEmailValidated(false);
    }
  };

  const passwordOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var passwordInput = e.target.value;

    // only check for 6 characters, some previous passwords were 4 char
    var re = new RegExp("^.{6,}$");

    if (re.test(passwordInput)) {
      setPasswordValidated(true);
    } else {
      setPasswordValidated(false);
    }
  };

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <form action={action} className="space-y-3">
      <h1 className="text-[2rem] font-bold text-center">Log In</h1>
      <div className="flex-1 rounded-lg form-amber p-8">
        <div className="w-full">
          <div>
            <label className="block font-bold" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email address"
                required
                onChange={emailOnChangeHandler}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-bold" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                autoComplete="current-password"
                required
                minLength={6}
                onChange={passwordOnChangeHandler}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {emailValidated && passwordValidated ? (
          <>
            <LoginButton className="btn btn-amber mt-6 animate-pulse">
              Log In
            </LoginButton>
          </>
        ) : (
          ""
        )}
        <div className="flex items-end ">
          {code === "CredentialSignin" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials
              </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

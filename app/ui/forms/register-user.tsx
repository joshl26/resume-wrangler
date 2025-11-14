"use client";

import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { SubmitButton } from "../submit-button";
import { CreateNewUser } from "@/app/lib/actions";
import {
  atLeastOneLowerCaseEnglishRegex,
  atLeastOneUpperCaseEnglishRegex,
  atLeastSixCharactersRegex,
  emailRegex,
  atLeastOneNumberZeroToNineRegex,
  passwordRegex,
  usernameRegex,
  lettersAndNumbersRegex,
  atLeastOneSpecialCharacterRegex,
  noWhiteSpaceRegex,
} from "@/app/lib/regex";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { signIn } from "next-auth/react";
import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

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
  const [showPassword, setShowPassword] = useState(false);

  const [sixCharacters, setSixCharacters] = useState(false);
  const [sixCharacters2, setSixCharacters2] = useState(false);

  const [oneLowerCaseEnglish, setOneLowerCaseEnglish] = useState(false);
  const [oneUpperCaseEnglish, setOneUpperCaseEnglish] = useState(false);
  const [onlyLettersAndNumbers, setOnlyLettersAndNumbers] = useState(false);
  const [oneNumber, setOneNumber] = useState(false);
  const [oneSpecialChar, setOneSpecialChar] = useState(false);
  const [noWhiteSpace, setNoWhiteSpace] = useState(false);

  const [oauthLoading, setOauthLoading] = useState(false);

  useEffect(() => {
    setFormValidated(usernameValidated && emailValidated && passwordValidated);
  }, [usernameValidated, emailValidated, passwordValidated]);

  const usernameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usernameInput = e.target.value;
    setUsername(usernameInput);

    const UserNameRegex = new RegExp(usernameRegex);
    setUsernameValidated(UserNameRegex.test(usernameInput));

    const SixCharactersRegex = new RegExp(atLeastSixCharactersRegex);
    setSixCharacters(SixCharactersRegex.test(usernameInput));

    const OnlyLettersAndNumbersRegex = new RegExp(lettersAndNumbersRegex);
    setOnlyLettersAndNumbers(OnlyLettersAndNumbersRegex.test(usernameInput));
  };

  const emailOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    const re = new RegExp(emailRegex);
    setEmailValidated(re.test(emailInput));
  };

  const passwordOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);

    const re = new RegExp(passwordRegex);
    setPasswordValidated(re.test(passwordInput));

    setOneUpperCaseEnglish(
      new RegExp(atLeastOneUpperCaseEnglishRegex).test(passwordInput),
    );
    setOneLowerCaseEnglish(
      new RegExp(atLeastOneLowerCaseEnglishRegex).test(passwordInput),
    );
    setOneNumber(
      new RegExp(atLeastOneNumberZeroToNineRegex).test(passwordInput),
    );
    setOneSpecialChar(
      new RegExp(atLeastOneSpecialCharacterRegex).test(passwordInput),
    );
    setSixCharacters2(
      new RegExp(atLeastSixCharactersRegex).test(passwordInput),
    );
    setNoWhiteSpace(new RegExp(noWhiteSpaceRegex).test(passwordInput));
  };

  function onClickHandler() {
    setShowPassword((s) => !s);
  }

  const handleCreate = async (formData: FormData): Promise<void> => {
    setError("");
    try {
      const result = await CreateNewUser(formData);
      if (result?.errors) {
        setError(result.message || "Validation failed");
      } else {
        setUsername("");
        setEmail("");
        setPassword("");
        setUsernameValidated(false);
        setEmailValidated(false);
        setPasswordValidated(false);
        setFormValidated(false);
      }
    } catch (err) {
      console.error("Unexpected error creating user:", err);
      setError("Unexpected error. Please try again.");
    }
  };

  const handleSignupWithGoogle = async () => {
    try {
      setError("");
      setOauthLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Failed to sign in with Google. Please try again.");
      setOauthLoading(false);
    }
  };

  return (
    <div className="flex-1 rounded-lg form-amber p-8 tight-shadow">
      <form action={handleCreate} className="space-y-3">
        {/* Username */}
        <div>
          <label className="block font-bold" htmlFor="username">
            Username
          </label>
          <div className="relative">
            <input
              id="username"
              disabled={pending || oauthLoading}
              name="username"
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              type="text"
              required
              placeholder="Choose a username"
              onChange={usernameOnChangeHandler}
              minLength={3}
              maxLength={20}
              value={username}
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {!usernameValidated && (
          <div className="validation-message">
            <p className="font-medium">A valid username will:</p>
            <ul>
              <li
                className={clsx(
                  "italic text-xs",
                  sixCharacters ? "text-emerald-400" : "text-rose-800",
                )}
              >
                - Have six to twenty characters
              </li>
              <li
                className={clsx(
                  "italic text-xs",
                  onlyLettersAndNumbers ? "text-emerald-400" : "text-rose-800",
                )}
              >
                - Contain only A-Z, a-z and 0-9 characters
              </li>
              <li
                className={clsx(
                  "italic text-xs",
                  onlyLettersAndNumbers ? "text-emerald-400" : "text-rose-800",
                )}
              >
                - Not contain spaces or special characters
              </li>
            </ul>
          </div>
        )}

        {/* Email */}
        {usernameValidated && (
          <div>
            <label className="block font-bold" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                disabled={pending || oauthLoading}
                name="email"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                type="email"
                required
                placeholder="you@company.com"
                onChange={emailOnChangeHandler}
                value={email}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        )}

        {/* Password */}
        {emailValidated && (
          <div>
            <label className="block font-bold" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                disabled={pending || oauthLoading}
                name="password"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-500"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Choose a strong password"
                onChange={passwordOnChangeHandler}
                minLength={6}
                maxLength={20}
                value={password}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              <button
                type="button"
                onClick={onClickHandler}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
        )}

        {/* Password validation */}
        {usernameValidated && emailValidated && !passwordValidated && (
          <div className="validation-message">
            <p className="font-medium">A valid password will:</p>
            <ul>
              <li
                className={clsx(
                  "italic text-xs",
                  oneUpperCaseEnglish ? "text-emerald-400" : "text-rose-800",
                )}
              >
                - Contain at least one upper case A-Z
              </li>
              <li
                className={clsx(
                  "italic text-xs",
                  oneLowerCaseEnglish ? "text-emerald-400" : "text-rose-800",
                )}
              >
                - Contain at least one lower case a-z
              </li>
              <li
                className={clsx(
                  "italic text-xs",
                  oneNumber ? "text-emerald-400" : "text-rose-800",
                )}
              >
                - At least one digit from 0-9
              </li>
              <li
                className={clsx(
                  "italic text-xs",
                  oneSpecialChar ? "text-emerald-400" : "text-rose-800",
                )}
              >
                - At least one special character
              </li>
              <li
                className={clsx(
                  "italic text-xs",
                  sixCharacters2 ? "text-emerald-400" : "text-rose-800",
                )}
              >
                - Minimum six, to max twenty characters
              </li>
            </ul>
          </div>
        )}

        {/* Submit */}
        {formValidated && (
          <SubmitButton
            disabled={pending || oauthLoading}
            className={clsx(
              "btn btn-amber mt-4 w-full",
              pending || oauthLoading ? "opacity-70 pointer-events-none" : "",
            )}
          >
            {pending || oauthLoading ? "Processing..." : "Register New User"}
          </SubmitButton>
        )}

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or sign up with</span>
          </div>
        </div>

        {/* OAuth */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleSignupWithGoogle}
            className={clsx(
              "flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              oauthLoading ? "opacity-70 pointer-events-none" : "",
            )}
            disabled={oauthLoading || pending}
          >
            {/* Google SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {oauthLoading ? "Opening Google..." : "Sign up with Google"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-3 flex items-start gap-2" aria-live="polite">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}

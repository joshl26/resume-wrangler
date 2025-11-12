// file: app/ui/forms/register-user.tsx
"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { SubmitButton } from "../submit-button";
import BackButton from "../back-button";
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
import Link from "next/link";
import AzureBlob from "../landing/azure-blob";
import OrangeBlob from "../landing/orange-blob";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { signIn } from "next-auth/react";

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
    if (usernameValidated && emailValidated && passwordValidated) {
      setFormValidated(true);
    } else {
      setFormValidated(false);
    }
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

  // Wrapper so form.action receives (formData: FormData) => void | Promise<void>
  const handleCreate = async (formData: FormData): Promise<void> => {
    setError("");
    try {
      const result = await CreateNewUser(formData);
      if (result?.errors) {
        // show the returned validation message (or a generic message)
        setError(result.message || "Validation failed");
      } else {
        // success — reset form and validation state
        setUsername("");
        setEmail("");
        setPassword("");
        setUsernameValidated(false);
        setEmailValidated(false);
        setPasswordValidated(false);
        setFormValidated(false);
        // optional: redirect or show a success toast
        // window.location.href = "/login";
      }
    } catch (err) {
      console.error("Unexpected error creating user:", err);
      setError("Unexpected error. Please try again.");
    }
  };

  // OAuth sign-up / sign-in with Google. Let NextAuth handle the redirect.
  const handleSignupWithGoogle = async () => {
    try {
      setError("");
      setOauthLoading(true);
      // Let NextAuth redirect to the provider (callbackUrl optional)
      await signIn("google", { callbackUrl: "/dashboard" });
      // Note: when signIn returns (it typically doesn't because NextAuth redirects),
      // if using redirect: false you'd need to handle res.url here.
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Failed to sign in with Google. Please try again.");
      setOauthLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col h-[92vh] justify-center overflow-x-hidden overflow-clip">
      <AzureBlob className="h-[750px] w-[750px] -z-1 -left-[500px]" />
      <OrangeBlob className="h-[750px] w-[750px] -z-1 -right-[600px]" />

      <div className="relative flex flex-col">
        <h1 className="text-center font-bold text-[2rem] py-4">
          New User Sign Up
        </h1>
        <div className="flex flex-row justify-around z-10">
          <form
            action={handleCreate}
            className="flex flex-col relative form-amber rounded-lg w-auto md:w-[450px] gap-2 tight-shadow p-10 mb-3"
          >
            <label className="font-bold" htmlFor="username">
              Username
            </label>
            <div className="flex flex-row items-center">
              <input
                disabled={pending || oauthLoading}
                name="username"
                className="border border-slate-300 rounded w-full"
                type="text"
                required
                placeholder="Type your Username"
                onChange={usernameOnChangeHandler}
                minLength={3}
                maxLength={20}
                value={username}
              />
            </div>
            {usernameValidated === false && (
              <div className="py-1 mt-2 bg-amber-50 tight-shadow p-2 rounded">
                <p className="font-medium">A valid username will:</p>
                <ul>
                  <li
                    className={clsx(
                      "italic font-lite",
                      sixCharacters ? "text-emerald-400" : " text-rose-800",
                    )}
                  >
                    - Have six to twenty characters
                  </li>
                  <li
                    className={clsx(
                      "italic font-lite",
                      onlyLettersAndNumbers
                        ? "text-emerald-400"
                        : " text-rose-800",
                    )}
                  >
                    - Contain only A-Z, a-z and 0-9 characters
                  </li>
                  <li
                    className={clsx(
                      "italic font-lite",
                      onlyLettersAndNumbers
                        ? "text-emerald-400"
                        : " text-rose-800",
                    )}
                  >
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
                  disabled={pending || oauthLoading}
                  name="email"
                  className="border border-slate-300 rounded w-full"
                  type="email"
                  required
                  placeholder="Type your email address"
                  onChange={emailOnChangeHandler}
                  value={email}
                />
              </>
            )}
            {emailValidated && (
              <>
                <label className="font-bold" htmlFor="email">
                  Password
                </label>
                <div className="">
                  <input
                    disabled={pending || oauthLoading}
                    name="password"
                    className="border border-slate-300 rounded w-full"
                    type={clsx(showPassword === true ? "text" : "password")}
                    required
                    placeholder="Type your password"
                    onChange={passwordOnChangeHandler}
                    minLength={6}
                    maxLength={20}
                    value={password}
                  />
                  <span className="absolute right-[52px] ">
                    {showPassword === false ? (
                      <FontAwesomeIcon
                        onClick={onClickHandler}
                        className="h-5 pt-3"
                        icon={faEye}
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={onClickHandler}
                        className="h-5 pt-3"
                        icon={faEyeSlash}
                      />
                    )}
                  </span>
                </div>
              </>
            )}
            {usernameValidated && emailValidated && !passwordValidated ? (
              <div className="py-1 mt-2 bg-amber-50 p-2 rounded tight-shadow">
                <p className="font-medium">A valid password will:</p>
                <ul className="font-lite italic">
                  <li
                    className={clsx(
                      "italic font-lite",
                      oneUpperCaseEnglish
                        ? "text-emerald-400"
                        : " text-rose-800",
                    )}
                  >
                    - Contain at least one upper case A-Z
                  </li>
                  <li
                    className={clsx(
                      "italic font-lite",
                      oneLowerCaseEnglish
                        ? "text-emerald-400"
                        : " text-rose-800",
                    )}
                  >
                    - Contain at least one lower case a-z
                  </li>
                  <li
                    className={clsx(
                      "italic font-lite",
                      oneNumber ? "text-emerald-400" : " text-rose-800",
                    )}
                  >
                    - At least one digit from 0-9
                  </li>
                  <li
                    className={clsx(
                      "italic font-lite",
                      oneSpecialChar ? "text-emerald-400" : " text-rose-800",
                    )}
                  >
                    - At least one special character
                  </li>
                  <li
                    className={clsx(
                      "italic font-lite",
                      sixCharacters2 ? "text-emerald-400" : " text-rose-800",
                    )}
                  >
                    - Minimum six, to max twenty characters
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}

            {formValidated && (
              <>
                <SubmitButton
                  disabled={pending || oauthLoading}
                  className="btn btn-amber mt-4 mb-2 animate-pulse"
                >
                  Register New User
                </SubmitButton>
              </>
            )}

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Google Sign-up Button */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSignupWithGoogle}
                className={`flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  oauthLoading ? "opacity-70 pointer-events-none" : ""
                }`}
                disabled={oauthLoading || pending}
              >
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

            {error && <p className="text-rose-700 mt-2">{error}</p>}
          </form>
        </div>
        <div className="flex flex-row m-auto">
          <p className="py-2 font-bold">
            Returning user?{" "}
            <Link
              className="font-medium text-rose-800 hover:text-azure-radiance-500"
              href="/login"
            >
              Sign In
            </Link>{" "}
          </p>
        </div>
        <BackButton className="text-center" href={"/"}>
          Back
        </BackButton>
      </div>
    </div>
  );
}

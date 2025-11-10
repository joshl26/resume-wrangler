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

  useEffect(() => {
    if (usernameValidated && emailValidated && passwordValidated) {
      setFormValidated(true);
    } else {
      setFormValidated(false);
    }
  }, [usernameValidated, emailValidated, passwordValidated]);

  const usernameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var usernameInput = e.target.value;

    setUsername(usernameInput);

    var UserNameRegex = new RegExp(usernameRegex);

    if (UserNameRegex.test(usernameInput)) {
      setUsernameValidated(true);
    } else {
      setUsernameValidated(false);
    }

    var SixCharactersRegex = new RegExp(atLeastSixCharactersRegex);

    if (SixCharactersRegex.test(usernameInput)) {
      setSixCharacters(true);
    } else {
      setSixCharacters(false);
    }

    var OnlyLettersAndNumbersRegex = new RegExp(lettersAndNumbersRegex);

    if (OnlyLettersAndNumbersRegex.test(usernameInput)) {
      setOnlyLettersAndNumbers(true);
    } else {
      setOnlyLettersAndNumbers(false);
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

    var OneUpperCaseEnglishRegex = new RegExp(atLeastOneUpperCaseEnglishRegex);

    if (OneUpperCaseEnglishRegex.test(passwordInput)) {
      setOneUpperCaseEnglish(true);
    } else {
      setOneUpperCaseEnglish(false);
    }

    var OneLowerCaseEnglishRegex = new RegExp(atLeastOneLowerCaseEnglishRegex);

    if (OneLowerCaseEnglishRegex.test(passwordInput)) {
      setOneLowerCaseEnglish(true);
    } else {
      setOneLowerCaseEnglish(false);
    }

    var OneNumberRegex = new RegExp(atLeastOneNumberZeroToNineRegex);

    if (OneNumberRegex.test(passwordInput)) {
      setOneNumber(true);
    } else {
      setOneNumber(false);
    }

    var OneSpecialCharRegex = new RegExp(atLeastOneSpecialCharacterRegex);

    if (OneSpecialCharRegex.test(passwordInput)) {
      setOneSpecialChar(true);
    } else {
      setOneSpecialChar(false);
    }

    var SixCharactersRegex = new RegExp(atLeastSixCharactersRegex);

    if (SixCharactersRegex.test(passwordInput)) {
      setSixCharacters2(true);
    } else {
      setSixCharacters2(false);
    }

    var NoWhiteSpaceRegex = new RegExp(noWhiteSpaceRegex);

    if (NoWhiteSpaceRegex.test(passwordInput)) {
      setNoWhiteSpace(true);
    } else {
      setNoWhiteSpace(false);
    }
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
                disabled={pending}
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
                  disabled={pending}
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
                    disabled={pending}
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
                        className="h-[20px] pt-3"
                        icon={faEye}
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={onClickHandler}
                        className="h-[20px] pt-3"
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
                  disabled={pending}
                  className="btn btn-amber mt-4 mb-2 animate-pulse"
                >
                  Register New User
                </SubmitButton>
              </>
            )}
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

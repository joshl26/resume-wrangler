"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import FormAnimation from "@/public/lottie/form.json";
import SkillsAnimation from "@/public/lottie/skills.json";
import SubmissionAnimation from "@/public/lottie/submission.json";
import OrangeBlob from "./orange-blob";
import PurpleBlob from "./purple-blob";

const LandingThree = () => {
  return (
    <div className="w-full pb-24 relative">
      <PurpleBlob
        className={"h-[750px] w-[750px] absolute -left-[300px] -top-[300px] "}
      />
      <OrangeBlob
        className={
          "h-[750px] w-[750px] absolute -right-[300px] -bottom-[300px] "
        }
      />

      <div className="flex flex-row justify-center pt-20 relative">
        <h2 className="font-bold text-center text-[1.25rem]">How it works</h2>
      </div>
      <div className="flex flex-row justify-center pt-8 relative">
        <h2 className="font-medium text-center p-2 text-[3rem]">
          Our software is extremely easy to use.
        </h2>
      </div>
      <div className="flex flex-row gap-6 flex-wrap max-w-screen-xl m-auto justify-between pt-8 relative">
        <div className="flex flex-col m-auto max-w-[300px]">
          <h2 className="font-medium text-center text-[3rem]">1</h2>
          <Lottie
            animationData={FormAnimation}
            className="flex justify-center items-center"
            loop={true}
          />
          <p className="text-center font-medium text-xl">
            Register your account on our website, all you need is a valid email
            address.
          </p>
        </div>
        <div className="flex flex-col m-auto max-w-[300px] justify-start relative">
          <h2 className="font-medium text-center text-[3rem]">2</h2>
          <Lottie
            animationData={SkillsAnimation}
            className="flex justify-center items-center pt-14"
            loop={true}
          />
          <p className="text-center font-medium text-xl">
            Add previous work experiences, skills, education and much more. All
            your details are saved for future visits!
          </p>
        </div>
        <div className="flex flex-col m-auto max-w-[300px] relative">
          <h2 className="font-medium text-center text-[3rem]">3</h2>
          <Lottie
            animationData={SubmissionAnimation}
            className="flex justify-center items-center "
            loop={true}
          />
          <p className="text-center font-medium text-xl">
            Build and submit your perfect resume from our list of curated
            templates!
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-6 flex-wrap max-w-screen-xl m-auto justify-center pt-32 relative">
        <Link
          href="/register"
          className="rounded-full border border-black hover:bg-white hover:text-black  hover:border-amber-400 bg-amber-400 px-6 py-3 font-medium "
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default LandingThree;

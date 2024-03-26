import React from "react";
import Image from "next/image";
import Link from "next/link";

const LandingThree = () => {
  return (
    <div className="w-full pb-24">
      <div className="flex flex-row justify-center pt-20">
        <h2 className="font-bold text-center  text-[1.25rem]">How it works</h2>
      </div>
      <div className="flex flex-row justify-center pt-8">
        <h2 className="font-medium text-center  text-[3rem]">
          Our software is extremely easy to use.
        </h2>
      </div>
      <div className="flex flex-row gap-6 flex-wrap max-w-screen-xl m-auto justify-between pt-8">
        <div className="flex flex-col m-auto max-w-[300px]">
          <h2 className="font-medium text-center text-[3rem]">1</h2>
          <p className="text-center">
            Register your account on our website, all you need is a valid email
            address.
          </p>
        </div>
        <div className="flex flex-col m-auto max-w-[300px]">
          <h2 className="font-medium text-center text-[3rem]">2</h2>
          <p className="text-center">
            add previous work experiences, skills, education and much more.
          </p>
        </div>
        <div className="flex flex-col m-auto max-w-[300px]">
          <h2 className="font-medium text-center text-[3rem]">3</h2>
          <p className="text-center">
            Build your perfect resume from a list of curated templates!
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-6 flex-wrap max-w-screen-xl m-auto justify-center pt-32">
        <Link
          href="/register"
          className="rounded-full border hover:bg-white hover:text-black  hover:border-amber-400 bg-amber-400 px-6 py-3 font-medium text-white"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default LandingThree;

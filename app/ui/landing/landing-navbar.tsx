import Image from "next/image";
import React from "react";
import ResumeWranglerIcon from "/public/ResumeWranglerLogo-white.png";
import Link from "next/link";

const LandingNavBar = () => {
  return (
    <nav className=" bg-amber-50 z-10 flex fixed opacity-100 t-0 w-screen items-center justify-between flex-wrap p-2">
      <div className="max-w-screen-xl w-full flex m-auto">
        <div className="flex items-center flex-shrink-0 mr-6 ">
          <div className="w-[50px] h-[50px]">
            <Image
              className="rounded"
              width={100}
              height={100}
              alt=""
              src={ResumeWranglerIcon}
            />
          </div>
          <span className="font-semibold text-xl tracking-tight ml-4 w-[100px]">
            Resume Wrangler
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="/resume-templates"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400 mr-4"
            >
              Resume Templates
            </a>
            <a
              href="/features"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400 mr-4"
            >
              Features
            </a>
            <a
              href="/blog"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400"
            >
              Blog
            </a>
          </div>
          <div className="invisible lg:visible">
            <div className="flex flex-row justify-end gap-2">
              <Link
                href="/register"
                className="w-auto rounded-full bg-amber-50 hover:text-rose-400 px-6 py-3"
              >
                Create Account
              </Link>
              <Link
                href="/login"
                className="rounded-full border hover:bg-white hover:text-black  hover:border-rose-400 bg-rose-600 px-6 py-3 font-medium text-white"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded  border-black hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavBar;

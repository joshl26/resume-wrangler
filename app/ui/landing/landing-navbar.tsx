"use client";

import Image from "next/image";
import React, { useState } from "react";
import ResumeWranglerIcon from "/public/ResumeWranglerLogo-white.png";
import Link from "next/link";

const LandingNavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className=" bg-amber-50 flex fixed opacity-100 t-0 w-screen items-center justify-between flex-wrap p-2 z-40">
      <div className="max-w-screen-xl w-full flex flex-row items-center justify-between m-auto">
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
        </div>
        <div className="w-full hidden flex-grow lg:flex lg:items-center lg:w-auto md:visible">
          <div className="text-sm lg:flex-grow">
            {/* <Link
              href="/resume-templates"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400 mr-4"
            >
              Resume Templates
            </Link>
            <Link
              href="/features"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400 mr-4"
            >
              Features
            </Link>
            <Link
              href="/blog"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400"
            >
              Blog
            </Link> */}
          </div>
          <div className="invisible lg:visible">
            <div className="flex flex-row justify-end gap-2">
              <Link
                href="/login"
                className="w-auto rounded-full bg-amber-50 hover:text-rose-400 px-6 py-3"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full border hover:bg-white hover:text-black  hover:border-amber-400 bg-amber-400 px-6 py-3 font-medium text-white"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={(e) => setShowMenu(showMenu === false ? true : false)}
            className="flex items-center px-3 py-2 border rounded  border-black hover:text-azure-radiance-900 hover:border-azure-radiance-900"
          >
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

      {showMenu && (
        <div className="w-full block lg:hidden p-2 mb-2">
          <div className="text-sm lg:flex-grow">
            <Link
              href="/resume-templates"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400 mr-4"
            >
              Resume Templates
            </Link>
            <Link
              href="/features"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400 mr-4"
            >
              Features
            </Link>
            <Link
              href="/blog"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400"
            >
              Blog
            </Link>
            <Link
              href="/login"
              className="block w-[100px] rounded-full mt-4 hover:text-rose-400 "
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="block w-fit rounded-full mt-4 border hover:bg-white hover:text-black  hover:border-amber-400 bg-amber-400 px-6 py-3 font-medium text-white"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavBar;

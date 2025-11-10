"use client";

import Image from "next/image";
import React, { useState } from "react";
import ResumeWranglerIcon from "@/public/images/ResumeWranglerLogo-white.png";
import Link from "next/link";

const LandingNavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className=" bg-amber-50 flex fixed opacity-100 t-0 w-screen items-center justify-between flex-wrap p-2 z-40">
      <div className="max-w-screen-xl w-full flex flex-row items-center justify-between m-auto">
        <div className="flex items-center flex-shrink-0 mr-6 ">
          <Link aria-label="home" href="/" className="w-[50px] h-[50px]">
            <Image
              className="rounded"
              width={100}
              height={100}
              alt=""
              src={ResumeWranglerIcon}
            />
          </Link>
        </div>
        <div className="w-full hidden flex-grow lg:flex lg:items-center lg:w-auto md:visible">
          <div className="text-sm lg:flex-grow">
            <Link
              aria-label="resume templates"
              href="/resume-templates"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400 mr-4"
            >
              Resume Templates
            </Link>
            <Link
              aria-label="job boards"
              href="/job-boards"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400 mr-4"
            >
              Job Boards
            </Link>
            <Link
              aria-label="blog"
              href="/blog"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400"
            >
              Blog
            </Link>
          </div>
          <div className="invisible lg:visible">
            <div className="flex flex-row justify-end gap-2">
              <Link
                aria-label="login"
                href="/login"
                className="w-auto rounded-full bg-amber-50 hover:text-rose-400 px-6 py-3"
              >
                Log in
              </Link>
              <Link
                aria-label="register"
                href="/register"
                className="rounded-full px-6 py-3 btn btn-amber border-none bg-amber-400 "
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
        <div className="block lg:hidden">
          <button
            title="menu-button"
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
              aria-label="resume templates"
              href="/resume-templates"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400 mr-4"
            >
              Resume Templates
            </Link>
            {/* <Link
              href="/features"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400 mr-4"
            >
              Features
            </Link> */}
            <Link
              aria-label="blog"
              href="/blog"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-rose-400"
            >
              Blog
            </Link>
            <Link
              aria-label="login"
              href="/login"
              className="block w-[100px] rounded-full mt-4 hover:text-rose-400 "
            >
              Log in
            </Link>
            <Link
              aria-label="register"
              href="/register"
              className="btn btn-amber block w-fit rounded-full mt-4 border  px-6 py-3 font-medium "
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

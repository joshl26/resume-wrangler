import Image from "next/image";
import React from "react";
import ResumeWranglerIcon from "/public/ResumeWranglerLogo-white.png";
import Link from "next/link";

const LandingNavBar = () => {
  return (
    <nav className="flex  items-center justify-between flex-wrap bg-gray-100 p-6">
      <div className="max-w-screen-xl h-10 w-full flex m-auto">
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
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4"
            >
              Docs
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4"
            >
              Examples
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-white"
            >
              Blog
            </a>
          </div>
          <div className="invisible lg:visible">
            <div className="flex flex-row justify-end gap-2">
              <Link
                href="/register"
                className="w-auto rounded-full bg-gray-50 px-6 py-3  "
              >
                Create Account
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-rose-600 px-6 py-3 font-medium text-white"
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

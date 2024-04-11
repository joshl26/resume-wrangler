import React from "react";
import Logo from "/public/ResumeWranglerLogo.svg";
import Image from "next/image";
import Link from "next/link";

const LandingFooter = () => {
  return (
    <footer className="shadow bg-azure-radiance-900 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image alt="" width={100} height={100} src={Logo} />
            <span className="self-center text-5xl font-semibold whitespace-nowrap dark:text-white">
              Resume <br></br>Wrangler
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/blog" className="hover:underline me-4 md:me-6">
                Blog
              </a>
            </li>
            {/* <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li> */}
            <li>
              <a
                href="mailto:joshlehman.dev@gmail.com"
                className="hover:underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://joshlehman.ca/" className="hover:underline">
            Blackrock Design Haus
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default LandingFooter;

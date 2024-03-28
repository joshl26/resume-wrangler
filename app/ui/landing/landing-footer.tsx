import React from "react";
import Logo from "/public/ResumeWranglerLogo.svg";
import Image from "next/image";
import Link from "next/link";

const LandingFooter = () => {
  return (
    <footer className="  shadow bg-azure-radiance-900 ">
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
              <a href="#" className="hover:underline me-4 md:me-6">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Blackrock Design Haus
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
    // <footer className="bg-azure-radiance-900 w-screen h-[20vh]">
    //   <div className="flex flex-row max-w-screen-xl m-auto h-full text-white">
    //     <div className="flex flex-col w-1/3 m-auto ">
    //       <div className="flex flex-row flex-wrap py-1">
    //         <div className="flex flex-col w-[50px] h-[50px] m-auto">
    //           <Image alt="" width={100} height={100} src={Logo} />
    //         </div>
    //         <div className="flex flex-col w-3/4 m-auto">
    //           <h2 className="text-[0.5rem] md:text-[2.5rem] sm:w-auto leading-none">
    //             Resume Wrangler
    //           </h2>
    //           <h2 className="text-[0.5rem] sm:text-[1.25rem] sm:w-auto">
    //             <a href="https://www.joshlehman.ca">
    //               Blackrock Design Haus, Toronto CA
    //             </a>
    //           </h2>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex flex-col w-1/3 my-auto ">
    //       <div className="flex flex-row">
    //         <h2 className="text-[0.75rem] sm:text-[2rem]">Socials</h2>
    //       </div>
    //       <div className="flex flex-row">
    //         <h2 className="text-[0.75rem] sm:text-[1.5rem]">
    //           <a href="https://linkedin.com">LinkedIn</a>
    //         </h2>
    //       </div>
    //       <div className="flex flex-row">
    //         <h2 className="text-[0.75rem] sm:text-[1.5rem]">
    //           <a href="https://twitter.com">Twitter</a>
    //         </h2>
    //       </div>
    //     </div>
    //     <div className="flex flex-col w-1/3 my-auto ">
    //       <div className="flex flex-row">
    //         <h2 className="text-[0.75rem] sm:text-[2rem]">Links</h2>
    //       </div>
    //       <div className="flex flex-row">
    //         <p className="text-[0.75rem] sm:text-[1.5rem]">
    //           <Link href={"/register"}>Create Account</Link>
    //         </p>
    //       </div>
    //       <div className="flex flex-row">
    //         <p className="text-[0.75rem] sm:text-[1.5rem]">
    //           <Link href={"/login"}>Log In</Link>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
  );
};

export default LandingFooter;

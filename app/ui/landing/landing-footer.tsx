import React from "react";
import Logo from "/public/ResumeWranglerLogo.svg";
import Image from "next/image";

const LandingFooter = () => {
  return (
    <footer className="bg-azure-radiance-900 w-screen h-[20vh]">
      <div className="flex flex-row max-w-screen-xl m-auto h-full text-white">
        <div className="m-auto pl-2 sm:w-[150px] w-[75px]">
          <Image alt="" width={125} height={125} src={Logo} />
        </div>
        <div className="flex flex-col my-auto pl-4">
          <div className="flex flex-row py-1">
            <h2 className="text-[1.25rem] md:text-[2.5rem] w-[100px] sm:w-auto leading-none">
              Resume Wrangler
            </h2>
          </div>
          <div className="flex flex-row py-1">
            <h2 className="text-[0.5rem] sm:text-[1.25rem] w-[100px] sm:w-auto">
              Blackrock Design Haus, Toronto CA
            </h2>
          </div>
        </div>
        <div className="flex flex-col m-auto justify-between">
          <div className="flex flex-row">
            <h2 className="text-[0.75rem] sm:text-[2rem]">Socials</h2>
          </div>
          <div className="flex flex-row">
            <h2 className="text-[0.75rem] sm:text-[1.5rem]">LinkedIn</h2>
          </div>
          <div className="flex flex-row">
            <h2 className="text-[0.75rem] sm:text-[1.5rem]">Twitter</h2>
          </div>
        </div>
        <div className="flex flex-col m-auto">
          <div className="flex flex-row">
            <h2 className="text-[0.75rem] sm:text-[2rem]">Links</h2>
          </div>
          <div className="flex flex-row">
            <p className="text-[0.75rem] sm:text-[1.5rem]">Create Account</p>
          </div>
          <div className="flex flex-row">
            <p className="text-[0.75rem] sm:text-[1.5rem]">Sign In</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;

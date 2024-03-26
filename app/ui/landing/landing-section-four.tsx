import React from "react";
import Image from "next/image";


const LandingFour = () => {
  return (
    <div className="h-[2000px] w-full left-0 bg-gradient-harvest pb-24">
      <div className="flex flex-row justify-center m-auto w-full pt-20">
        <div className="flex flex-col">
          <h2 className="text-white font-medium text-[2rem]">
            Go, ResumeWranglerLogo your dream career!
          </h2>
        </div>
      </div>
      <div className="flex flex-row flex-wrap max-w-screen-xl items-center m-auto justify-center  gap-10 pt-32">
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px] bg-white"></div>
          <Image alt="" src={""} />
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px] bg-white"></div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px] bg-white"></div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px] bg-white"></div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px] bg-white"></div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingFour;

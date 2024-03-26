import React from "react";
import Lasso from "/public/LassoBlack.svg";
import Image from "next/image";

const LandingOne = () => {
  return (
    <div className="max-w-screen-xl m-auto">
      <div className="flex flex-row items-center pt-32 pb-20">
        <div className="flex flex-col w-1/2 ">
          <Image className="mx-auto" alt="" src={Lasso} />
        </div>
        <div className="flex flex-col w-1/2">
          <h1 className="text-[6rem] font-bold leading-tight">
            Tame your Job Search.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LandingOne;

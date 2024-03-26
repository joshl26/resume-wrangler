import React from "react";
import Lasso from "/public/LassoBlack.svg";
import Image from "next/image";
import RoseBlob from "./rose-blob";
import AzureBlob from "./azure-blob";

const LandingOne = () => {
  return (
    <div className="relative max-w-screen-xl m-auto min-h-[95vh]">
      <RoseBlob
        className={"h-[750px] w-[750px] -bottom-[300px] -left-[400px] "}
      />
      <AzureBlob
        className={"h-[750px] w-[750px] -top-[300px] -right-[400px] "}
      />
      <div className="relative flex flex-row items-center pt-[5vh] z-10 max-w-screen-xl min-h-[95vh]">
        <div className="flex flex-col w-1/2 ">
          <Image className="mx-auto" alt="" src={Lasso} />
        </div>
        <div className="flex flex-col w-1/2">
          <h1 className="text-[3rem]  sm:text-[4rem] md:text-[6rem] pl-2  font-bold leading-tight ">
            Tame your Job Search.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LandingOne;

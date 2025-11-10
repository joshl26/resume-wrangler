import React from "react";
import Finance from "@/public/images/finance.svg";
import Graph from "@/public/images/graph.svg";
import Megaphone from "@/public/images/megaphone.svg";
import Handshake from "@/public/images/handshake.svg";
import Rocket from "@/public/images/rocket.svg";
import Ai from "@/public/images/ai.svg";

const LandingFour = () => {
  return (
    <div className="w-full left-0 bg-gradient-harvest pb-24 relative">
      <div className="flex flex-row justify-center m-auto w-full pt-20">
        <div className="flex flex-col">
          <h2 className="text-white font-medium text-[1.25rem] text-center p-2">
            Wrangle your dream career!
          </h2>
        </div>
      </div>
      <div className="flex flex-row justify-center max-w-(--breakpoint-xl) text-center m-auto w-full pt-20">
        <div className="flex flex-col">
          <h2 className="text-white font-medium text-[3rem] p-2">
            We have all the tools you need to make it happen!
          </h2>
        </div>
      </div>
      <div className="flex flex-row flex-wrap max-w-(--breakpoint-xl) items-center m-auto justify-center  gap-10 pt-32">
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Graph className="w-[200px] h-auto m-auto" alt="" />
            <p className="text-center text-[2rem] text-white">
              Achieve results.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Finance className="w-[175px] h-auto m-auto" alt="" />
            <p className="text-center text-[2rem] text-white">
              Increase your net value.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Megaphone className="w-[175px] h-auto m-auto" alt="" />
            <p className="text-center text-[2rem] text-white">
              Market your skills.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Handshake className="w-[175px] h-auto m-auto" alt="" />
            <p className="text-center text-[2rem] text-white">
              Connect with the right people.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Rocket className="w-[175px] h-auto m-auto" alt="" />
            <p className="text-center text-[2rem] text-white">
              Launch your career with us.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Ai className="w-[175px] h-auto m-auto" alt="" />
            <p className="text-center text-[2rem] text-white">
              Harness the power of our Ai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFour;

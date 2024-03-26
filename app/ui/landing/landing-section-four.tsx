import React from "react";
import Image from "next/image";
import Finance from "/public/finance.svg";
import Graph from "/public/graph.svg";
import Megaphone from "/public/megaphone.svg";
import Handshake from "/public/handshake.svg";
import Rocket from "/public/rocket.svg";
import Ai from "/public/ai.svg";

const LandingFour = () => {
  return (
    <div className="w-full left-0 bg-gradient-harvest pb-24">
      <div className="flex flex-row justify-center m-auto w-full pt-20">
        <div className="flex flex-col">
          <h2 className="text-white font-medium text-[2rem]">
            Go, wrangle your dream career!
          </h2>
        </div>
      </div>
      <div className="flex flex-row justify-center max-w-screen-xl text-center m-auto w-full pt-20">
        <div className="flex flex-col">
          <h2 className="text-white font-medium text-[4rem]">
            We have all the tools you need to make it happen!
          </h2>
        </div>
      </div>
      <div className="flex flex-row flex-wrap max-w-screen-xl items-center m-auto justify-center  gap-10 pt-32">
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Image className="w-[200px] h-auto m-auto" alt="" src={Graph} />
            <p className="text-center text-[2rem]">
              Achieve results in your job search.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Image className="w-[175px] h-auto m-auto" alt="" src={Finance} />
            <p className="text-center text-[2rem]">Increase your net value.</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Image className="w-[175px] h-auto m-auto" alt="" src={Megaphone} />
            <p className="text-center text-[2rem]">Market your skills.</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Image className="w-[175px] h-auto m-auto" alt="" src={Handshake} />
            <p className="text-center text-[2rem]">
              Connect with the right people.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Image className="w-[175px] h-auto m-auto" alt="" src={Rocket} />
            <p className="text-center text-[2rem]">
              Launch your career with us.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[300px] w-[300px]  p-6">
            <Image className="w-[175px] h-auto m-auto" alt="" src={Ai} />
            <p className="text-center text-[2rem]">
              Harness the power of our Ai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFour;

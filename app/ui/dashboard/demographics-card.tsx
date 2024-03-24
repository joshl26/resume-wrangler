import Image from "next/image";
import React from "react";
import Demographics from "/public/graphs/MapChart.png";

const DemographicsCard = () => {
  return (
    <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-1/2 h-[275px] bg-white rounded-xl">
      <h2 className="font-bold p-2">Demographics</h2>
      <div className="flex flex-row">
        <div className="w-full h-[200px]">
          <Image
            className="h-full w-auto m-auto"
            width={0}
            height={0}
            alt=""
            src={Demographics}
          />
        </div>
      </div>

      {/* <WorldMap /> */}
    </div>
  );
};

export default DemographicsCard;

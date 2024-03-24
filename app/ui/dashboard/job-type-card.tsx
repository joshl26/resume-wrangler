import React from "react";
import PieChart from "/public/graphs/PieChart.png";
import Image from "next/image";

const JobTypeCard = () => {
  return (
    <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-1/4 h-[250px] bg-white rounded-xl">
      <h2 className="font-bold p-2">Job Type</h2>
      <div className="flex flex-row">
        <div className="w-full h-[200px]">
          <Image
            className="h-full w-auto m-auto"
            width={0}
            height={0}
            alt=""
            src={PieChart}
          />
        </div>
      </div>
    </div>
  );
};

export default JobTypeCard;

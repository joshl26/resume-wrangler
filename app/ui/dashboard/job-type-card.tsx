import React from "react";
import PieChart from "/public/graphs/PieChart.png";
import Image from "next/image";
import DonutChart from "../charts/donut-chart";

const JobTypeCard = () => {
  return (
    <div className=" w-1/4 h-[250px] bg-white rounded-xl">
      <h2 className="font-bold p-2">Job Type</h2>
      <DonutChart />
      {/* <Image
            className="h-full w-auto m-auto"
            width={0}
            height={0}
            alt=""
            src={PieChart}
          /> */}
    </div>
  );
};

export default JobTypeCard;

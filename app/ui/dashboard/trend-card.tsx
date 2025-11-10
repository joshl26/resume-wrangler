import Image from "next/image";
import React from "react";
import BarChart from "@/app/ui/charts/barchart";

const TrendCard = () => {
  return (
    <div className="tour-trend w-full h-[250px] m-auto bg-white rounded-lg tight-shadow">
      <h2 className="font-bold p-2">Demographics</h2>
      <BarChart />
      {/* <div className="flex flex-row justify-between">
        <h2 className="font-bold p-2">Trend</h2>
        <div className="relative h-auto w-[125px] m-4">
          <select className="h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  empty:bg-gray-900! focus:border-2 focus:border-gray-900  ">
            <option value="this-week">This Week</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="today">Today</option>
          </select>
        </div>
      </div> */}

      <div className="flex flex-row">
        {/* <div className="w-full h-[175px]">
          <Image
            className="h-full w-auto m-auto"
            width={0}
            height={0}
            alt=""
            src={BarChart}
          />
        </div> */}
      </div>
    </div>
  );
};

export default TrendCard;

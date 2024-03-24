import Image from "next/image";
import React from "react";

const TrendCard = () => {
  return (
    <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-1/2 h-[250px] bg-white rounded-xl">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold p-2">Trend</h2>
        <div className="relative h-auto w-[125px] m-4">
          <select className="h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  empty:!bg-gray-900 focus:border-2 focus:border-gray-900  ">
            <option value="this-week">This Week</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="today">Today</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row">
        <div>
          <Image
            width={50}
            height={50}
            alt=""
            src="/public/graphs/BarChart.png"
          />
        </div>
      </div>
    </div>
  );
};

export default TrendCard;

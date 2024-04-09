import React from "react";
import DonutChart from "../charts/donut-chart";

const JobTypeCard = () => {
  return (
    <div className="tour-status w-1/4 h-[250px] bg-white rounded-xl tight-shadow">
      <h2 className="font-bold p-2">Status</h2>
      <DonutChart />
    </div>
  );
};

export default JobTypeCard;

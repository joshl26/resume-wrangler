import React from "react";
import BarChart from "@/app/ui/charts/barchart";
import ErrorBoundary from "../ErrorBoundary";

const TrendCard = () => {
  return (
    <div className="tour-trend w-full h-[250px] m-auto bg-white rounded-lg tight-shadow">
      <h2 className="font-bold p-2">Demographics</h2>
      <ErrorBoundary>
        <BarChart />
      </ErrorBoundary>
    </div>
  );
};

export default TrendCard;

import React from "react";
import DonutChart from "../charts/donut-chart";

const JobTypeCard = ({
  openApplicationsCount,
  closedApplicationsCount,
  pendingApplicationsCount,
}: {
  openApplicationsCount: number;
  closedApplicationsCount: number;
  pendingApplicationsCount: number;
}) => {
  return (
    <div className="tour-status w-full h-[250px] bg-white rounded-lg tight-shadow">
      <h2 className="font-bold p-2">Status</h2>
      <DonutChart
        openApplicationsCount={openApplicationsCount}
        closedApplicationsCount={closedApplicationsCount}
        pendingApplicationsCount={pendingApplicationsCount}
      />
    </div>
  );
};

export default JobTypeCard;

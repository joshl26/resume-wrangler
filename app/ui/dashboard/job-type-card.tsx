import React from "react";
import DonutChart from "../charts/donut-chart";

const JobTypeCard = ({
  openApplicationsCount,
  closedApplicationsCount,
  pendingApplicationsCount,
}: {
  openApplicationsCount: any;
  closedApplicationsCount: any;
  pendingApplicationsCount: any;
}) => {
  return (
    <div className="tour-status w-1/4 h-[250px] bg-white rounded-xl tight-shadow">
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

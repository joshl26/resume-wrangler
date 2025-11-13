import { Applications, User } from "@/app/lib/definitions";

import React from "react";
import TrendCard from "./trend-card";
import JobTypeCard from "./job-type-card";
import ResponsesCard from "./responses-card";
import ApplicationsCard from "./applications-card";
import DemographicsCard from "./demographics-card";
import OpenApplicationsCount from "./open-applications-count";
import ClosedApplicationsCount from "./closed-applications-count";
import PendingApplicationsCount from "./pending-applications-count";
import PendingWeeklyGoalCount from "./weekly-goal";


const Dashboard = ({
  applications,
  user,
  openApplicationsCount,
  closedApplicationsCount,
  pendingApplicationsCount,
}: {
  applications: Applications;
  user: User;
  openApplicationsCount: any;
  closedApplicationsCount: any;
  pendingApplicationsCount: any;
}) => {
  console.log(user);
  return (
    <div className="w-full h-full mt-1">
      <div className="flex flex-row gap-4 px-4 pb-4 ">
        <OpenApplicationsCount openApplicationsCount={openApplicationsCount} />
        <ClosedApplicationsCount
          closedApplicationsCount={closedApplicationsCount}
        />
        <PendingApplicationsCount
          pendingApplicationsCount={pendingApplicationsCount}
        />
        <PendingWeeklyGoalCount weeklyGoalCount={3} />
      </div>
      <div className="flex flex-row gap-4 px-4">
        <TrendCard />
        <JobTypeCard
          openApplicationsCount={openApplicationsCount}
          closedApplicationsCount={closedApplicationsCount}
          pendingApplicationsCount={pendingApplicationsCount}
        />
        {/* <ResponsesCard /> */}
      </div>
      <div className="flex flex-row gap-4 px-4 pt-4">
        <ApplicationsCard applications={applications} />
        <DemographicsCard />
      </div>
    </div>
  );
};

export default Dashboard;

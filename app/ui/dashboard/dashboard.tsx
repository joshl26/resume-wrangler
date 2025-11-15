import { Applications, User } from "@/app/lib/definitions";

import React from "react";
import TrendCard from "./trend-card";
import JobTypeCard from "./job-type-card";
import ApplicationsCard from "./applications-card";
import DemographicsCard from "./demographics-card";
import OpenApplicationsCount from "./open-applications-count";
import ClosedApplicationsCount from "./closed-applications-count";
import PendingApplicationsCount from "./pending-applications-count";
import PendingWeeklyGoalCount from "./weekly-goal";

interface DashboardProps {
  applications: Applications;
  user: User;
  openApplicationsCount?: number | string | null;
  closedApplicationsCount?: number | string | null;
  pendingApplicationsCount?: number | string | null;
}

/**
 * Coerce incoming count values (number | string | null | undefined)
 * to a safe finite number (fallback 0).
 */
const toNumber = (value?: number | string | null): number => {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
};

const Dashboard = ({
  applications,
  user,
  openApplicationsCount,
  closedApplicationsCount,
  pendingApplicationsCount,
}: DashboardProps) => {
  // Normalize counts so child components always receive numbers
  const openCount = toNumber(openApplicationsCount);
  const closedCount = toNumber(closedApplicationsCount);
  const pendingCount = toNumber(pendingApplicationsCount);

  // Ensure we always pass an array to ApplicationsCard
  const safeApplications: Applications = Array.isArray(applications)
    ? (applications as Applications)
    : ([] as Applications);

  return (
    <div
      className="w-full h-full mt-1"
      role="region"
      aria-label={`${user?.name ?? "User"} dashboard`}
    >
      {/* Top summary: responsive grid for better layout on small screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 pb-4">
        <OpenApplicationsCount openApplicationsCount={openCount} />
        <ClosedApplicationsCount closedApplicationsCount={closedCount} />
        <PendingApplicationsCount pendingApplicationsCount={pendingCount} />
        <PendingWeeklyGoalCount weeklyGoalCount={3} />
      </div>

      {/* Middle row: trend + job type + optional responses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4">
        <TrendCard />
        <JobTypeCard
          openApplicationsCount={openCount}
          closedApplicationsCount={closedCount}
          pendingApplicationsCount={pendingCount}
        />
        {/* Keep ResponsesCard commented until implemented, or uncomment to show */}
        {/* <ResponsesCard /> */}
      </div>

      {/* Applications and demographics */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 pt-4"
        aria-labelledby="dashboard-applications-heading"
      >
        <h2 id="dashboard-applications-heading" className="sr-only">
          Applications and demographics
        </h2>

        <ApplicationsCard applications={safeApplications} />

        <DemographicsCard />
      </section>
    </div>
  );
};

export default Dashboard;

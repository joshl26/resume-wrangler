"use client";

import { Applications, User } from "@/app/lib/definitions";

import React from "react";
import TrendCard from "./trend-card";
import JobTypeCard from "./job-type-card";
import ResponsesCard from "./responses-card";
import ApplicationsCard from "./applications-card";
import DemographicsCard from "./demographics-card";
import {
  beaconInner,
  beaconOuter,
  buttonBack,
  buttonNext,
  floaterStyles,
  joyrideOptions,
} from "@/app/lib/joyride_settings";
import OpenApplicationsCount from "./open-applications-count";
import ClosedApplicationsCount from "./closed-applications-count";
import PendingApplicationsCount from "./pending-applications-count";
import PendingWeeklyGoalCount from "./weekly-goal";

const TOUR_STEPS: any = [
  {
    content: (
      <div className="pt-4">
        <h2 className="text-center">Welcome to the Resume Wrangler!</h2>
        <br />
        <h2 className="text-left">
          This is an automated tour for first time users.
        </h2>
        <br />
        <h2>Go to the next step by clicking the button below.</h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonNext: buttonNext,
    },

    placement: "center",
    target: "main",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>The side nav is the quickest way to navigate the program.</h2>
        <br />
        <h2>Links to each section in the app can be found here.</h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "auto",
    target: ".tour_nav",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>This shows how many open applications you have ATM.</h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "auto",
    target: ".tour-open-applications",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>This shows how many closed applications you have ATM.</h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "auto",
    target: ".tour-closed-applications",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>
          This shows how many responses you have from hiring managers this week.
        </h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "auto",
    target: ".tour-pending-applications",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>This is your weekly goal for job applications.</h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "auto",
    target: ".tour-goal",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>This graph shows trends in your application journey.</h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "auto",
    target: ".tour-trend",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>
          This shows the status of all your applications in pie chart form.
        </h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "auto",
    target: ".tour-status",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>This shows your most recent responses in list form.</h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "auto",
    target: ".tour-response-this-week",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>This table shows how many open applications you have ATM.</h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "auto",
    target: ".tour-responses",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>
          This table shows all your applications and allows you sort by
          different criteria.
        </h2>
        <br />
        <h2>
          Clicking on any line will take you to the application details screen.
        </h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "auto",
    target: ".tour-applications",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>
          This shows demographics for your applications geographically by
          country.
        </h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "auto",
    target: ".tour-demographics",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>This concludes the tour of the dashboard.</h2>
        <br />
        <h2>
          Each link on the bavbar also has a walkthough tour for first time
          users.
        </h2>
      </div>
    ),
    styles: {
      options: joyrideOptions,
      buttonBack: buttonBack,
      buttonNext: buttonNext,
      beaconInner: beaconInner,
      beaconOuter: beaconOuter,
      floaterStyles: floaterStyles,
    },
    placement: "center",
    target: "body",
  },
];

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
        <ResponsesCard />
      </div>
      <div className="flex flex-row gap-4 px-4 pt-4">
        <ApplicationsCard applications={applications} />
        <DemographicsCard />
      </div>
    </div>
  );
};

export default Dashboard;

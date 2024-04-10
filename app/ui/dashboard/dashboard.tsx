"use client";

import { Applications, User } from "@/app/lib/definitions";

import React from "react";
import TrendCard from "./trend-card";
import JobTypeCard from "./job-type-card";
import ResponsesCard from "./responses-card";
import ApplicationsCard from "./applications-card";
import DemographicsCard from "./demographics-card";
import ReactJoyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  ORIGIN,
} from "react-joyride";
import { finishUserTour } from "@/app/lib/actions";
import {
  beaconInner,
  beaconOuter,
  buttonBack,
  buttonNext,
  floaterStyles,
  joyrideOptions,
} from "@/app/lib/joyride_settings";

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
        <h2>The side nav is the fastest way to navigate the program.</h2>
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
    target: ".tour-responses-this-week",
  },
  {
    content: (
      <div className="pt-4 text-left">
        <h2>This is you weekly goal for job applications.</h2>
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

async function handleJoyrideCallback(data: CallBackProps, userId: string) {
  const { action, index, origin, status, type } = data;

  try {
    if (action === ACTIONS.RESET) {
      await finishUserTour(userId, "/dashboard");
    }
  } catch (error) {
    new Error(error);
  }
}

const Dashboard = ({
  applications,
  user,
}: {
  applications: Applications;
  user: User;
}) => {
  return (
    <div className="w-full h-full">
      {user.tour_dashboard === "true" && (
        <ReactJoyride
          steps={TOUR_STEPS}
          callback={(e) => handleJoyrideCallback(e, user.id)}
          continuous={true}
          showSkipButton={true}
        />
      )}
      <div className="flex flex-row gap-4 px-4 pb-4 ">
        <div className="tour-open-applications tight-shadow flex flex-col bg-gradient-orange h-[125px] w-full rounded-xl">
          <h2 className="test p-2 font-bold">Open Applications</h2>
          <h2 className="font-bold text-[3rem] m-auto">3</h2>
        </div>
        <div className="tour-closed-applications tight-shadow flex flex-col bg-gradient-rose h-[125px] w-full rounded-xl">
          <h2 className="p-2 font-bold">Closed Applications</h2>
          <h2 className="font-bold text-[3rem] m-auto">5</h2>
        </div>
        <div className="tour-responses-this-week tight-shadow flex flex-col bg-gradient-purple h-[125px] w-full rounded-xl">
          <h2 className="p-2 font-bold">Responses this week</h2>
          <h2 className="font-bold text-[3rem] m-auto">2</h2>
        </div>
        <div className="tour-goal tight-shadow flex flex-col bg-gradient-azure h-[125px] w-full rounded-xl">
          <h2 className="p-2 font-bold">Weekly Goal</h2>
          <h2 className="font-bold text-[3rem] m-auto">3/15</h2>
        </div>
      </div>
      <div className="flex flex-row gap-4 px-4">
        <TrendCard />
        <JobTypeCard />
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
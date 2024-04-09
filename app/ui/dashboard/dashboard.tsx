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

const TOUR_STEPS: any = [
  {
    content: (
      <div className="pt-4">
        <h2>Welcome to the Resume Wrangler!</h2>
        <br />
        <h2>Follow along with our automated tour</h2>
        <h2>to learn how to setup and use our product.</h2>
      </div>
    ),
    placement: "center",
    target: "main",
  },
  {
    content: (
      <div className="pt-4">
        <h2>Welcome to the Resume Wrangler!</h2>
        <br />
        <h2>Follow along with our automated tour</h2>
        <h2>to learn how to setup and use our product.</h2>
      </div>
    ),
    placement: "auto",
    target: ".tour_nav",
  },
];

async function handleJoyrideCallback(data: CallBackProps, userId: string) {
  const { action, index, origin, status, type } = data;

  try {
    if (action === ACTIONS.RESET) {
      //   await finishUserTour(userId, "/dashboard");
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
        <div className="tight-shadow flex flex-col bg-gradient-orange h-[125px] w-full rounded-xl">
          <h2 className="test p-2 font-bold">Open Applications</h2>
          <h2 className="font-bold text-[3rem] m-auto">3</h2>
        </div>
        <div className="tight-shadow flex flex-col bg-gradient-rose h-[125px] w-full rounded-xl">
          <h2 className="p-2 font-bold">Closed Applications</h2>
          <h2 className="font-bold text-[3rem] m-auto">5</h2>
        </div>
        <div className="tight-shadow flex flex-col bg-gradient-purple h-[125px] w-full rounded-xl">
          <h2 className="p-2 font-bold">Responses this week</h2>
          <h2 className="font-bold text-[3rem] m-auto">2</h2>
        </div>
        <div className="tight-shadow flex flex-col bg-gradient-azure h-[125px] w-full rounded-xl">
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

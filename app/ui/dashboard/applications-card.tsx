"use client";

import React, { useState } from "react";
import clsx from "clsx";

const ApplicationsCard = ({ applications }: { applications: any }) => {
  const [applicationButton, setApplicationButton] = useState("all");

  return (
    <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-1/2 h-[275px] bg-white rounded-xl">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold p-2">Applications</h2>
        <div className="relative h-auto w-[125px] m-4">
          <select className="h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  empty:!bg-gray-900 focus:border-2 focus:border-gray-900  ">
            <option value="this-week">This Week</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="today">Today</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row px-4 gap-2 pb-2">
        <button onClick={(e) => setApplicationButton("all")}>
          <div
            className={clsx(
              applicationButton === "all"
                ? `font-medium px-6 border text-white border-purple-heart-400 bg-purple-heart-400 rounded-full p-1`
                : `font-medium px-6 border border-purple-heart-400 bg-white rounded-full p-1 hover:bg-purple-heart-100`
            )}
          >
            All
          </div>
        </button>
        <button onClick={(e) => setApplicationButton("open")}>
          <div
            className={clsx(
              applicationButton === "open"
                ? `font-medium px-6 border text-white border-rose-400 bg-rose-400 rounded-full p-1`
                : `font-medium px-6 border border-rose-400  bg-white rounded-full p-1 hover:bg-rose-100`
            )}
          >
            Open
          </div>
        </button>
        <button onClick={(e) => setApplicationButton("pending")}>
          <div
            className={clsx(
              applicationButton === "pending"
                ? `font-medium px-6 text-white border bg-international-orange-400 border-international-orange-400  rounded-full p-1`
                : `font-medium px-6 border border-international-orange-400 bg-white rounded-full p-1 hover:bg-international-orange-100`
            )}
          >
            Pending
          </div>
        </button>
        <button onClick={(e) => setApplicationButton("closed")}>
          <div
            className={clsx(
              applicationButton === "closed"
                ? `font-medium px-6 text-white bg-amber-500 border border-amber-400   rounded-full p-1`
                : `font-medium px-6 border border-amber-400 bg-white  rounded-full p-1 hover:bg-amber-100`
            )}
          >
            Closed
          </div>
        </button>
      </div>
      <div className="overflow-y-auto h-[500px]">
        <ul>
          {applications.map((application: any) => (
            <li key={application?.id}>
              <div className="flex flex-row justify-between p-4 gap-2">
                <div className="flex flex-col w-[25px]">
                  <div className="w-[25px] h-[25px] rounded-full bg-azure-radiance-400 m-auto"></div>
                </div>
                <div className="flex flex-col p-2 text-left w-full">
                  {application.job_position}
                </div>
                <div className="flex flex-col my-auto text-white font-medium border bg-rose-400 rounded-md p-1">
                  Awaiting
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplicationsCard;

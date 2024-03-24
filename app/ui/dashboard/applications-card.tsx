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
      <div className="flex flex-row px-2 gap-2">
        <button onClick={(e) => setApplicationButton("all")}>
          <div
            className={clsx(
              applicationButton === "all"
                ? `font-medium px-6 border border-purple-heart-600 bg-purple-heart-400 rounded-full p-1`
                : `font-medium px-6 border border-purple-heart-600 bg-white rounded-full p-1`
            )}
          >
            All
          </div>
        </button>
        <button onClick={(e) => setApplicationButton("open")}>
          <div
            className={clsx(
              applicationButton === "open"
                ? `font-medium px-6 border border-rose-600 bg-rose-600 rounded-full p-1`
                : `font-medium px-6 border border-rose-600 bg-white rounded-full p-1`
            )}
          >
            Open
          </div>
        </button>
        <button onClick={(e) => setApplicationButton("pending")}>
          <div
            className={clsx(
              applicationButton === "pending"
                ? `font-medium px-6 border bg-international-orange-600 border-international-orange-600  rounded-full p-1`
                : `font-medium px-6 border border-international-orange-600 bg-white rounded-full p-1`
            )}
          >
            Pending
          </div>
        </button>
        <button onClick={(e) => setApplicationButton("closed")}>
          <div
            className={clsx(
              applicationButton === "closed"
                ? `font-medium px-6 bg-amber-600 border border-amber-600   rounded-full p-1`
                : `font-medium px-6 border border-amber-600 bg-white  rounded-full p-1`
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
              <div className="flex flex-row p-4 gap-2">
                <div className="flex flex-col border p-2">
                  {application.job_position}
                </div>
                <div className="flex flex-col border p-2">
                  Awaiting Submission
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

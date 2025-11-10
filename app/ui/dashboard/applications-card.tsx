"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Application, Applications } from "@/app/lib/definitions";

const ApplicationsCard = ({ applications }: { applications: Applications }) => {
  const [applicationButton, setApplicationButton] = useState("all");
  const [filteredApplications, setFilteredApplications] =
    useState(applications);

  function onApplicationButtonChangeHandler(e: string) {
    if (e === "all") {
      setApplicationButton("all");
      setFilteredApplications(applications);
    } else if (e === "open") {
      setApplicationButton("open");
      setFilteredApplications(
        applications.filter(
          (application) => application.is_complete === "false",
        ),
      );
    } else if (e === "pending") {
      setApplicationButton("pending");
      setFilteredApplications(
        applications.filter(
          (application) => application.is_complete === "pending",
        ),
      );
    } else if (e === "closed") {
      setApplicationButton("closed");
      setFilteredApplications(
        applications.filter(
          (application) => application.is_complete === "true",
        ),
      );
    }
  }

  return (
    <div className="tour-applications w-1/2 h-[275px] bg-white rounded-lg tight-shadow">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold p-2">Applications</h2>
        <div className="relative h-auto w-[125px] m-4">
          {/* <select className="h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  empty:bg-gray-900! focus:border-2 focus:border-gray-900  ">
            <option value="this-week">This Week</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="today">Today</option>
          </select> */}
        </div>
      </div>
      <div className="flex flex-row px-4 gap-2 pb-2">
        <button onClick={() => onApplicationButtonChangeHandler("all")}>
          <div
            className={clsx(
              applicationButton === "all"
                ? `font-medium px-6 border text-white border-purple-heart-400 bg-purple-heart-400 rounded-full p-1`
                : `font-medium px-6 border border-purple-heart-400 bg-white rounded-full p-1 hover:bg-purple-heart-100`,
            )}
          >
            All
          </div>
        </button>
        <button onClick={() => onApplicationButtonChangeHandler("open")}>
          <div
            className={clsx(
              applicationButton === "open"
                ? `font-medium px-6 border text-white border-rose-400 bg-rose-400 rounded-full p-1`
                : `font-medium px-6 border border-rose-400  bg-white rounded-full p-1 hover:bg-rose-100`,
            )}
          >
            Open
          </div>
        </button>
        <button onClick={() => onApplicationButtonChangeHandler("pending")}>
          <div
            className={clsx(
              applicationButton === "pending"
                ? `font-medium px-6 text-white border bg-international-orange-400 border-international-orange-400  rounded-full p-1`
                : `font-medium px-6 border border-international-orange-400 bg-white rounded-full p-1 hover:bg-international-orange-100`,
            )}
          >
            Pending
          </div>
        </button>
        <button onClick={() => onApplicationButtonChangeHandler("closed")}>
          <div
            className={clsx(
              applicationButton === "closed"
                ? `font-medium px-6 text-white bg-amber-500 border border-amber-400   rounded-full p-1`
                : `font-medium px-6 border border-amber-400 bg-white  rounded-full p-1 hover:bg-amber-100`,
            )}
          >
            Closed
          </div>
        </button>
      </div>
      <div className="overflow-y-scroll h-[190px]">
        <ul className="">
          {filteredApplications.map((application: Application) => (
            <li key={application?.id}>
              <Link href={"/dashboard/applications"}>
                <div className="flex flex-row justify-between px-4 py-1 gap-2 border">
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
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplicationsCard;

"use client";

import { deleteOrganization, deleteWorkExperience } from "@/app/lib/actions";
import Link from "next/link";
import React from "react";

const WorkExperience = ({ workExperiences }: { workExperiences: any }) => {
  // console.log(organization.find(({ id }: any) => id === "1").name);

  return (
    <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg px-4 py-4">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs  uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Organization Name
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {workExperiences?.length > 0 ? (
            workExperiences?.map((workExperience: any) => (
              <tr
                key={workExperience?.id}
                className="border-b  hover:bg-gray-50 "
              >
                <Link
                  href={`/dashboard/work-experience/edit/${workExperience?.id}`}
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {workExperience?.company_name
                      ? workExperience?.company_name
                      : "N/A"}
                  </td>
                </Link>

                <td className="px-6 py-4">
                  {workExperience?.location ? workExperience?.location : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {workExperience?.start_date
                    ? workExperience?.start_date
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {workExperience?.end_date ? workExperience?.end_date : "N/A"}
                </td>

                <td className="text-left px-6 py-4">
                  <a
                    id="edit"
                    href={`/dashboard/work-experience/edit/${workExperience.id}`}
                    className="font-medium  hover:underline"
                  >
                    Edit
                  </a>
                  <button
                    id="remove"
                    onClick={() => deleteWorkExperience(workExperience.id)}
                    className="font-medium hover:underline ms-3"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* <Link href="/dashboard/organization/new"> */}
              <td className="flex items-center px-6 py-4">
                Start by creating your first organization here
              </td>{" "}
              {/* </Link> */}
            </tr>
          )}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-black">
            1-10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-black">
            1000
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              1
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default WorkExperience;

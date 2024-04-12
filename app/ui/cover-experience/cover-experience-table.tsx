"use client";

import { deleteCoverExperience, deleteWorkExperience } from "@/app/lib/actions";
import {
  UserCoverExperience,
  UserWorkExperience,
  UserWorkExperiences,
} from "@/app/lib/definitions";
import Link from "next/link";
import React from "react";

const CoverExperience = ({ coverExperiences }: { coverExperiences: any }) => {
  return (
    <div className="relative overflow-y-auto tight-shadow sm:rounded-lg px-4 mr-2 py-4">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs  uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Experience Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {coverExperiences?.length > 0 ? (
            coverExperiences?.map((coverExperience: UserCoverExperience) => (
              <tr
                key={coverExperience?.id}
                className="border-b  hover:bg-gray-50 "
              >
                {/* <td className="px-6 py-4 font-medium whitespace-nowrap">
                  <Link
                    href={`/dashboard/work-experience/edit/${coverExperience?.id}`}
                  >
                    {coverExperience?.company_name
                      ? coverExperience?.company_name
                      : "N/A"}
                  </Link>
                </td>

                <td className="px-6 py-4">
                  {coverExperience?.location
                    ? coverExperience?.location
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {coverExperience?.start_date
                    ? coverExperience?.start_date
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {coverExperience?.end_date
                    ? coverExperience?.end_date
                    : "N/A"}
                </td> */}
                <td className="px-6 py-4">
                  {coverExperience?.title ? coverExperience?.title : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {coverExperience?.description
                    ? coverExperience?.description
                    : "N/A"}
                </td>

                <td className="text-left py-4">
                  <div className="flex flex-row justify-around">
                    <a
                      id="edit"
                      href={`/dashboard/work-experience/edit/${coverExperience.id}`}
                      className="font-medium  hover:underline"
                    >
                      Edit
                    </a>
                    <form action={deleteCoverExperience}>
                      <input
                        required
                        hidden
                        readOnly
                        value={coverExperience.id}
                        name="cover_experience_id"
                      />
                      <input
                        required
                        hidden
                        readOnly
                        value="blank"
                        id="resume_id"
                        name="resume_id"
                      />
                      <button
                        id="remove"
                        type="submit"
                        className="font-medium hover:underline "
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <Link href="/dashboard/work-experience/new">
                <td className="flex items-center px-6 py-4">
                  Start by creating your first work experience, click here
                </td>
              </Link>
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

export default CoverExperience;

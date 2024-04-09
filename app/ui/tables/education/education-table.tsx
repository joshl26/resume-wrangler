"use client";

import { deleteEducation } from "@/app/lib/actions";
import {
  User,
  UserEducationExperience,
  UserEducationExperiences,
} from "@/app/lib/definitions";
import Link from "next/link";
import React from "react";
import JoyRide from "react-joyride";
const TOUR_STEPS: any = [
  {
    content: <h2>Lets begin our journey!</h2>,
    placement: "center",
    target: "body",
  },

  {
    content: "These are our super awesome projects!",
    placement: "bottom",
    styles: {
      options: {
        width: 300,
      },
    },
    target: ".remove",
    title: "Our projects",
  },
];

const Education = ({
  education,
  user,
}: {
  education: UserEducationExperiences;
  user: User;
}) => {
  return (
    <div className="relative overflow-x-auto overflow-y-auto tight-shadow sm:rounded-lg px-4 mr-4 py-4">
      {user.new_user === "true" && (
        <JoyRide steps={TOUR_STEPS} continuous={true} showSkipButton={true} />
      )}

      <table className="w-full text-sm text-left rtl:text-right rounded">
        <thead
          className="text-xs text-black uppercase  border-spacing-2
        "
        >
          <tr>
            <th scope="col" className="px-6 py-3">
              program Name
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
          {education?.length > 0 ? (
            education?.map((program: UserEducationExperience) => (
              <tr key={program?.id} className="border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap "
                >
                  <Link href={`/dashboard/education/edit/${program?.id}`}>
                    {program?.institution_name
                      ? program?.institution_name
                      : "N/A"}
                  </Link>{" "}
                </th>

                <td className="px-6 py-4">
                  {program?.location ? program?.location : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {program?.start_date ? program?.start_date : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {program?.end_date ? program?.end_date : "N/A"}
                </td>
                <td className="text-left px-6 py-4">
                  <div className="flex flex-row">
                    <a
                      id="edit"
                      href={`/dashboard/education/edit/${program?.id}`}
                      className="font-medium hover:underline"
                    >
                      Edit
                    </a>
                    <form action={deleteEducation}>
                      <input
                        required
                        hidden
                        id="resume_id"
                        name="resume_id"
                        readOnly
                        value="blank"
                      />
                      <input
                        required
                        hidden
                        id="education_id"
                        name="education_id"
                        readOnly
                        value={program.id}
                      />
                      <button
                        id="remove"
                        name="remove"
                        type="submit"
                        className="remove font-medium hover:underline ms-3"
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
              <Link href="/dashboard/education/new">
                <td className="flex items-center px-6 py-4">
                  Start by creating your first education experience here
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

export default Education;

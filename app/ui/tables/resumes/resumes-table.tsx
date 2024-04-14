import { createCoverLetter, deleteCoverLetter } from "@/app/lib/actions";
import type {
  Application,
  Applications,
  Companies,
  CoverLetters,
  Resume,
  Resumes,
  User,
} from "@/app/lib/definitions";
import Link from "next/link";
import React from "react";

const Resumes = ({
  user,
  resumes,
  companies,
}: {
  user: User;
  resumes: Resumes & Applications;
  applications: Applications;
  companies: Companies;
}) => {
  return (
    <div className="relative overflow-y-auto tight-shadow rounded px-4 py-4 mr-3 bg-white">
      <table
        className="w-full text-sm text-left rtl:text-right tight-shadow
      "
      >
        <thead className="text-xs uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Job Title
            </th>
            <th scope="col" className="px-6 py-3">
              Company
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="">
              Application
            </th>
            <th scope="col" className="">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {resumes?.length > 0 ? (
            resumes?.map((resume: Resume & Application) => (
              <tr key={resume?.id} className="border-b  hover:bg-gray-50 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  <Link href={`/dashboard/resume/edit/${resume?.id}`}>
                    {resume?.job_position ? resume?.job_position : "N/A"}
                  </Link>
                </th>
                <td className="px-6 py-4">
                  {resume?.company_id
                    ? companies?.find(
                        (company) => company?.id === resume?.company_id
                      )?.name
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {resume?.company_id
                    ? companies?.find(
                        (company) => company?.id === resume?.company_id
                      )?.address_one
                    : "N/A"}
                </td>
                <td className="px-6 py-4 ">
                  <Link
                    id="edit"
                    className="font-medium hover:underline"
                    href={`/dashboard/applications/edit/${resume?.application_id}`}
                  >
                    Edit
                  </Link>
                </td>
                <td className="px-2 py-4">
                  <div className="flex flex-row justify-start">
                    <div className="flex flex-col ">
                      <Link
                        id="edit"
                        href={`/dashboard/resume/edit/${resume.id}`}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="flex flex-col  ">
                      <button
                        id="remove"
                        // onClick={async () => deleteCoverLetter(application.id)}
                        className="font-medium hover:underline ms-3"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <Link href="/dashboard/applications/new">
                <td className="flex items-center px-6 py-4">
                  Start by creating your first application here
                </td>{" "}
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
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 tight-shadow rounded-lg">
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
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  "
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

export default Resumes;

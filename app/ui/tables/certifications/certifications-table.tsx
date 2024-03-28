"use client";

import { deleteCertification } from "@/app/lib/actions";
import Link from "next/link";
import React from "react";

const Certifications = ({ certifications }: { certifications: any }) => {
  // console.log(organization.find(({ id }: any) => id === "1").name);

  return (
    <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg px-4 py-4">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Certification Name
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
          {certifications[0] ? (
            certifications?.map((certification: any) => (
              <tr
                key={certification?.id}
                className=" border-b  hover:bg-gray-50 "
              >
                <Link
                  href={`/dashboard/certifications/edit/${certification?.id}`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {certification?.name ? certification?.name : "N/A"}
                  </th>
                </Link>
                <td className="px-6 py-4">
                  {certification?.location ? certification?.location : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {certification?.start_date
                    ? certification?.start_date
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {certification?.end_date ? certification?.end_date : "N/A"}
                </td>
                <td className="text-left px-6 py-4">
                  <div className="flex flex-row">
                    <a
                      id="edit"
                      href={`/dashboard/certifications/edit/${certification?.id}`}
                      className="font-medium  hover:underline"
                    >
                      Edit
                    </a>
                    <form action={deleteCertification}>
                      <label hidden htmlFor="resume_id" />
                      <input
                        hidden
                        id="resume_id"
                        name="resume_id"
                        readOnly
                        value="blank"
                      />
                      <label hidden htmlFor="certification_id" />
                      <input
                        hidden
                        id="certification_id"
                        name="certification_id"
                        readOnly
                        value={certification.id}
                      />
                      <button
                        id="remove"
                        type="submit"
                        className="font-medium  hover:underline ms-3"
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
              <Link href="/dashboard/organization/new">
                <td className="flex items-center px-6 py-4">
                  Start by creating your first organization here
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
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700  "
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
              className="flex items-center justify-center px-3 h-8 leading-tight bg-white  border border-gray-300 rounded-e-lg hover:bg-gray-100  "
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Certifications;

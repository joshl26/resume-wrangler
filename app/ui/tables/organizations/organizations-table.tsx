"use client";

import { deleteOrganization } from "@/app/lib/actions";
import { UserOrganization, userOrganizations } from "@/app/lib/definitions";
import { User } from "next-auth";
import Link from "next/link";
import React from "react";
import Pagination from "../../pagination";

const Organizations = ({
  organizations,
  user,
  totalPages,
  query,
  currentPage,
  totalCount,
  filteredOrganizations,
}: {
  organizations: userOrganizations;
  user: User;
  totalPages: number;
  query: string;
  currentPage: number;
  totalCount: number;
  filteredOrganizations: userOrganizations;
}) => {
  return (
    <div className="relative overflow-x-auto overflow-y-auto tight-shadow rounded px-4 py-4 mr-3 bg-white">
      <table className="w-full text-sm text-left rtl:text-right tight-shadow">
        <thead className="text-xs uppercase ">
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
          {filteredOrganizations?.length > 0 ? (
            filteredOrganizations?.map((organization: UserOrganization) => (
              <tr key={organization?.id} className=" border-b  ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  <Link
                    href={`/dashboard/organizations/edit/${organization?.id}`}
                  >
                    {organization?.name ? organization?.name : "N/A"}
                  </Link>
                </th>

                <td className="px-6 py-4">
                  {organization?.location ? organization?.location : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {organization?.start_date ? organization?.start_date : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {organization?.end_date ? organization?.end_date : "N/A"}
                </td>
                <td className="text-left px-6 py-4">
                  <div className="flex flex-row">
                    <a
                      id="edit"
                      href={`/dashboard/organizations/edit/${organization?.id}`}
                      className="font-medium  hover:underline"
                    >
                      Edit
                    </a>
                    <form action={deleteOrganization}>
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
                        id="organization_id"
                        name="organization_id"
                        readOnly
                        value={organization.id}
                      />
                      <button
                        id="remove"
                        type="submit"
                        className="font-medium hover:underline ms-3"
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
              <Link href="/dashboard/organizations/new">
                <td className="flex items-center px-6 py-4">
                  Start by creating your first organization here
                </td>
              </Link>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pt-4">
        <Pagination totalPages={totalPages} totalCount={totalCount} />
      </div>
      {/* <nav
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
        <ul className="inline-flex tight-shadow rounded-lg -space-x-px rtl:space-x-reverse text-sm h-8">
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
              className="flex items-center bg-white justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              Next
            </a>
          </li>
        </ul>
      </nav> */}
    </div>
  );
};

export default Organizations;

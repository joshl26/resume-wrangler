"use client";

import { deleteOrganization } from "@/app/lib/actions";
import Link from "next/link";
import React from "react";

const Organizations = ({ organizations }: { organizations: any }) => {
  // console.log(organization.find(({ id }: any) => id === "1").name);

  return (
    <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg px-4 py-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-200 dark:text-gray-200">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th> */}
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
            {/* <th scope="col" className="px-6 py-3">
              Description
            </th> */}
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {organizations?.length > 0 ? (
            organizations?.map((organization: any) => (
              <tr
                key={organization?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {/* <Link
                  className="w-full "
                  href={`/dashboard/organization/edit/${organization.id}`}
                > */}
                {/* <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td> */}
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {organization?.name ? organization?.name : "N/A"}
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
                {/* <td className="text-left px-6 py-4">
                  {organization?.description
                    ? organization?.description
                    : "N/A"}
                </td> */}

                <td className="text-left px-6 py-4">
                  <div className="flex flex-row">
                    {" "}
                    <a
                      href={`/dashboard/organizations/edit/${organization.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <form action={deleteOrganization}>
                      <label hidden htmlFor="resume_id" />
                      <input
                        hidden
                        id="resume_id"
                        name="resume_id"
                        readOnly
                        value="blank"
                      />
                      <label hidden htmlFor="organization_id" />
                      <input
                        hidden
                        id="organization_id"
                        name="organization_id"
                        readOnly
                        value={organization.id}
                      />
                      <button
                        type="submit"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </td>
                {/* </Link> */}
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
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Organizations;

"use client";

import { deleteCompany } from "@/app/lib/actions";
import { Companies, Company } from "@/app/lib/definitions";
import Link from "next/link";
import React from "react";

const Companies = ({ companies }: { companies: Companies }) => {
  return (
    <div className="relative overflow-x-auto overflow-y-auto tight-shadow sm:rounded-lg px-4 py-4 mr-3">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs  uppercase  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Company Name
            </th>
            <th scope="col" className="px-6 py-3">
              Address One
            </th>
            <th scope="col" className="px-6 py-3">
              Recipient
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {companies?.length > 0 ? (
            companies?.map((company: Company) => (
              <tr key={company?.id} className=" border-b da hover:bg-gray-50 ">
                <Link href={`/dashboard/companies/edit/${company?.id}`}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {company?.name ? company?.name : "N/A"}
                  </th>
                </Link>
                <td className="px-6 py-4">
                  {company?.address_one ? company?.address_one : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {company?.recipient_title ? company?.recipient_title : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {company?.email ? company?.email : "N/A"}
                </td>
                <td className="text-left px-6 py-4">
                  {company?.phone ? company?.phone : "N/A"}
                </td>

                <td className="text-left px-6 py-4">
                  <div className="flex flex-row">
                    <a
                      id="edit"
                      href={`/dashboard/companies/edit/${company.id}`}
                      className="font-medium  hover:underline"
                    >
                      Edit
                    </a>
                    <form action={() => deleteCompany(company.id)}>
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
              <Link href="/dashboard/company/new">
                <td className="flex items-center px-6 py-4">
                  Start by creating your first company here
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
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700  "
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Companies;

"use client";

import { deleteCoverExperience } from "@/app/lib/actions";
import {
  User,
  UserCoverExperience,
  UserCoverExperiences,
} from "@/app/lib/definitions";
import Link from "next/link";
import React from "react";

const CoverExperience = ({
  coverExperiences,
  user,
}: {
  coverExperiences: UserCoverExperiences;
  user: User;
}) => {
  // Wrapper function that handles the result of the action
  const handleDelete = async (formData: FormData) => {
    const result = await deleteCoverExperience(formData);
    if (result?.errors) {
      // Handle errors - you could show a toast or alert here
      console.error("Delete failed:", result.message);
    }
  };

  return (
    <div className="relative overflow-y-auto tight-shadow rounded-lg bg-white px-4 mr-2 py-4">
      <table className="w-full text-sm text-left rtl:text-right tight-shadow">
        <thead className="text-xs uppercase ">
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
                <td className="px-6 py-4">
                  <a
                    id="edit"
                    href={`/dashboard/cover-experience/edit/${coverExperience?.id}/${user?.id}`}
                    className="font-medium  hover:underline"
                  >
                    {coverExperience?.title ? coverExperience?.title : "N/A"}
                  </a>
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
                      href={`/dashboard/cover-experience/edit/${coverExperience?.id}/${user?.id}`}
                      className="font-medium  hover:underline"
                    >
                      Edit
                    </a>
                    <form action={handleDelete}>
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
                        value={user?.id}
                        id="user_id"
                        name="user_id"
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
              <td className="flex items-center px-6 py-4">
                <Link href="/dashboard/work-experience/new">
                  Start by creating your first work experience, click here
                </Link>
              </td>
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

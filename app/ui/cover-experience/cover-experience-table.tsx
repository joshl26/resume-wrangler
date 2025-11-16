"use client";

import { deleteCoverExperience } from "@/app/lib/actions";
import {
  User,
  UserCoverExperience,
  UserCoverExperiences,
} from "@/app/lib/definitions";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CoverExperience = ({
  coverExperiences,
  user,
}: {
  coverExperiences: UserCoverExperiences;
  user: User;
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  const handleSubmit = async (formData: FormData, id: string) => {
    setIsSubmitting((prev) => ({ ...prev, [id]: true }));
    try {
      const result = await deleteCoverExperience(formData);
      if (result?.errors) {
        console.error("Delete failed:", result.message);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Delete action failed:", error);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="relative tight-shadow rounded px-4 py-4 mr-3 overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right tight-shadow">
        <thead className="text-xs uppercase">
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
          {coverExperiences && coverExperiences.length > 0 ? (
            coverExperiences.map((coverExperience) => {
              const key = `delete-cover-experience-${coverExperience.id}`;
              return (
                <tr
                  key={coverExperience.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    <Link
                      href={`/dashboard/cover-experience/edit/${coverExperience.id}/${user.id}`}
                      className="hover:underline"
                    >
                      {coverExperience.title ?? "N/A"}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {coverExperience.description ?? "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-row items-center gap-3">
                      <Link
                        href={`/dashboard/cover-experience/edit/${coverExperience.id}/${user.id}`}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </Link>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          await handleSubmit(formData, key);
                        }}
                      >
                        <input
                          type="hidden"
                          name="cover_experience_id"
                          value={String(coverExperience.id)}
                          readOnly
                        />
                        <input
                          type="hidden"
                          name="user_id"
                          value={String(user.id)}
                          readOnly
                        />
                        <button
                          type="submit"
                          disabled={!!isSubmitting[key]}
                          className="font-medium hover:underline"
                        >
                          {isSubmitting[key] ? "Removing..." : "Remove"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3} className="px-6 py-6 text-center">
                <Link
                  href="/dashboard/cover-experience/new"
                  className="font-medium text-azure-radiance-600 hover:underline"
                >
                  Start by creating your first cover experience here
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Old pagination markup */}
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

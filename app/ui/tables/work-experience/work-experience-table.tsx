"use client";

import { deleteWorkExperience } from "@/app/lib/actions";
import {
  User,
  UserWorkExperience,
  UserWorkExperiences,
} from "@/app/lib/definitions";
import Link from "next/link";
import React, { useState } from "react";
import Pagination from "../../pagination";
import { useRouter } from "next/navigation";

const WorkExperience = ({
  workExperiences,
  user,
  totalPages,
  query,
  currentPage,
  totalCount,
  filteredWorkExperiences,
}: {
  user: User;
  workExperiences: UserWorkExperiences;
  totalPages: number;
  query: string;
  currentPage: number;
  totalCount: number;
  filteredWorkExperiences: UserWorkExperiences;
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  // Wrapper so form.action receives (formData: FormData) => void | Promise<void>
  const handleDeleteWorkExperience = async (
    formData: FormData,
    key: string,
  ): Promise<void> => {
    setIsSubmitting((prev) => ({ ...prev, [key]: true }));
    try {
      const workExpId = formData.get("work_experience_id")?.toString() ?? null;

      let result: any;
      // Try calling with id first (common), otherwise fallback to passing FormData
      try {
        result = await (
          deleteWorkExperience as unknown as (arg: any) => Promise<any>
        )(workExpId ?? formData);
      } catch (err) {
        try {
          result = await (
            deleteWorkExperience as unknown as (arg: any) => Promise<any>
          )(formData);
        } catch (err2) {
          console.error(
            "deleteWorkExperience failed with both id and FormData:",
            err2,
          );
          throw err2;
        }
      }

      if (result?.errors) {
        console.error("Delete work experience failed:", result);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error deleting work experience:", err);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="relative overflow-y-auto tight-shadow rounded px-4 mr-2 py-4 ">
      <table className="w-full text-sm text-left rtl:text-right tight-shadow">
        <thead className="text-xs  uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Organization Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
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
          {filteredWorkExperiences?.length > 0 ? (
            filteredWorkExperiences.map(
              (workExperience: UserWorkExperience) => {
                const key = `delete-work-${String(workExperience?.id)}`;

                return (
                  <tr
                    key={workExperience?.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <Link
                        href={`/dashboard/work-experience/edit/${workExperience?.id}`}
                      >
                        {workExperience?.company_name ?? "N/A"}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {workExperience?.job_title ?? "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {workExperience?.location ?? "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {workExperience?.start_date ?? "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {workExperience?.end_date ?? "N/A"}
                    </td>

                    <td className="text-left py-4">
                      <div className="flex flex-row justify-around items-center">
                        <Link
                          id={`edit-work-${workExperience.id}`}
                          href={`/dashboard/work-experience/edit/${workExperience.id}`}
                          className="font-medium hover:underline"
                        >
                          Edit
                        </Link>

                        <form
                          action={(formData: FormData) =>
                            handleDeleteWorkExperience(formData, key)
                          }
                          className="inline-block"
                        >
                          <input
                            required
                            hidden
                            readOnly
                            value={String(workExperience.id)}
                            name="work_experience_id"
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
                            id={`remove-work-${workExperience.id}`}
                            type="submit"
                            className="font-medium hover:underline"
                            disabled={!!isSubmitting[key]}
                          >
                            {isSubmitting[key] ? "Removing..." : "Remove"}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              },
            )
          ) : (
            <tr>
              <td colSpan={6} className="flex items-center px-6 py-4">
                <Link
                  href="/dashboard/work-experience/new"
                  className="font-medium text-azure-radiance-600 hover:underline"
                >
                  Start by creating your first work experience, click here
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pt-4">
        <Pagination totalPages={totalPages} totalCount={totalCount} />
      </div>
    </div>
  );
};

export default WorkExperience;

"use client";

import { deleteEducation } from "@/app/lib/actions";
import { fetchFilteredEducation } from "@/app/lib/data";
import {
  User,
  UserEducationExperience,
  UserEducationExperiences,
} from "@/app/lib/definitions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "../../pagination";
import { useRouter } from "next/navigation";

export default function Education({
  user,
  totalPages,
  query,
  currentPage,
  totalCount,
}: {
  user: User;
  totalPages: number;
  query: string;
  currentPage: number;
  totalCount: number;
}) {
  const router = useRouter();
  const [filteredEducation, setFilteredEducation] =
    useState<UserEducationExperiences>([]);
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchFilteredEducation(query, currentPage, user?.id);
        if (mounted) setFilteredEducation(data ?? []);
      } catch (err) {
        console.error("Failed to fetch filtered education:", err);
        if (mounted) setFilteredEducation([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [query, currentPage, user?.id]);

  // IMPORTANT: deleteEducation expects FormData, so pass formData directly
  const handleDeleteEducation = async (
    formData: FormData,
    key: string,
  ): Promise<void> => {
    setIsSubmitting((prev) => ({ ...prev, [key]: true }));
    try {
      // optionally read the id for logging:
      const educationId = formData.get("education_id")?.toString() ?? null;

      // Pass the FormData directly to the server action
      const result = (await deleteEducation(formData)) as any;

      if (result?.errors) {
        console.error("Delete education failed:", result);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error deleting education:", err);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="relative overflow-x-auto overflow-y-auto tight-shadow rounded bg-white px-4 mr-4 py-4">
      <table className="w-full text-sm text-left rtl:text-right rounded tight-shadow">
        <thead className="text-xs text-black uppercase border-spacing-2">
          <tr>
            <th scope="col" className="px-6 py-3">
              Institution Name
            </th>
            <th scope="col" className="px-6 py-3">
              Program Name
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
          {filteredEducation?.length > 0 ? (
            filteredEducation.map((program: UserEducationExperience) => {
              const key = `delete-education-${String(program?.id)}`;
              return (
                <tr key={program?.id} className="border-b">
                  <th
                    scope="row"
                    className="px-6 h-[47px] font-medium whitespace-nowrap "
                  >
                    <Link href={`/dashboard/education/edit/${program?.id}`}>
                      {program?.institution_name ?? "N/A"}
                    </Link>
                  </th>

                  <td className="px-6 ">{program?.program ?? "N/A"}</td>
                  <td className="px-6 ">{program?.location ?? "N/A"}</td>
                  <td className="px-6 ">{program?.start_date ?? "N/A"}</td>
                  <td className="px-6 ">{program?.end_date ?? "N/A"}</td>

                  <td className="text-left px-6 ">
                    <div className="flex flex-row items-center">
                      <Link
                        id={`edit-edu-${program?.id}`}
                        href={`/dashboard/education/edit/${program?.id}`}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </Link>

                      <form
                        action={(formData: FormData) =>
                          handleDeleteEducation(formData, key)
                        }
                        className="ms-3"
                      >
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
                          value={String(program.id)}
                        />
                        <button
                          type="submit"
                          className="remove font-medium hover:underline ms-3"
                          disabled={!!isSubmitting[key]}
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
              <td colSpan={6} className="flex items-center px-6 py-4">
                <Link
                  href="/dashboard/education/new"
                  className="font-medium text-azure-radiance-600 hover:underline"
                >
                  Start by creating your first education experience here
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
}

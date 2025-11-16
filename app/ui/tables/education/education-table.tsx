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
  serverEducation,
}: {
  user: User;
  totalPages: number;
  query: string;
  currentPage: number;
  totalCount: number;
  serverEducation?: UserEducationExperiences;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});
  const [filteredEducation, setFilteredEducation] =
    useState<UserEducationExperiences>(serverEducation ?? []);

  useEffect(() => {
    let mounted = true;

    if (serverEducation !== undefined) {
      if (mounted) setFilteredEducation(serverEducation ?? []);
      return () => {
        mounted = false;
      };
    }

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
  }, [query, currentPage, user?.id, serverEducation]);

  const handleSubmit = async (
    actionFn: (formData: FormData) => Promise<unknown>,
    formData: FormData,
    id: string,
  ) => {
    setIsSubmitting((prev) => ({ ...prev, [id]: true }));
    try {
      await actionFn(formData);
      router.refresh();
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="relative overflow-x-auto overflow-y-auto tight-shadow rounded px-4 py-4 mr-4">
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
          {filteredEducation && filteredEducation.length > 0 ? (
            filteredEducation.map((program: UserEducationExperience) => {
              const key = `delete-education-${program.id}`;
              return (
                <tr key={program.id} className="border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="px-6 h-[55px] font-medium whitespace-nowrap"
                  >
                    <Link href={`/dashboard/education/edit/${program.id}`}>
                      {program.institution_name ?? "N/A"}
                    </Link>
                  </th>

                  <td className="px-6">{program.program ?? "N/A"}</td>
                  <td className="px-6">{program.location ?? "N/A"}</td>
                  <td className="px-6">{program.start_date ?? "N/A"}</td>
                  <td className="px-6">{program.end_date ?? "N/A"}</td>

                  <td className="px-6">
                    <div className="flex flex-row items-center gap-3">
                      <Link
                        id={`edit-edu-${program.id}`}
                        href={`/dashboard/education/edit/${program.id}`}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </Link>

                      <form
                        action={(formData) =>
                          handleSubmit(deleteEducation, formData, key)
                        }
                        className="ms-3"
                      >
                        <input
                          type="hidden"
                          name="education_id"
                          value={String(program.id)}
                          readOnly
                        />
                        <button
                          type="submit"
                          className="font-medium hover:underline ms-3"
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
              <td colSpan={6} className="px-6 py-6">
                <div className="flex items-center gap-2">
                  <span>Start by creating your first education experience</span>
                  <Link
                    href="/dashboard/education/new"
                    className="font-medium text-azure-radiance-600 hover:underline"
                  >
                    here
                  </Link>
                </div>
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

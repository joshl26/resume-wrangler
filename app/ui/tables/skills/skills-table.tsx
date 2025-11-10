"use client";

import { deleteUserSkill } from "@/app/lib/actions";
import { fetchFilteredSkills } from "@/app/lib/data";
import { User, UserSkills } from "@/app/lib/definitions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "../../pagination";
import { useRouter } from "next/navigation";

export default function Skills({
  user,
  skills,
  totalPages,
  query,
  currentPage,
  totalCount,
}: {
  user: User;
  skills: UserSkills;
  totalPages: number;
  query: string;
  currentPage: number;
  totalCount: number;
}) {
  const router = useRouter();
  const [filteredSkills, setFilteredSkills] = useState<UserSkills>(
    skills ?? [],
  );
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data: UserSkills = await fetchFilteredSkills(
          query,
          currentPage,
          user?.id,
        );
        if (mounted) setFilteredSkills(data ?? []);
      } catch (err) {
        console.error("Failed to fetch filtered skills:", err);
        if (mounted) setFilteredSkills([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [query, currentPage, user?.id]);

  // Wrapper so form.action receives (formData: FormData) => void | Promise<void>
  const handleDeleteSkill = async (
    formData: FormData,
    key: string,
  ): Promise<void> => {
    setIsSubmitting((prev) => ({ ...prev, [key]: true }));
    try {
      const skillId = formData.get("id")?.toString() ?? null;

      let result: any;
      // Try calling deleteUserSkill with id first (common pattern). If it expects FormData, fallback.
      try {
        result = await (
          deleteUserSkill as unknown as (arg: any) => Promise<any>
        )(skillId ?? formData);
      } catch (err) {
        try {
          result = await (
            deleteUserSkill as unknown as (arg: any) => Promise<any>
          )(formData);
        } catch (err2) {
          console.error(
            "deleteUserSkill failed with both id and FormData:",
            err2,
          );
          throw err2;
        }
      }

      if (result?.errors) {
        console.error("Delete skill failed:", result);
      } else {
        // refresh to reflect deletion
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error deleting skill:", err);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="relative overflow-x-auto tight-shadow rounded px-4 pt-4 pb-4 mb-10 mr-3 bg-white">
      <table className="w-full text-sm text-left rtl:text-right tight-shadow">
        <thead className="text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Skill Name
            </th>
            <th scope="col" className="px-6 py-3">
              Skill Level
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredSkills?.length > 0 ? (
            filteredSkills.map((skill: any) => {
              const key = `delete-skill-${String(skill?.id)}`;
              return (
                <tr key={skill?.id} className="border-b">
                  <td className="px-6 h-[45px] font-medium text-gray-900 whitespace-nowrap ">
                    <Link href={`/dashboard/skills/edit/${skill?.id}`}>
                      {skill?.skill ?? "N/A"}
                    </Link>
                  </td>
                  <td className="px-6">
                    <div className="flex flex-row gap-2 justify-start items-center">
                      <input
                        title={
                          skill?.skill_level ? `${skill?.skill_level}%` : "N/A"
                        }
                        className="shadow-none"
                        readOnly
                        type="range"
                        value={skill?.skill_level ?? 0}
                      />
                      {skill?.skill_level !== undefined &&
                      skill?.skill_level !== null ? (
                        <p>{skill?.skill_level}%</p>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </td>
                  <td className="text-left px-6">
                    <div className="flex flex-row items-center">
                      <Link
                        id={`edit-skill-${skill?.id}`}
                        href={`/dashboard/skills/edit/${skill?.id}`}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </Link>

                      <form
                        action={(formData: FormData) =>
                          handleDeleteSkill(formData, key)
                        }
                        className="ms-3"
                      >
                        <input
                          hidden
                          id="resume_id"
                          name="resume_id"
                          readOnly
                          value="blank"
                        />
                        <input
                          hidden
                          id="id"
                          name="id"
                          readOnly
                          value={String(skill?.id)}
                        />
                        <button
                          id={`remove-skill-${skill?.id}`}
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
              <td colSpan={3} className="flex items-center px-6 py-4">
                <Link
                  href="/dashboard/skills/new"
                  className="font-medium text-azure-radiance-600 hover:underline"
                >
                  Start by creating your first skill here
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

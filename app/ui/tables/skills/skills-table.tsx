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
  serverSkills,
}: {
  user: User;
  skills: UserSkills;
  totalPages: number;
  query: string;
  currentPage: number;
  totalCount: number;
  serverSkills?: UserSkills;
}) {
  const router = useRouter();
  const [filteredSkills, setFilteredSkills] = useState<UserSkills>(
    serverSkills ?? [],
  );
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;

    if (serverSkills !== undefined) {
      if (mounted) setFilteredSkills(serverSkills ?? []);
      return () => {
        mounted = false;
      };
    }

    (async () => {
      try {
        const data = await fetchFilteredSkills(query, currentPage, user?.id);
        if (mounted) setFilteredSkills(data ?? []);
      } catch (err) {
        console.error("Failed to fetch filtered skills:", err);
        if (mounted) setFilteredSkills([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [query, currentPage, user?.id, serverSkills]);

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
          {filteredSkills && filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => {
              const key = `delete-skill-${skill.id}`;
              return (
                <tr key={skill.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 h-[55px] font-medium whitespace-nowrap">
                    <Link href={`/dashboard/skills/edit/${skill.id}`}>
                      {skill.skill ?? "N/A"}
                    </Link>
                  </td>
                  <td className="px-6">
                    <div className="flex flex-row gap-2 items-center">
                      <input
                        title={
                          skill.skill_level ? `${skill.skill_level}%` : "N/A"
                        }
                        className="shadow-none"
                        readOnly
                        type="range"
                        value={skill.skill_level ?? 0}
                      />
                      {skill.skill_level !== undefined &&
                      skill.skill_level !== null ? (
                        <span>{skill.skill_level}%</span>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </td>
                  <td className="px-6">
                    <div className="flex flex-row items-center gap-3">
                      <Link
                        id={`edit-skill-${skill.id}`}
                        href={`/dashboard/skills/edit/${skill.id}`}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </Link>

                      <form
                        action={(formData) =>
                          handleSubmit(deleteUserSkill, formData, key)
                        }
                        className="ms-3"
                      >
                        <input
                          type="hidden"
                          id="id"
                          name="id"
                          value={String(skill.id)}
                          readOnly
                        />
                        <button
                          id={`remove-skill-${skill.id}`}
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
              <td colSpan={3} className="px-6 py-6">
                <div className="flex items-center gap-2">
                  <span>Start by creating your first skill</span>
                  <Link
                    href="/dashboard/skills/new"
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

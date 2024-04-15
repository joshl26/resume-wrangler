"use client";

import { deleteUserSkill } from "@/app/lib/actions";
import { UserSkills } from "@/app/lib/definitions";
import Link from "next/link";
import React from "react";

const Skills = ({ skills }: { skills: UserSkills }) => {
  return (
    <div className="relative overflow-x-auto overflow-y-auto tight-shadow rounded px-4 py-4 mr-3 bg-white">
      <table
        className="w-full text-sm text-left rtl:text-right tight-shadow
      "
      >
        <thead className="text-xs  uppercase  ">
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
          {skills?.length > 0 ? (
            skills?.map((skill: any) => (
              <tr key={skill?.id} className="border-b">
                <td
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                >
                  <Link href={`/dashboard/skills/edit/${skill?.id}`}>
                    {skill?.skill ? skill?.skill : "N/A"}
                  </Link>
                </td>
                <td className="px-6 py-2">
                  <div className="flex flex-row gap-2 justify-start">
                    <input
                      className="shadow-none"
                      readOnly
                      type="range"
                      value={skill?.skill_level}
                    />
                    {skill?.skill_level ? <p>{skill?.skill_level}%</p> : "N/A"}
                  </div>
                </td>
                <td className="text-left px-6 py-2">
                  <div className="flex flex-row">
                    <a
                      id="edit"
                      href={`/dashboard/skills/edit/${skill?.id}`}
                      className="font-medium hover:underline"
                    >
                      Edit
                    </a>
                    <form action={deleteUserSkill}>
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
                        value={skill?.id}
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
              <Link href="/dashboard/skills/new">
                <td className="flex items-center px-6 py-4">
                  Start by creating your first skill here
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
        <ul className="  inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
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

export default Skills;

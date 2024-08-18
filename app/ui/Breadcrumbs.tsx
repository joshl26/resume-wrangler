"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Breadcrumbs = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row justify-between">
      <div className="flex flex-col m-auto">
        <Link
          href={"/dashboard/applications"}
          className={
            clsx(
              pathname == "/dashboard/applications"
                ? "text-[2rem] font-bold"
                : "text-[0.9rem]"
            ) + " py-1 pb-2 hover:underline"
          }
        >
          Applications
        </Link>
      </div>
      <div className="flex flex-col m-auto px-1"> | </div>
      <div className="flex flex-col m-auto text-[.9rem] hover:underline">
        <Link
          href={"/dashboard/companies"}
          className={
            clsx(
              pathname == "/dashboard/companies"
                ? "text-[2rem] font-bold"
                : "text-[0.9rem]"
            ) + " py-1 pb-2 hover:underline"
          }
        >
          Companies
        </Link>
      </div>
      <div className="flex flex-col m-auto px-1"> | </div>
      <div className="flex flex-col m-auto text-[.9rem] hover:underline">
        <Link
          href={"/dashboard/certifications"}
          className={
            clsx(
              pathname == "/dashboard/certifications"
                ? "text-[2rem] font-bold"
                : "text-[0.9rem]"
            ) + " py-1 pb-2 hover:underline"
          }
        >
          Certifications
        </Link>
      </div>
      <div className="flex flex-col m-auto px-1"> | </div>
      <div className="flex flex-col m-auto text-[.9rem] hover:underline">
        <Link
          href={"/dashboard/education"}
          className={
            clsx(
              pathname == "/dashboard/education"
                ? "text-[2rem] font-bold"
                : "text-[0.9rem]"
            ) + " py-1 pb-2 hover:underline"
          }
        >
          Education
        </Link>
      </div>
      <div className="flex flex-col m-auto px-1"> | </div>
      <div className="flex flex-col m-auto text-[.9rem] hover:underline">
        <Link
          href={"/dashboard/organizations"}
          className={
            clsx(
              pathname == "/dashboard/organizations"
                ? "text-[2rem] font-bold"
                : "text-[0.9rem]"
            ) + " py-1 pb-2 hover:underline"
          }
        >
          Organizations
        </Link>
      </div>
      <div className="flex flex-col m-auto px-1"> | </div>
      <div className="flex flex-col m-auto text-[.9rem] hover:underline">
        <Link
          href={"/dashboard/skills"}
          className={
            clsx(
              pathname == "/dashboard/skills"
                ? "text-[2rem] font-bold"
                : "text-[0.9rem]"
            ) + " py-1 pb-2 hover:underline"
          }
        >
          Skills
        </Link>
      </div>
      {/* <div className="flex flex-col m-auto px-1"> | </div>
            <div className="flex flex-col m-auto text-[.9rem] hover:underline">
              <Link href={"/dashboard/work-experience"}>Resume Experience</Link>
            </div> */}
    </nav>
  );
};

export default Breadcrumbs;

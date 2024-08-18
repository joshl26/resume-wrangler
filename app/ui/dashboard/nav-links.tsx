"use client";

import {
  ListBulletIcon,
  AdjustmentsVerticalIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  AdjustmentsHorizontalIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  // {
  //   name: "Upgrade to PRO",
  //   href: "/dashboard/upgrade",
  //   icon: UserGroupIcon,
  // },

  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },

  {
    name: "Job Applications",
    href: "/dashboard/applications",
    icon: NewspaperIcon,
  },
  {
    name: "Companies",
    href: "/dashboard/companies",
    icon: BuildingOffice2Icon,
  },

  {
    name: "Education",
    href: "/dashboard/education",
    icon: AcademicCapIcon,
  },
  {
    name: "Skills",
    href: "/dashboard/skills",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: "Cover Letter Experience",
    href: "/dashboard/cover-experience",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Resume Experience",
    href: "/dashboard/work-experience",
    icon: BriefcaseIcon,
  },
  {
    name: "Certifications",
    href: "/dashboard/certifications",
    icon: CheckIcon,
  },
  {
    name: "Organizations",
    href: "/dashboard/organizations",
    icon: ListBulletIcon,
  },
  // {
  //   name: "Cover Letter Templates",
  //   href: "/dashboard/cover-templates",
  //   icon: DocumentDuplicateIcon,
  // },
  // {
  //   name: "Cover Letters",
  //   href: "/dashboard/cover",
  //   icon: DocumentDuplicateIcon,
  // },
  {
    name: "Resume Templates",
    href: "/dashboard/resume-templates",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "User Profile",
    href: "/dashboard/user-profile",
    icon: AdjustmentsVerticalIcon,
  },
  // {
  //   name: "Resumes",
  //   href: "/dashboard/resume",
  //   icon: DocumentDuplicateIcon,
  // },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links?.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link?.name}
            href={link?.href}
            className={clsx(
              "flex row h-auto tight-shadow gap-2 rounded-md hover:text-rose-50 hover:font-bold p-2 text-sm font-lite hover:bg-amber-600",
              pathname === link?.href ? "bg-amber-300 " : "bg-amber-50"
            )}
          >
            <LinkIcon className="w-5" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

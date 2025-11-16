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
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("sidenav-link", isActive && "sidenav-link-active")}
          >
            <LinkIcon className="icon" />
            <span className="label">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}

"use client";

import {
  ListBulletIcon,
  AdjustmentsVerticalIcon,
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BookOpenIcon,
  CheckIcon,
  Cog8ToothIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  AdjustmentsHorizontalIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "Your Education",
    href: "/dashboard/education",
    icon: AcademicCapIcon,
  },
  {
    name: "Your Skills",
    href: "/dashboard/skills",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: "Your Applications",
    href: "/dashboard/applications",
    icon: NewspaperIcon,
  },
  {
    name: "Your Companies",
    href: "/dashboard/companies",
    icon: BuildingOffice2Icon,
  },
  {
    name: "Your Work Experience",
    href: "/dashboard/work-experience",
    icon: BriefcaseIcon,
  },
  {
    name: "Your Certifications",
    href: "/dashboard/certifications",
    icon: CheckIcon,
  },
  {
    name: "Your Organizations",
    href: "/dashboard/organizations",
    icon: ListBulletIcon,
  },
  // {
  //   name: "Cover Letter Templates",
  //   href: "/dashboard/cover-templates",
  //   icon: DocumentDuplicateIcon,
  // },
  // {
  //   name: "Cover Letter Styling",
  //   href: "/dashboard/cover-styling",
  //   icon: DocumentDuplicateIcon,
  // },

  {
    name: "Resume Templates",
    href: "/dashboard/resume",
    icon: DocumentDuplicateIcon,
  },
  // {
  //   name: "Resume Styling",
  //   href: "/dashboard/resume/edit/1453bf56-d92f-4893-a6a8-34decd76bbd7",
  //   icon: DocumentDuplicateIcon,
  // },
  {
    name: "User Profile",
    href: "/dashboard/user-profile",
    icon: AdjustmentsVerticalIcon,
  },
  {
    name: "Upgrade to PRO",
    href: "/",
    icon: UserGroupIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[40px] tight-shadow grow items-center justify-center gap-2 rounded-md hover:text-azure-radiance-400  p-3 text-sm font-medium hover:bg-amber-100  md:flex-none md:justify-start md:p-2 md:px-3",
              pathname === link.href
                ? "bg-amber-200 text-azure-radiance-500"
                : "bg-gray-50"
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

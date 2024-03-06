"use client";

import {
  ListBulletIcon,
  AdjustmentsVerticalIcon,
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  // {
  //   name: "Invoices",
  //   href: "/dashboard/invoices",
  //   icon: DocumentDuplicateIcon,
  // },
  // { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
  {
    name: "Applications",
    href: "/dashboard/applications",
    icon: ListBulletIcon,
  },

  {
    name: "Cover Letter Templates",
    href: "/dashboard/cover-templates",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Cover Letter Styling",
    href: "/dashboard/cover-styling",
    icon: DocumentDuplicateIcon,
  },

  {
    name: "Resume Templates",
    href: "/dashboard/resume",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Resume Styling",
    href: "/dashboard/resume/edit/1453bf56-d92f-4893-a6a8-34decd76bbd7",
    icon: DocumentDuplicateIcon,
  },
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
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
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

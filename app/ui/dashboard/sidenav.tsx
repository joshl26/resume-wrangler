// app/ui/dashboard/sidenav.tsx
import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import SignOutButton from "@/app/ui/dashboard/SignOutButton";
import ThemeToggle from "@/app/ui/dashboard/ThemeToggle";

export default function SideNav({ session }: { session: any }) {
  return (
    <div className="relative tour_nav h-full flex flex-col py-4 pl-2 ">
      {/* Logo */}
      <Link
        className="flex flex-row ml-2 mr-2 m-auto justify-start rounded-lg h-[125px] bg-gradient-amber tight-shadow p-4"
        href="/dashboard"
      >
        <AcmeLogo />
      </Link>

      {/* Navigation Links */}
      <div className="flex-1 mt-2 pt-2 pl-2 pb-2 pr-2 gap-1 space-y-1 flex-col overflow-y-auto w-full">
        <NavLinks />
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto pt-2 pl-2 pr-2 space-y-2">
        <ThemeToggle />
        <SignOutButton />
      </div>
    </div>
  );
}

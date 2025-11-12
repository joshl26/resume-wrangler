// SideNav.tsx
import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import SignOutButton from "@/app/ui/dashboard/SignOutButton"; // ✅ Import client component

export default function SideNav({ session }: { session: any }) {
  return (
    <div className="relative tour_nav h-full flex-col py-4 pl-2">
      <Link
        className="flex flex-row ml-2 mr-2 m-auto justify-start rounded-lg h-[125px] bg-gradient-amber tight-shadow p-4"
        href="/dashboard"
      >
        <AcmeLogo />
      </Link>

      <div className="flex mt-2 pt-2 pl-2 pb-2 pr-2 gap-1 space-y-1 flex-col overflow-y-auto w-full">
        <SignOutButton /> {/* ✅ Client component */}
        <NavLinks />
      </div>
    </div>
  );
}

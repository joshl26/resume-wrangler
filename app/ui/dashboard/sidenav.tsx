import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SideNav({ session }: { session: any }) {
  return (
    <div className="relative tour_nav flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 ml-1 flex items-end justify-start rounded-md bg-amber-400 tight-shadow p-4 "
        href="/dashboard"
      >
        <div className="w-32 md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      {session && (
        <span className="font-bold pb-1 px-1">
          Logged in as User:{" "}
          <Link
            href={"/dashboard/user-profile"}
            className="font-light flex hover:text-azure-radiance-600"
          >
            {session?.user.name} ({session?.user.email})
          </Link>
        </span>
      )}
      <div className="flex grow flex-row gap-1 pl-2 pr-2 justify-between space-x-2 space-y-1 md:flex-col md:space-x-0 overflow-y-auto ">
        <form
          action={async () => {
            "use server";
            await signOut({ redirect: true, redirectTo: "/" });
          }}
        >
          <button className="tight-shadow btn btn-amber flex w-full grow items-center justify-center gap-2 rounded-md p-3 md:flex-none md:justify-start md:p-2 md:px-3 hover:animate-pulse">
            <PowerIcon className="w-5" />
            <div className="hidden md:block">
              <p>Sign Out</p>
            </div>
          </button>
        </form>
        <NavLinks />
      </div>
    </div>
  );
}

import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SideNav({ session }: { session: any }) {
  return (
    <div className="relative tour_nav h-full flex-col py-4 pl-2">
      <Link
        className="flex flex-row ml-2 mr-2 m-auto justify-start rounded-lg h-[125px] bg-gradient-amber tight-shadow p-4 "
        href="/dashboard"
      >
        <AcmeLogo />
      </Link>
      {/* {session && (
        <span className="font-bold pb-1 px-1">
          Logged in as User:{" "}
          <Link
            href={"/dashboard/user-profile"}
            className="font-light flex hover:text-azure-radiance-600"
          >
            {session?.user.name} ({session?.user.email})
          </Link>
        </span>
      )} */}
      <div className="flex mt-2 pt-2 pl-2 pb-2 pr-2 gap-1 space-y-1 flex-col overflow-y-auto w-full">
        <form
          className="w-full"
          action={async () => {
            "use server";
            await signOut({ redirect: true, redirectTo: "/" });
          }}
        >
          <button className="tight-shadow btn btn-amber flex w-full items-center gap-2 rounded-full p-1 justify-start mr-1 px-2 hover:animate-pulse">
            <PowerIcon className="w-5" />
            <div className="block">
              <p>Sign Out</p>
            </div>
          </button>
        </form>
        <NavLinks />
      </div>
    </div>
  );
}

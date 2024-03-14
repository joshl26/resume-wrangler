import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Wrangler",
  description: "The official website of Resume Wrangler.",
  metadataBase: new URL("https://resume-wrangler.ca"),
};

export default async function Page() {
  return (
    <div className="min-w-full bg-lime-400">
      <header className="flex flex-row h-20 bg-slate-400">
        <nav className="max-w-screen-xl w-full m-auto flex justify-between">
          <AcmeLogo />
          <div className="text-center flex gap-4">
            <Link
              href="/register"
              className="flex items-center gap-5 self-start rounded-lg bg-[#FC440F] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Create Account</span>
              <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-[#FC440F] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
        </nav>
      </header>
      <main className="min-h-screen max-w-screen-xl w-full m-auto flex ">
        <div className="py-10 flex flex-row w-full">
          <div className="flex flex-col w-3/12">
            <Link href="/">
              <h2 className="py-3 font-bold font">Resume Templates</h2>
            </Link>
            <Link href="/job-boards">
              <h2 className="py-3">Job Boards</h2>
            </Link>
            <Link href="/how-to-use">
              <h2 className="py-3">How to Use</h2>
            </Link>
          </div>
          <div className="flex flex-col w-9/12">
            <div className="bg-stone-300 w-full h-full flex flex-row justify-between">
              <div className="w-[30%] h-[95%] bg-white flex"></div>
              <div className="w-[30%] h-[95%] bg-white flex"></div>
              <div className="w-[30%] h-[95%] bg-white flex"></div>
            </div>
            <div className="bg-stone-300 w-full h-full flex flex-row justify-between">
              <div className="w-[30%] h-[95%] bg-white flex"></div>
              <div className="w-[30%] h-[95%] bg-white flex"></div>
              <div className="w-[30%] h-[95%] bg-white flex"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Wrangler",
  description: "The official website of Resume Wrangler.",
  metadataBase: new URL("https://resume-wrangler.ca"),
};

export default function Page() {
  return (
    <div className="min-w-full">
      <header className="flex flex-row h-20 bg-slate-400">
        <nav className="max-w-screen-xl w-full m-auto flex justify-between">
          <AcmeLogo />
          <div className="text-center flex gap-4">
            <Link
              href="/Create Account"
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
      <main className="min-h-screen bg-lime-400">
        <div></div>
      </main>
    </div>
  );
}

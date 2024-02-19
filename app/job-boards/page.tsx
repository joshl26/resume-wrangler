"use client";

import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Resume Wrangler",
//   description: "The official website of Resume Wrangler.",
//   metadataBase: new URL("https://resume-wrangler.ca"),
// };

export default function Page() {
  const [jobTitle, setJobTitle] = useState<string>();

  return (
    <div className="min-w-full  bg-lime-400">
      <header className="flex flex-row h-20 bg-slate-400">
        <nav className="max-w-screen-xl w-full m-auto flex justify-between">
          <AcmeLogo />
          <div className="text-center flex gap-4">
            <Link
              href="/new-user"
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
              <h2 className="py-3  font">Resume Templates</h2>
            </Link>
            <Link href="/job-boards">
              <h2 className="py-3 font-bold">Job Boards</h2>
            </Link>
            <Link href="/how-to-use">
              <h2 className="py-3 ">How to Use</h2>
            </Link>
          </div>
          <div className="flex flex-col w-9/12 bg-stone-300 py-4 px-4">
            <h2 className="text-2xl font-semibold">What is your job title?</h2>
            <p className="py-2">
              Type in the job position you are looking for.
            </p>
            <input
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Software Engineer"
            ></input>
            <div className="border-b-2 border-black h-4 w-full"></div>
            <div className="border-b-2 border-black w-full">
              {jobTitle ? (
                <a href={`https://ca.indeed.com/jobs?q=${jobTitle}`}>
                  <h2 className="py-2 text-3xl">indeed</h2>
                </a>
              ) : (
                <a href="https://ca.indeed.com/jobs?q=software+engineer">
                  <h2 className="py-2 text-3xl">indeed</h2>
                </a>
              )}
            </div>

            <div className="border-b-2 border-black w-full">
              {jobTitle ? (
                <a href={`https://www.monster.ca/jobs/search?q=${jobTitle}`}>
                  <h2 className="py-2 text-3xl">MONSTER</h2>
                </a>
              ) : (
                <a href="https://ca.indeed.com/jobs?q=software+engineer">
                  <h2 className="py-2 text-3xl">MONSTER</h2>
                </a>
              )}
            </div>
            <div className="border-b-2 border-black w-full">
              <h2 className="py-2 text-3xl">glassdoor</h2>
            </div>
            <div className="border-b-2 border-black w-full">
              <h2 className="py-2 text-3xl">LinkedIn</h2>
            </div>
            <div className="border-b-2 border-black w-full">
              <h2 className="py-2 text-3xl">Google</h2>
            </div>
            <div className="border-b-2 border-black w-full">
              <h2 className="py-2 text-3xl">Jooble</h2>
            </div>
            <div className="border-b-2 border-black w-full">
              <h2 className="py-2 text-3xl">Simply Hired</h2>
            </div>
            <div className="border-b-2 border-black w-full">
              <h2 className="py-2 text-3xl">Zip Recruiter</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

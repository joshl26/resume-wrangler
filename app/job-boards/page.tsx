"use client";

import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Metadata } from "next";

type Search = {
  id: number;
  name: string;
  url: string | "";
  searchUrl: string | "";
  logoImage: string | "";
};

const searchProviders = [
  {
    id: 1,
    name: "indeed",
    url: "https://ca.indeed.com/",
    searchUrl: "https://ca.indeed.com/jobs?q=",
    logoImage: "/logo-indeed.svg",
  },
  {
    id: 2,
    name: "MONSTER",
    url: "https://www.monster.ca/",
    searchUrl: "https://www.monster.ca/jobs/search?q=",
    logoImage: "/logo-monster.png",
  },
  {
    id: 3,
    name: "glassdoor",
    url: "https://www.glassdoor.ca/",
    searchUrl: "https://www.glassdoor.ca/Job/jobs.htm?sc.keyword=",
    logoImage: "/logo-glassdoor.png",
  },
  {
    id: 4,
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    searchUrl: "https://www.linkedin.com/jobs/search?keywords=",
    logoImage: "/logo-linkedin.svg",
  },
  {
    id: 5,
    name: "Google",
    url: "https://www.google.com/",
    searchUrl: "https://www.google.com/search?q=&oq=&ibp=htl;jobs",
    logoImage: "/logo-google.svg",
  },
  {
    id: 6,
    name: "jooble",
    url: "https://jooble.org/",
    searchUrl: "https://jooble.org/SearchResult?ukw=",
    logoImage: "/logo-jooble.svg",
  },
  {
    id: 7,
    name: "SimplyHired",
    url: "https://www.simplyhired.com/",
    searchUrl: "https://www.simplyhired.com/search?q=",
    logoImage: "logo-simply-hired.png",
  },
  {
    id: 8,
    name: "ZipRecruiter",
    url: "https://www.ziprecruiter.com/",
    searchUrl: "https://www.ziprecruiter.com/jobs-search?search=",
    logoImage: "logo-zip-recruiter.svg",
  },
  {
    id: 9,
    name: "snagajob",
    url: "https://www.snagajob.com/",
    searchUrl: "https://www.snagajob.com/search?q=",
    logoImage: "logo-snagajob.jpg",
  },
  {
    id: 10,
    name: "CAREERBUILDER",
    url: "https://www.careerbuilder.com/",
    searchUrl: "https://www.careerbuilder.com/jobs?emp=&keywords=",
    logoImage: "logo-career-builder.png",
  },
  {
    id: 11,
    name: "idealist",
    url: "https://www.idealist.org/",
    searchUrl: "https://www.idealist.org/en/jobs?q=",
    logoImage: "logo-idealist.png",
  },
];

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

            {searchProviders.map((provider) =>
              jobTitle ? (
                <div
                  key={provider.id}
                  className="border-b-2 border-black w-full"
                >
                  <a href={`${provider.searchUrl}${jobTitle}`}>
                    <h2 className="py-2 text-3xl">{provider.name}</h2>
                  </a>
                </div>
              ) : (
                <div
                  key={provider.id}
                  className="border-b-2 border-black w-full"
                >
                  <a key={provider.id} href={provider.url}>
                    <h2 className="py-2 text-3xl">{provider.name}</h2>
                  </a>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

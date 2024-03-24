import AcmeLogo from "@/app/ui/acme-logo";
import Link from "next/link";

import { Metadata } from "next";
import Image from "next/image";
import Landing from "./landing/page";

export const metadata: Metadata = {
  title: "Resume Wrangler",
  description:
    "Tame your Job Search in seconds. Try Resume Wrangler FREE today!",
  metadataBase: new URL("https://resume-wrangler.vercel.app/"),
};

export default async function Page() {
  return (
    <Landing>
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
    </Landing>
  );
}

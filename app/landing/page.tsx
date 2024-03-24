import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import ResumeWranglerIcon from "/public/ResumeWranglerLogo.png";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Landing = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="min-w-full bg-lime-400">
        <header className="flex flex-row h-20 bg-slate-400">
          <nav className="max-w-screen-xl w-full m-auto flex justify-between">
            <div className="h-[50px] w-[50px] rounded">
              <Image width={0} height={0} alt="" src={ResumeWranglerIcon} />
            </div>
            {/* <AcmeLogo /> */}
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
          {children}
        </main>
      </div>
    </>
  );
};

export default Landing;

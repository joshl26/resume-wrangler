import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import ResumeWranglerIcon from "/public/ResumeWranglerLogo-white.png";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Landing = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-50 h-[3000px]">
      <header className="bg-gray-50 w-screen h-20 justify-between fixed t-0 pt-4">
        <nav className=" max-w-screen-xl w-auto  m-auto ">
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col w-1/2">
              <div className="h-[50px] w-[50px]">
                <Image
                  className="rounded opacity-70"
                  width={0}
                  height={0}
                  alt=""
                  src={ResumeWranglerIcon}
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <div className="flex flex-row justify-end gap-2">
                <Link
                  href="/register"
                  className="w-auto rounded-full bg-gray-50 px-6 py-3  "
                >
                  Create Account
                </Link>
                <Link
                  href="/login"
                  className="rounded-full bg-rose-600 px-6 py-3 font-medium text-white"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
          {/* <AcmeLogo /> */}
        </nav>
      </header>
      <main className="min-h-screen max-w-screen-xl w-full m-auto flex ">
        {children}
      </main>
    </div>
  );
};

export default Landing;

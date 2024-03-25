import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import LandingNavBar from "../ui/landing/landing-navbar";

const Landing = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-50 h-[3000px]">
      <LandingNavBar />
      <main className="min-h-screen max-w-screen-xl w-full m-auto flex ">
        {children}
      </main>
    </div>
  );
};

export default Landing;

import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import LandingNavBar from "../ui/landing/landing-navbar";

const Landing = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-amber-50">
      <LandingNavBar />
      <main className="max-w-screen-xl w-full h-full m-auto ">{children}</main>
    </div>
  );
};

export default Landing;

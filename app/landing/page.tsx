"use client";

import React from "react";
import LandingNavBar from "../ui/landing/landing-navbar";
import LandingFooter from "../ui/landing/landing-footer";

export default function Landing({ children }: { children?: React.ReactNode }) {
  return (
    <div className="overflow-x-hidden">
      <LandingNavBar />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
}

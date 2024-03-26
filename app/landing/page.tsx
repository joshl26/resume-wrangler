import React, { ReactNode } from "react";
import LandingNavBar from "../ui/landing/landing-navbar";
import LandingFooter from "../ui/landing/landing-footer";

const Landing = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-amber-50 overflow-x-hidden">
      <LandingNavBar />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
};

export default Landing;

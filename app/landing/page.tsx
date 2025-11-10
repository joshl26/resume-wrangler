import React from "react";
import LandingNavBar from "@/ui/landing/landing-navbar";
import LandingFooter from "@/ui/landing/landing-footer";

export default function Landing({ children }: { children?: React.ReactNode }) {
  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col">
      <header>
        <LandingNavBar />
      </header>

      <main className="flex-1" aria-live="polite" role="main">
        {children}
      </main>

      <footer>
        <LandingFooter />
      </footer>
    </div>
  );
}

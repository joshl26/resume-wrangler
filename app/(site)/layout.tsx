// app/(site)/layout.tsx
import React from "react";
import LandingNavBar from "@/app/ui/landing/landing-navbar";
import LandingFooter from "@/app/ui/landing/landing-footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col">
      <header>
        <LandingNavBar />
      </header>
      {children}
      <footer>
        <LandingFooter />
      </footer>
    </div>
  );
}

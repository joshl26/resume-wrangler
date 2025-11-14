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
    <>
      <header>
        <LandingNavBar />
      </header>

      <main>{children}</main>

      <footer>
        <LandingFooter />
      </footer>
    </>
  );
}

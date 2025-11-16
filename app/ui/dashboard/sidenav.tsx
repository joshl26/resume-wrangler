// app/ui/dashboard/sidenav.tsx
import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import SignOutButton from "@/app/ui/dashboard/SignOutButton";
import ThemeToggle from "@/app/ui/dashboard/ThemeToggle";

export default function SideNav({ session }: { session: any }) {
  return (
    <aside className="sidenav" aria-label="Primary navigation">
      <Link
        href="/dashboard"
        className="sidenav-logo"
        aria-label="Dashboard home"
      >
        <AcmeLogo />
        {/* Optionally ensure AcmeLogo includes an element with className="logo-img" and a text with className="logo-text" */}
      </Link>

      <nav className="sidenav-links" aria-label="Main">
        <NavLinks />
      </nav>

      <div className="sidenav-actions">
        <ThemeToggle />
        <SignOutButton />
      </div>
    </aside>
  );
}

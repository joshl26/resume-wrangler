"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ResumeWranglerIcon from "@/public/images/ResumeWranglerLogo-white.png";
import Link from "next/link";

function setThemeCookie(theme: "light" | "dark") {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `theme=${theme}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

const LandingNavBar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    setThemeCookie(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    setTheme(next);
  };

  return (
    <>
      {/* spacer to avoid content jumping under fixed navbar */}
      <div className="landing-nav-placeholder" />

      <nav
        className="landing-nav"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="landing-nav-inner">
          {/* Left: logo */}
          <div className="nav-left">
            <Link href="/" aria-label="Home" className="nav-logo">
              <Image
                src={ResumeWranglerIcon}
                alt="Resume Wrangler"
                width={40}
                height={40}
                className="logo-svg"
              />
              <span className="nav-brand">Resume Wrangler</span>
            </Link>
          </div>

          {/* Center: desktop links */}
          <div className="nav-center hidden lg:flex">
            <div className="nav-links" role="menubar" aria-label="Primary">
              <Link href="/resume-templates" className="nav-link">
                Resume Templates
              </Link>
              <Link href="/job-boards" className="nav-link">
                Job Boards
              </Link>
            </div>
          </div>

          {/* Right: actions */}
          <div className="nav-right">
            <div className="nav-actions hidden lg:flex items-center">
              <button
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                aria-pressed={theme === "dark"}
                onClick={toggleTheme}
                className="theme-toggle icon-btn"
                title="Toggle color mode"
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M10 4.5a.75.75 0 01.75.75V7a.75.75 0 01-1.5 0V5.25A.75.75 0 0110 4.5zM10 13a3 3 0 100-6 3 3 0 000 6zm5.25-3a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h1.999a.75.75 0 01-.749-.75zM5 10a.75.75 0 01.75-.75H7a.75.75 0 010 1.5H5.75A.75.75 0 015 10zm7.032 4.032a.75.75 0 011.06 1.06l-.707.707a.75.75 0 11-1.06-1.06l.707-.707zM6.615 5.615a.75.75 0 011.06 0l.707.707a.75.75 0 11-1.06 1.06l-.707-.707a.75.75 0 010-1.06zM14.09 5.91a.75.75 0 010 1.06l-.707.707a.75.75 0 11-1.06-1.06l.707-.707a.75.75 0 011.06 0zM6.616 14.384a.75.75 0 010-1.06l.707-.707a.75.75 0 111.06 1.06l-.707.707a.75.75 0 01-1.06 0z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M17.293 13.293A8 8 0 116.707 2.707 7 7 0 1017.293 13.293z" />
                  </svg>
                )}
              </button>

              <Link href="/login" className="login-btn">
                Log in
              </Link>

              <Link href="/register" className="signup-btn">
                Create Account
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                className="menu-toggle"
                aria-expanded={showMenu}
                aria-controls="mobile-menu"
                onClick={() => setShowMenu((s) => !s)}
                aria-label={showMenu ? "Close menu" : "Open menu"}
              >
                {showMenu ? (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden>
                    <path fill="currentColor" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`mobile-menu ${showMenu ? "mobile-menu-open" : ""}`}
        >
          <div className="mobile-links">
            <Link
              href="/resume-templates"
              className="mobile-link"
              onClick={() => setShowMenu(false)}
            >
              Resume Templates
            </Link>
            <Link
              href="/job-boards"
              className="mobile-link"
              onClick={() => setShowMenu(false)}
            >
              Job Boards
            </Link>

            <div className="mobile-actions">
              <div className="flex gap-2">
                <button
                  className="theme-toggle px-3 py-2 rounded-md w-1/2"
                  onClick={() => {
                    toggleTheme();
                    setShowMenu(false);
                  }}
                >
                  {theme === "dark" ? "Light" : "Dark"}
                </button>

                <Link
                  href="/login"
                  className="login-btn w-1/2 text-center px-3 py-2"
                  onClick={() => setShowMenu(false)}
                >
                  Log in
                </Link>
              </div>

              <Link
                href="/register"
                className="signup-btn block w-full text-center mt-3 px-3 py-2"
                onClick={() => setShowMenu(false)}
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LandingNavBar;

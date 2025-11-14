// app/ui/landing/landing-footer.tsx
import React from "react";
import Logo from "@/public/ResumeWranglerLogo.svg";
import Link from "next/link";

const LandingFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="landing-footer">
      <div className="landing-footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            {/* If your Logo is an SVG React component (SVGR) the props below are fine.
                If it's an exported URL for next/image, switch to <Image ... /> instead. */}
            <Logo className="logo-svg" width={72} height={72} aria-hidden />
          </div>

          <div className="footer-title">
            <span className="text-2xl font-semibold leading-tight">
              Resume
              <br />
              Wrangler
            </span>
          </div>
        </div>

        <ul className="footer-links" role="list">
          <li>
            <Link aria-label="blog" href="/blog" className="footer-link">
              Blog
            </Link>
          </li>

          <li>
            <a
              aria-label="email"
              href="mailto:joshlehman.dev@gmail.com"
              className="footer-link"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      <hr className="footer-divider" />

      <div className="landing-footer-copy">
        <span className="text-sm">
          © {year}{" "}
          <a
            aria-label="website"
            href="https://joshlehman.ca/"
            className="footer-link underline"
          >
            Blackrock Design Haus
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default LandingFooter;

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
            {/* SVGR component (keeps accessible-hidden if decorative) */}
            <Logo className="logo-svg" aria-hidden />
          </div>

          <div>
            <div className="footer-title">Resume Wrangler</div>
            <div className="footer-tagline">Build better resumes, faster</div>
          </div>
        </div>

        <nav aria-label="Footer" className="footer-links">
          <a href="/contact" className="footer-link">
            Contact
          </a>

          <Link href="/privacy-policy" className="footer-link">
            Privacy
          </Link>

          <Link href="/terms-of-service" className="footer-link">
            Terms
          </Link>
        </nav>
      </div>

      <hr className="footer-divider" />

      <div className="landing-footer-copy flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          © {year}{" "}
          <a
            aria-label="website"
            href="https://joshlehman.ca/"
            className="footer-link underline"
          >
            Blackrock Design Haus
          </a>
          . All Rights Reserved.
        </div>

        <div className="footer-social flex items-center gap-3">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="footer-link p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              role="img"
            >
              <title>GitHub</title>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.071 1.532 1.033 1.532 1.033.892 1.529 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.111-4.555-4.944 0-1.091.39-1.983 1.029-2.68-.103-.254-.447-1.274.098-2.656 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.026 2.748-1.026.546 1.383.202 2.402.099 2.656.64.697 1.028 1.589 1.028 2.68 0 3.842-2.339 4.687-4.566 4.935.36.31.682.923.682 1.861 0 1.344-.012 2.427-.012 2.757 0 .268.18.58.688.481C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="footer-link"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M22 5.8c-.6.3-1.3.5-2 .6.7-.4 1.2-1 1.4-1.8-.6.4-1.3.7-2 .9C18.8 4.7 17.9 4.3 17 4.3c-1.7 0-3 1.5-2.6 3.1C11 7.1 8.3 5.9 6.3 4c-.8 1.3-.3 3 1 3.8-.5 0-1-.2-1.4-.4 0 1.5 1 2.8 2.6 3.1-.4.1-.8.1-1.2.1-.3 0-.6 0-.8-.1.6 1.9 2.4 3.3 4.5 3.3-1.6 1.2-3.6 1.9-5.7 1.9-.4 0-.8 0-1.1-.1 2 1.3 4.4 2 6.9 2 8.3 0 12.9-7 12.9-13v-.6c.8-.6 1.4-1.2 1.9-2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;

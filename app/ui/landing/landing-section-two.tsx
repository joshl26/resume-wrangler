import React, { JSX } from "react";

type Logo = {
  id: string;
  name: string;
  href?: string;
  svg: React.ReactNode;
};

export default function LandingTwo(): JSX.Element {
  const logos: Logo[] = [
    {
      id: "indeed",
      name: "Indeed",
      href: "https://www.indeed.com",
      svg: (
        <svg
          role="img"
          aria-labelledby="indeedTitle"
          viewBox="0 0 220 50"
          preserveAspectRatio="xMidYMid meet"
          className="lt-logo-svg lt-indeed"
        >
          <title id="indeedTitle">Indeed</title>
          <text
            x="0"
            y="36"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="700"
            fontSize="32"
            fill="#0f71b7"
          >
            indeed
          </text>
          <circle cx="183" cy="34" r="5" fill="#0f71b7" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      href: "https://www.linkedin.com",
      svg: (
        <svg
          role="img"
          aria-labelledby="linkedinTitle"
          viewBox="0 0 80 80"
          preserveAspectRatio="xMidYMid meet"
          className="lt-logo-svg lt-linkedin"
        >
          <title id="linkedinTitle">LinkedIn</title>
          <rect x="0" y="0" width="80" height="80" rx="14" fill="#0A66C2" />
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="700"
            fontSize="30"
            fill="#fff"
          >
            in
          </text>
        </svg>
      ),
    },
    {
      id: "ziprecruiter",
      name: "ZipRecruiter",
      href: "https://www.ziprecruiter.com",
      svg: (
        <svg
          role="img"
          aria-labelledby="zipTitle"
          viewBox="0 0 260 60"
          preserveAspectRatio="xMidYMid meet"
          className="lt-logo-svg lt-zip"
        >
          <title id="zipTitle">ZipRecruiter</title>
          <text
            x="0"
            y="40"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="700"
            fontSize="34"
            fill="#6B46C1"
          >
            ZipRecruiter
          </text>
        </svg>
      ),
    },
    {
      id: "monster",
      name: "Monster",
      href: "https://www.monster.com",
      svg: (
        <svg
          role="img"
          aria-labelledby="monsterTitle"
          viewBox="0 0 220 60"
          preserveAspectRatio="xMidYMid meet"
          className="lt-logo-svg lt-monster"
        >
          <title id="monsterTitle">Monster</title>
          <g fill="#00AEEF" transform="translate(0,0)">
            <text
              x="0"
              y="42"
              fontFamily="Arial Black, Helvetica, sans-serif"
              fontWeight="900"
              fontSize="36"
            >
              Monster
            </text>
          </g>
        </svg>
      ),
    },
    {
      id: "google",
      name: "Google",
      href: "https://careers.google.com",
      svg: (
        <svg
          role="img"
          aria-labelledby="googleTitle"
          viewBox="0 0 48 48"
          preserveAspectRatio="xMidYMid meet"
          className="lt-logo-svg lt-google"
        >
          <title id="googleTitle">Google</title>
          {/* Simplified 'G' mark (multi-color) */}
          <path
            d="M23.5 9.5c3 0 5.5 1.1 7.6 3l-3.1 3.1c-1-0.9-2.4-1.5-4.5-1.5-3.6 0-6.6 2.4-7.7 5.6l-3.2-0.3C12.3 12.3 17.4 9.5 23.5 9.5z"
            fill="#4285F4"
          />
          <path
            d="M11.8 22.9c0 1.6 0.4 3 1.3 4.3l-3 2.3C8 26.8 7.5 24.9 7.5 23c0-1.9 0.5-3.7 1.3-5.2l3 4.9z"
            fill="#FBBC05"
          />
          <path
            d="M23.5 36.5c4.8 0 8.8-2 11.2-5.1l-3.7-3c-1 1.4-3.1 2.6-7.5 2.6-4 0-6.6-1.9-8.4-4.6l-3 2.3c2.1 4.5 6.7 7.8 11.4 7.8z"
            fill="#34A853"
          />
          <path
            d="M36.6 35.9c2.1-2 3.6-4.7 3.6-7.7 0-0.6-0.1-1.2-0.2-1.8H23.5v5.7h8.6c-0.5 2.6-2.3 4.5-4.9 5.6l3.4 3.2z"
            fill="#EA4335"
          />
        </svg>
      ),
    },
    {
      id: "jooble",
      name: "Jooble",
      href: "https://jooble.org",
      svg: (
        <svg
          role="img"
          aria-labelledby="joobleTitle"
          viewBox="0 0 220 60"
          preserveAspectRatio="xMidYMid meet"
          className="lt-logo-svg lt-jooble"
        >
          <title id="joobleTitle">Jooble</title>
          <text
            x="0"
            y="40"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="700"
            fontSize="36"
            fill="#0066CC"
          >
            Jooble
          </text>
        </svg>
      ),
    },
  ];

  return (
    <section className="landing-two" aria-labelledby="partnersHeading">
      <div className="landing-two-inner">
        <h2 id="partnersHeading" className="landing-two-title">
          Trusted by top job platforms
        </h2>
        <p className="landing-two-sub">
          We integrate with leading job boards to help you find the best
          opportunities.
        </p>

        <ul
          className="landing-logos"
          role="list"
          aria-label="Job board partners"
        >
          {logos.map((logo) => (
            <li key={logo.id} className="landing-logo-item">
              <a
                className="logo-link"
                href={logo.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${logo.name}`}
                title={logo.name}
              >
                {logo.svg}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

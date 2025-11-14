import React from "react";
import Indeed from "@/public/logo-indeed.svg";
import LinkedIn from "@/public/logo-linkedin.svg";
import ZipRecruiter from "@/public/logo-zip-recruiter.svg";
import Monster from "@/public/monster.svg";
import Google from "@/public/logo-google.svg";
import Jooble from "@/public/logo-jooble.svg";

const logos = [
  { Component: Indeed, alt: "Indeed" },
  { Component: LinkedIn, alt: "LinkedIn" },
  { Component: ZipRecruiter, alt: "ZipRecruiter" },
  { Component: Jooble, alt: "Jooble" },
  { Component: Google, alt: "Google" },
  { Component: Monster, alt: "Monster" },
];

const LandingTwo: React.FC = () => {
  return (
    <section className="landing-two">
      <div className="landing-two-inner">
        <h3 className="landing-two-pretitle">What we do</h3>

        <p className="landing-two-hero">
          Most people spend a large chunk of their life at work… <br />
          Choose a company AND a career you’ll love!
        </p>

        <p className="landing-two-lead">
          Setting us apart from other custom resume generators is our
          understanding that applicants deserve to find their dream company, not
          just their dream role.
        </p>

        <p className="landing-two-lead mt-6">
          We used cutting edge technology and artificial intelligence to design
          this app — all while keeping simplicity in mind.
        </p>

        <div
          className="landing-two-logos"
          role="list"
          aria-label="partner logos"
        >
          {logos.map((l, i) => {
            const LogoComp = l.Component;
            // If the SVG component forwards className the next line will work.
            // If not, the wrapper <div className="logo-item"> ensures styling still applies.
            return (
              <div key={i} className="logo-item" role="listitem" title={l.alt}>
                <LogoComp className="logo-svg" aria-hidden alt={l.alt} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingTwo;

"use client";

import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import FormAnimation from "@/public/lottie/form.json";
import SkillsAnimation from "@/public/lottie/skills.json";
import SubmissionAnimation from "@/public/lottie/submission.json";
import OrangeBlob from "./orange-blob";
import PurpleBlob from "./purple-blob";

const Step: React.FC<{
  index: number;
  animation: any;
  title?: string;
  desc: string;
}> = ({ index, animation, title, desc }) => {
  return (
    <div className="landing-three-step">
      <div className="landing-three-step-index" aria-hidden>
        {index}
      </div>

      <div className="landing-three-lottie" aria-hidden>
        <Lottie animationData={animation} loop={true} />
      </div>

      <div className="landing-three-step-body">
        {title && <h3 className="landing-three-step-title">{title}</h3>}
        <p className="landing-three-step-desc">{desc}</p>
      </div>
    </div>
  );
};

const LandingThree: React.FC = () => {
  return (
    <section className="landing-three relative w-full pb-24">
      {/* Decorative blobs: pass both shared and positional classes */}
      <PurpleBlob className="hero-blob hero-blob-purple" />
      <OrangeBlob className="hero-blob hero-blob-orange" />

      <div className="landing-three-inner">
        <div className="text-center">
          <h2 className="landing-three-pretitle">How it works</h2>
          <h3 className="landing-three-heading">
            Our software is extremely easy to use.
          </h3>
        </div>

        <div
          className="landing-three-steps"
          role="list"
          aria-label="How it works steps"
        >
          <Step
            index={1}
            animation={FormAnimation}
            desc="Register your account on our website — all you need is a valid email address."
          />
          <Step
            index={2}
            animation={SkillsAnimation}
            desc="Add previous work experiences, skills, education and more. Your details are saved for future visits."
          />
          <Step
            index={3}
            animation={SubmissionAnimation}
            desc="Build and submit your perfect resume from our curated templates!"
          />
        </div>

        <div className="landing-three-cta">
          <Link
            href="/register"
            className="btn btn-amber landing-three-cta-btn"
            aria-label="Create an account"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingThree;

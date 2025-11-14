import { Metadata } from "next";
import LandingOne from "../ui/landing/landing-section-one";
import LandingTwo from "../ui/landing/landing-section-two";
import LandingThree from "../ui/landing/landing-section-three";
import LandingFour from "../ui/landing/landing-section-four";

export const metadata: Metadata = {
  title: "Résumé Wrangler",
  description:
    "Tame your Job Search in seconds. Sign up and try the Resume Wrangler for FREE",
  metadataBase: new URL(`${process.env.DEPLOYMENT_URL}`),
};

export default async function Page() {
  return (
    <main
      className="overflow-x-hidden min-h-screen flex flex-col"
      aria-live="polite"
      role="main"
    >
      <LandingOne />
      <LandingTwo />
      <LandingThree />
      <LandingFour />
    </main>
  );
}

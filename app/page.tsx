import { Metadata } from "next";
import Landing from "./landing/page";
import LandingOne from "./ui/landing/landing-section-one";
import LandingTwo from "./ui/landing/landing-section-two";
import LandingThree from "./ui/landing/landing-section-three";
import LandingFour from "./ui/landing/landing-section-four";

export const metadata: Metadata = {
  title: "Resume Wrangler",
  description:
    "Tame your Job Search in seconds. Sign up and try the Resume Wrangler for FREE",
  metadataBase: new URL(`${process.env.DEPLOYMENT_URL}`),
};

export default async function Page() {
  return (
    <Landing>
      <LandingOne />
      <LandingTwo />
      <LandingThree />
      <LandingFour />
    </Landing>
  );
}

import AcmeLogo from "@/app/ui/acme-logo";
import Link from "next/link";

import { Metadata } from "next";
import Image from "next/image";
import Landing from "./landing/page";
import LandingOne from "./ui/landing/landing-section-one";
import LandingTwo from "./ui/landing/landing-section-two";
import LandingThree from "./ui/landing/landing-section-three";
import LandingFour from "./ui/landing/landing-section-four";

export const metadata: Metadata = {
  title: "Résumé Wrangler",
  description:
    "Tame your Job Search in seconds. Try Résumé Wrangler FREE today!",
  metadataBase: new URL("https://resume-wrangler.vercel.app/"),
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

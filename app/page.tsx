import AcmeLogo from "@/app/ui/acme-logo";
import Link from "next/link";

import { Metadata } from "next";
import Image from "next/image";
import Landing from "./landing/page";
import Lasso from "/public/LassoBlack.svg";
import Indeed from "/public/logo-indeed.svg";
import LinkedIn from "/public/logo-linkedin.svg";
import ZipRecruiter from "/public/logo-zip-recruiter.svg";
import Monster from "/public/monster.svg";
import Google from "/public/logo-google.svg";
import Jooble from "/public/logo-jooble.svg";

export const metadata: Metadata = {
  title: "Resume Wrangler",
  description:
    "Tame your Job Search in seconds. Try Resume Wrangler FREE today!",
  metadataBase: new URL("https://resume-wrangler.vercel.app/"),
};

export default async function Page() {
  return (
    <Landing>
      <div className="max-w-screen-xl m-auto">
        <div className="flex flex-row items-center pt-32 pb-20">
          <div className="flex flex-col w-1/2 ">
            <Image className="mx-auto" alt="" src={Lasso} />
          </div>
          <div className="flex flex-col w-1/2">
            <h1 className="text-[6rem] font-bold leading-tight">
              Tame your Job Search.
            </h1>
          </div>
        </div>
      </div>
      <div className="h-auto w-full left-0 bg-azure-radiance-900 pb-20">
        <div className="flex flex-row justify-center pt-20">
          <h2 className="font-medium text-center text-white text-[1.25rem]">
            What we do
          </h2>
        </div>
        <div className="flex flex-row justify-center pt-2">
          <span className="text-white font-bold text-[2.5rem] max-w-screen-xl text-center bg-gradient-harvest text-transparent bg-clip-text">
            Most people spend a large chunk of their life at work… <br></br>
            Choose a company AND a career you’ll love!
          </span>
        </div>
        <div className="flex flex-row justify-center pt-16">
          <h2 className="font-medium text-center text-white max-w-screen-lg text-[1.25rem]">
            Setting us apart from other custom resume generators is our
            understanding that applicants deserve to find their dream company,
            not just their dream role.
          </h2>
        </div>
        <div className="flex flex-row justify-center pt-16">
          <h2 className="font-medium text-center text-white max-w-screen-lg text-[1.25rem]">
            We used cutting edge technology and artifical intelligence to design
            this app. All the while keeping in mind that simplicity is best.
            With this in mind I think you will apppreciate the application we
            have developed.
          </h2>
        </div>
        <div className="flex flex-row flex-wrap max-w-screen-xl items-center m-auto justify-center  gap-10 pt-32">
          <div className="flex flex-col h-[100px] p-3 md:mb-12">
            <Image
              className="w-full h-full"
              width={100}
              height={100}
              alt=""
              src={Indeed}
            />
          </div>
          <div className="flex flex-col h-[100px] p-3 md:mb-12">
            <Image
              className="w-full h-full"
              width={100}
              height={100}
              alt=""
              src={LinkedIn}
            />
          </div>
          <div className="flex flex-col h-[100px]  p-3 md:mb-12">
            <Image
              className="w-full h-full"
              width={100}
              height={100}
              alt=""
              src={ZipRecruiter}
            />
          </div>
          <div className="flex flex-col h-[100px] p-3">
            <Image
              className="w-full h-full"
              width={100}
              height={100}
              alt=""
              src={Jooble}
            />
          </div>
          <div className="flex flex-col h-[100px] p-3">
            <Image
              className="w-full h-full"
              width={100}
              height={100}
              alt=""
              src={Google}
            />
          </div>
          <div className="flex flex-col h-[100px]  p-3">
            <Image
              className="w-full h-full"
              width={100}
              height={100}
              alt=""
              src={Monster}
            />
          </div>
        </div>
      </div>
      <div className="h-[2000px]"></div>
      <div className="h-[2000px] w-full left-0 bg-gradient-harvest"></div>
      <div className="h-[2000px]"></div>
    </Landing>
  );
}

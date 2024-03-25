import AcmeLogo from "@/app/ui/acme-logo";
import Link from "next/link";

import { Metadata } from "next";
import Image from "next/image";
import Landing from "./landing/page";
import Lasso from "/public/LassoBlack.svg";

export const metadata: Metadata = {
  title: "Resume Wrangler",
  description:
    "Tame your Job Search in seconds. Try Resume Wrangler FREE today!",
  metadataBase: new URL("https://resume-wrangler.vercel.app/"),
};

export default async function Page() {
  return (
    <Landing>
      <div className="max-w-screen-xl w-screen">
        <div className="flex flex-row items-center">
          <div className="flex flex-col w-1/2 pt-32">
            <Image className="mx-auto" alt="" src={Lasso} />
          </div>
          <div className="flex flex-col w-1/2">
            <h1 className="text-[4.5rem] font-bold leading-tight">
              Tame your Job Search.
            </h1>
          </div>
        </div>
      </div>
      <div className="h-[1000px]  ">
        <div className="absolute w-full h-[300px] left-0 bg-azure-radiance-950"></div>
      </div>
    </Landing>
  );
}

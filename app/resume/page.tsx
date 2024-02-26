"use client";

import React from "react";
import Classic from "../ui/resume/classic/page";
import { user } from "../data/user-details";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();

  const bodyFont = searchParams.get("bodyFont")!;
  const headerFont = searchParams.get("headerFont")!;

  return (
    <div>
      <Classic user={user} bodyFont={bodyFont} headingFont={headerFont} />
    </div>
  );
};

export default Page;

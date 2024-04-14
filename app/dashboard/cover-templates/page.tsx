import React from "react";
import ResumeTemplates from "@/app/ui/resume-templates/resume-templates";
import { fetchCoverTemplates, fetchResumeTemplates } from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import { notFound } from "next/navigation";
import CoverTemplates from "@/app/ui/cover-templates/cover-templates";

export default async function Page() {
  const coverTemplates = await fetchCoverTemplates();

  if (!coverTemplates) {
    notFound();
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-row px-3 pb-3">
        <h1 className="text-lg text-[2rem] font-bold">
          Start with one of our Cover Letter Templates
        </h1>
      </div>
      <CoverTemplates coverTemplates={coverTemplates} />
    </div>
  );
}

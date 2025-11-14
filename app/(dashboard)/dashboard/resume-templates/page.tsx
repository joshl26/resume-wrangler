// app/dashboard/resume-templates/page.tsx
import React, { JSX } from "react";
import ResumeTemplates from "@/app/ui/resume-templates/resume-templates";
import { fetchResumeTemplates } from "@/app/lib/data";
import { notFound } from "next/navigation";
import type { ResumeTemplate } from "@/app/lib/definitions";

/** Type guard to filter out null/undefined entries from arrays */
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page(): Promise<JSX.Element> {
  const resumeTemplatesRaw = await fetchResumeTemplates();

  // Normalize and filter out any null/undefined entries that might come from the data layer
  const resumeTemplates = (resumeTemplatesRaw ?? []).filter(
    notNull,
  ) as ResumeTemplate[];

  // If you want to allow an empty list instead of a 404, remove this check.
  if (!resumeTemplates.length) {
    return notFound();
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-row px-3 pb-3">
        <h1 className="text-lg text-[2rem] font-bold">
          Start with one of our Résumé Templates
        </h1>
      </div>
      <ResumeTemplates resumeTemplates={resumeTemplates} />
    </div>
  );
}

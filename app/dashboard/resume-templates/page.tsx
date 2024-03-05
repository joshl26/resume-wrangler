import React from "react";
import { getResumeTemplates } from "@/app/lib/data";
import ResumeTemplates from "@/app/ui/resume-templates/resume-templates";

export default async function Page() {
  const resumeTemplates = await getResumeTemplates();

  // console.log(resumeTemplates);
  return (
    <div className="w-full h-full pl-3 pr-4">
      <h1 className="">Start with a Résumé Template</h1>
      <p>
        Get a quick start by customizing an existing resume example template.
      </p>
      <ResumeTemplates resumeTemplates={resumeTemplates} />
    </div>
  );
}

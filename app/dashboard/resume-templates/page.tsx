import React from "react";
import ResumeTemplates from "@/app/ui/resume-templates/resume-templates";
import { getProducts } from "@/app/api/resumeTemplates";
import { getResumeTemplates } from "@/app/lib/data";

export default async function Page() {
  const resumeTemplates = await getResumeTemplates();

  // const resumeTemplates = await getProducts();

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

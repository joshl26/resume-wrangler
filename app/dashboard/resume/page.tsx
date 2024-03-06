import React from "react";
import ResumeTemplates from "@/app/ui/resume-templates/resume-templates";
import { getProducts } from "@/app/api/resumeTemplates";
import { getResumeTemplates } from "@/app/lib/data";
import { Button } from "@/app/ui/button";

export default async function Page() {
  const resumeTemplates = await getResumeTemplates();
  const selectedResume = "1453bf56-d92f-4893-a6a8-34decd76bbd7";

  // const resumeTemplates = await getProducts();

  // console.log(resumeTemplates);
  return (
    <div className="w-full h-full pl-3 pr-4">
      <div className="flex flex-row">
        <div className="flex flex-column">
          <div>
            <h1 className="text-lg">Start with a Résumé Template</h1>
            <p>
              Get a quick start by customizing an existing resume example
              template.
            </p>
          </div>
          <div>
            <Button>
              <a href={`/dashboard/resume/edit/${selectedResume}`}>
                Create Résumé
              </a>
            </Button>
          </div>
        </div>
      </div>

      <ResumeTemplates resumeTemplates={resumeTemplates} />
    </div>
  );
}

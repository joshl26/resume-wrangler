import React from "react";
import ResumeTemplates from "../ui/resume-templates/resume-templates";
import { fetchResumeTemplates } from "../lib/data";

export const metadata = {
  title: "Resume Templates",
  description: "Search through our resume templates",
};

async function Page() {
  const resumeTemplates = await fetchResumeTemplates();

  return (
    <main>
      <div className=" bg-rose-100 min-h-[97vh]">
        <ResumeTemplates resumeTemplates={resumeTemplates} />
      </div>
    </main>
  );
}

export default Page;

import React from "react";
import Landing from "../landing/page";
import ResumeTemplates from "../ui/resume-templates/resume-templates";
import { fetchResumeTemplates } from "../lib/data";

export const metadata = {
  title: "Resume Templates",
  description: "Search through our resume templates",
};

async function Page() {
  const resumeTemplates = await fetchResumeTemplates();

  return (
    <Landing>
      <div className=" bg-rose-100 min-h-[97vh]">
        <ResumeTemplates resumeTemplates={resumeTemplates} />
      </div>
    </Landing>
  );
}

export default Page;

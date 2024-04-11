import React from "react";
import Landing from "../landing/page";
import ResumeTemplates from "../ui/resume-templates/resume-templates";
import { fetchResumeTemplates } from "../lib/data";

async function Page() {
  let resumeTemplates = await fetchResumeTemplates();

  return (
    <Landing>
      <div className=" bg-rose-100 min-h-[97vh]">
        <ResumeTemplates resumeTemplates={resumeTemplates} />
      </div>
    </Landing>
  );
}

export default Page;

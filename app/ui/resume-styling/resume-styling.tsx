"use client";

import { Suspense, useState } from "react";
import Classic from "@/app/ui/resume/classic/classic-resume";
import PreviewButton from "@/app/ui/preview-button";
import ElectricalEngineer from "@/app/ui/resume/electrical-engineer/electrical-engineer";
import YourResumeStyling from "../forms/your-resume-styling";
import YourProfile from "../forms/your-profile";
import YourSkills from "../forms/your-skills";
import YourEducation from "../forms/your-education";
import YourWorkExperiences from "../forms/your-work-experiences";
import YourOrganizations from "../forms/your-organizations";
import YourCertifications from "../forms/your-certifications";
import YourSocialLinks from "../forms/your-social-links";

export default function ResumeStyling({
  resumeTemplates,
  resumeColors,
  bodyFonts,
  headerFonts,
  user,
  resume,
  userSkills,
  userEducation,
  userOrganizations,
  userCertifications,
  userWorkExperiences,
}: {
  resumeTemplates: any;
  resumeColors: any;
  bodyFonts: any;
  headerFonts: any;
  user: any;
  resume: any;
  userSkills: any;
  userEducation: any;
  userOrganizations: any;
  userCertifications: any;
  userWorkExperiences: any;
}) {
  const [selectedResumeTemplate, setSelectedResumeTemplate] = useState(
    resume?.template
  );

  const [selectedResumeBodyFont, setSelectedResumeBodyFont] = useState(
    resume?.body_font
  );

  const [selectedResumeHeadingFont, setSelectedResumeHeadingFont] = useState(
    resume?.heading_font
  );

  return (
    <main className="flex w-full">
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full w-[400px] overflow-scroll px-3">
          <h1>{selectedResumeTemplate}</h1>
          <YourResumeStyling
            resume={resume}
            resumeTemplates={resumeTemplates}
            resumeColors={resumeColors}
            headerFonts={headerFonts}
            bodyFonts={bodyFonts}
            setSelectedResumeTemplate={setSelectedResumeTemplate}
            setSelectedResumeHeadingFont={setSelectedResumeHeadingFont}
            setSelectedResumeBodyFont={setSelectedResumeBodyFont}
            selectedResumeTemplate={selectedResumeTemplate}
            selectedResumeBodyFont={selectedResumeBodyFont}
            selectedResumeHeadingFont={selectedResumeHeadingFont}
          />
          <div className="py-2"></div>
          <YourProfile user={user} />
          <YourSocialLinks user={user} />
          <div className="py-2"></div>
          <YourSkills user={user} userSkills={userSkills} />
          <div className="py-2"></div>
          <YourEducation
            resume={resume}
            user={user}
            userEducation={userEducation}
          />
          <div className="py-2"></div>
          <YourWorkExperiences
            userWorkExperiences={userWorkExperiences}
            user={user}
            resume={resume}
          />
          <div className="py-2"></div>
          <YourOrganizations
            user={user}
            resume={resume}
            userOrganizations={userOrganizations}
          />
          <div className="py-2"></div>
          <YourCertifications
            resume={resume}
            user={user}
            userCertifications={userCertifications}
          />
          <div className="p-2 text-center">
            <a
              href={`/api/pdf?bodyFont=${resume.bodyFont}&headerFont=${resume.headingFont}`}
              download="generated_pdf.pdf"
              className="downloadBtn"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div className="flex flex-col m-auto h-full overflow-scroll right-0">
          {selectedResumeTemplate === "classic" && (
            <Suspense>
              <Classic
                headingFont={selectedResumeHeadingFont}
                bodyFont={selectedResumeBodyFont}
                user={user}
              />
            </Suspense>
          )}
          {selectedResumeTemplate === "electrical-engineer" && (
            <Suspense>
              <ElectricalEngineer
                headingFont={selectedResumeHeadingFont}
                bodyFont={selectedResumeBodyFont}
                user={user}
              />
            </Suspense>
          )}
        </div>
      </div>
      <PreviewButton />
    </main>
  );
}

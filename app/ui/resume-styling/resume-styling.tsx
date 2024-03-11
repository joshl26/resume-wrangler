"use client";

import { Suspense } from "react";
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
  return (
    <main className="flex w-full">
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full w-[400px] overflow-scroll px-3">
          {/* <YourResumeStyling
            resume={resume}
            resumeTemplates={resumeTemplates}
            resumeColors={resumeColors}
            headerFonts={headerFonts}
            bodyFonts={bodyFonts}
          /> */}
          {/* <div className="py-2"></div>
          <YourProfile user={user} />
          <YourSocialLinks user={user} />
          <div className="py-2"></div> */}
          {/* <YourSkills user={user} userSkills={userSkills} />
          <YourEducation
            resume={resume}
            user={user}
            userEducation={userEducation}
          /> */}
          <YourWorkExperiences
            userWorkExperiences={userWorkExperiences}
            user={user}
          />
          {/* <YourOrganizations
            user={user}
            resume={resume}
            userOrganizations={userOrganizations}
          />

          <YourCertifications
            resume={resume}
            user={user}
            userCertifications={userCertifications}
          /> */}
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
          {resume.template === "classic" && (
            <Suspense>
              <Classic
                headingFont={resume.heading_font}
                bodyFont={resume.body_font}
                user={user}
              />
            </Suspense>
          )}
          {resume.resumeTemplate === "electrical-engineer" && (
            <Suspense>
              <ElectricalEngineer
                headingFont={resume.headingFont}
                bodyFont={resume.bodyFont}
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

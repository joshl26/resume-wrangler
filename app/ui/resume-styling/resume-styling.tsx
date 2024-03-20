"use client";

import { Suspense, useState } from "react";
import Classic from "@/app/ui/resume/classic/classic-resume";
import PreviewButton from "@/app/ui/preview-button";
import ElectricalEngineer from "@/app/ui/resume/electrical-engineer/electrical-engineer";
import YourResumeStyling from "@/app/ui/forms/your-resume-styling";
import YourProfile from "@/app/ui/forms/your-profile";
import YourSkills from "@/app/ui/forms/your-skills";
import YourEducation from "@/app/ui/forms/your-education";
import YourWorkExperiences from "@/app/ui/forms/your-work-experiences";
import YourOrganizations from "@/app/ui/forms/your-organizations";
import YourCertifications from "@/app/ui/forms/your-certifications";
import YourSocialLinks from "@/app/ui/forms/your-social-links";

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

  const [selectedResumeColor, setSelectedResumeColor] = useState(resume?.color);

  const [selectedResumeHighlightColor, setSelectedResumeHighlightColor] =
    useState(resume?.highlight_color);

  const [showSocials, setShowSocials] = useState(resume?.show_social_icons);

  const [showSkills, setShowSkills] = useState(resume?.show_skills_section);

  const [showSkillProgress, setShowSkillProgress] = useState(
    resume?.show_skill_progress
  );

  const [showEducation, setShowEducation] = useState(
    resume?.show_education_section
  );

  const [showCustomSectionOne, setShowCustomSectionOne] = useState(
    resume?.show_custom_section_one
  );

  const [showCustomSectionTwo, setShowCustomSectionTwo] = useState(
    resume?.show_custom_section_two
  );

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
            setSelectedResumeTemplate={setSelectedResumeTemplate}
            setSelectedResumeHeadingFont={setSelectedResumeHeadingFont}
            setSelectedResumeBodyFont={setSelectedResumeBodyFont}
            setSelectedResumeColor={setSelectedResumeColor}
            setSelectedResumeHighlightColor={setSelectedResumeHighlightColor}
            selectedResumeTemplate={selectedResumeTemplate}
            selectedResumeBodyFont={selectedResumeBodyFont}
            selectedResumeHeadingFont={selectedResumeHeadingFont}
            selectedResumeColor={selectedResumeColor}
            selectedResumeHighlightColor={selectedResumeHighlightColor}
          /> */}
          {/* <div className="py-2"></div>
          <YourProfile resume={resume} user={user} />
          <YourSocialLinks
            resume={resume}
            user={user}
            showSocials={showSocials}
            setShowSocials={setShowSocials}
          />
          <div className="py-2"></div>
          <YourSkills
            user={user}
            userSkills={userSkills}
            resume={resume}
            setShowSkills={setShowSkills}
            showSkills={showSkills}
            setShowSkillProgress={setShowSkillProgress}
            showSkillProgress={showSkillProgress}
          />
          <div className="py-2"></div> */}
          <YourEducation
            resume={resume}
            user={user}
            userEducation={userEducation}
            showEducation={showEducation}
            setShowEducation={setShowEducation}
          />
          <div className="py-2"></div>
          {/* <YourWorkExperiences
            userWorkExperiences={userWorkExperiences}
            user={user}
            resume={resume}
          />
          <div className="py-2"></div>
          <YourOrganizations
            user={user}
            resume={resume}
            userOrganizations={userOrganizations}
            showCustomSectionOne={showCustomSectionOne}
            setShowCustomSectionOne={setShowCustomSectionOne}
          />
          <div className="py-2"></div>
          <YourCertifications
            resume={resume}
            user={user}
            userCertifications={userCertifications}
            showCustomSectionTwo={showCustomSectionTwo}
            setShowCustomSectionTwo={setShowCustomSectionTwo}
          /> */}
          <div className="p-2 text-center">
            <a
              href={`/api/pdf?resumeId=${resume?.id}&userEmail=${user?.email}`}
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
                heading_font={selectedResumeHeadingFont}
                body_font={selectedResumeBodyFont}
                color={selectedResumeColor}
                selectedResumeHighlightColor={selectedResumeHighlightColor}
                show_social_icons={showSocials}
                user={user}
                resume={resume}
                userWorkExperiences={userWorkExperiences}
                userSkills={userSkills}
                userEducation={userEducation}
                userCertifications={userCertifications}
                userOrganizations={userOrganizations}
                show_skills_section={showSkills}
                show_skill_progress={showSkillProgress}
                show_education_section={showEducation}
                show_custom_section_one={showCustomSectionOne}
                show_custom_section_two={showCustomSectionTwo}
              />
            </Suspense>
          )}
        </div>
      </div>
      <PreviewButton resume={resume} user={user} />
    </main>
  );
}

"use client";

import { Suspense, useState } from "react";
// import Classic from "@/app/ui/resume/classic/classic-resume";
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
import {
  BodyFonts,
  HeaderFonts,
  Resume,
  ResumeColors,
  ResumeTemplates,
  User,
  UserCertifications,
  UserEducationExperiences,
  UserSkills,
  UserWorkExperiences,
  userOrganizations,
} from "@/app/lib/definitions";
import BackButton from "../back-button";
import ThreeDAnimator from "../resume/3d-animator/3d-animator";

interface Props {
  resumeTemplates: ResumeTemplates;
  resumeColors: ResumeColors;
  bodyFonts: BodyFonts;
  headerFonts: HeaderFonts;
  user: User;
  resume: Resume;
  userSkills: UserSkills;
  userEducation: UserEducationExperiences;
  userOrganizations: userOrganizations;
  userCertifications: UserCertifications;
  userWorkExperiences: UserWorkExperiences;
  educationResumeLines: UserEducationExperiences;
  workResumeLines: UserWorkExperiences;
  skillResumeLines: UserSkills;
  certificationResumeLines: UserCertifications;
  organizationResumeLines: userOrganizations;
}

export default function ResumeStyling(props: Props) {
  const [selectedResumeTemplate, setSelectedResumeTemplate] = useState(
    props.resume?.template
  );

  const [selectedResumeBodyFont, setSelectedResumeBodyFont] = useState(
    props.resume?.body_font
  );

  const [selectedResumeHeadingFont, setSelectedResumeHeadingFont] = useState(
    props.resume?.heading_font
  );

  const [selectedResumeColor, setSelectedResumeColor] = useState(
    props.resume?.color
  );

  const [selectedResumeHighlightColor, setSelectedResumeHighlightColor] =
    useState(props.resume?.highlight_color);

  const [showSocials, setShowSocials] = useState(
    props.resume?.show_social_icons
  );

  const [showSkills, setShowSkills] = useState(
    props.resume?.show_skills_section
  );

  const [showSkillProgress, setShowSkillProgress] = useState(
    props.resume?.show_skill_progress
  );

  const [showEducation, setShowEducation] = useState(
    props.resume?.show_education_section
  );

  const [showCustomSectionOne, setShowCustomSectionOne] = useState(
    props.resume?.show_custom_section_one
  );

  const [showCustomSectionTwo, setShowCustomSectionTwo] = useState(
    props.resume?.show_custom_section_two
  );

  return (
    <main className="flex w-full">
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full w-[400px] overflow-x-none overflow-y-auto px-3">
          <div className="pb-2">
            <BackButton classname="" href="/dashboard/applications">
              Back
            </BackButton>{" "}
          </div>
          <YourResumeStyling
            resume={props?.resume}
            resumeTemplates={props?.resumeTemplates}
            resumeColors={props?.resumeColors}
            headerFonts={props?.headerFonts}
            bodyFonts={props?.bodyFonts}
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
          />
          <div className="py-2" />
          <YourProfile resume={props?.resume} user={props?.user} />
          <YourSocialLinks
            resume={props?.resume}
            user={props?.user}
            showSocials={showSocials}
            setShowSocials={setShowSocials}
          />
          <div className="py-2" />
          <YourSkills
            user={props?.user}
            userSkills={props?.userSkills}
            resume={props?.resume}
            setShowSkills={setShowSkills}
            showSkills={showSkills}
            setShowSkillProgress={setShowSkillProgress}
            showSkillProgress={showSkillProgress}
            skillResumeLines={props?.skillResumeLines}
          />
          <div className="py-2" />
          <YourEducation
            resume={props?.resume}
            user={props?.user}
            userEducation={props?.userEducation}
            showEducation={showEducation}
            setShowEducation={setShowEducation}
            educationResumeLines={props?.educationResumeLines}
          />
          <div className="py-2" />
          <YourWorkExperiences
            userWorkExperiences={props?.userWorkExperiences}
            user={props?.user}
            resume={props?.resume}
            workResumeLines={props?.workResumeLines}
          />
          <div className="py-2" />
          <YourOrganizations
            user={props?.user}
            resume={props?.resume}
            userOrganizations={props?.userOrganizations}
            showCustomSectionOne={showCustomSectionOne}
            setShowCustomSectionOne={setShowCustomSectionOne}
            organizationResumeLines={props?.organizationResumeLines}
          />
          <div className="py-2" />
          <YourCertifications
            resume={props?.resume}
            user={props?.user}
            userCertifications={props?.userCertifications}
            showCustomSectionTwo={showCustomSectionTwo}
            setShowCustomSectionTwo={setShowCustomSectionTwo}
            certificationResumeLines={props?.certificationResumeLines}
          />
          <div className="p-2 text-center">
            <a
              href={`/api/pdf?resumeId=${props?.resume?.id}&userEmail=${props?.user?.email}`}
              download="generated_pdf.pdf"
              className="downloadBtn hover:text-rose-500"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div className="flex flex-col m-auto h-full overflow-x-none overflow-y-auto pr-4">
          {/* {selectedResumeTemplate === "classic" && (
            <Suspense>
              <Classic
                headingFont={selectedResumeHeadingFont}
                bodyFont={selectedResumeBodyFont}
                user={props?.user}
              />
            </Suspense>
          )} */}
          {selectedResumeTemplate === "electrical-engineer" && (
            <Suspense>
              <ElectricalEngineer
                heading_font={selectedResumeHeadingFont}
                body_font={selectedResumeBodyFont}
                color={selectedResumeColor}
                highlightColor={selectedResumeHighlightColor}
                show_social_icons={showSocials}
                user={props?.user}
                resume={props?.resume}
                userWorkExperiences={props?.userWorkExperiences}
                userSkills={props?.userSkills}
                userEducation={props?.userEducation}
                userCertifications={props?.userCertifications}
                userOrganizations={props?.userOrganizations}
                show_skills_section={showSkills}
                show_skill_progress={showSkillProgress}
                show_education_section={showEducation}
                show_custom_section_one={showCustomSectionOne}
                show_custom_section_two={showCustomSectionTwo}
                educationResumeLines={props?.educationResumeLines}
                workResumeLines={props?.workResumeLines}
                skillResumeLines={props?.skillResumeLines}
                organizationResumeLines={props?.organizationResumeLines}
                certificationResumeLines={props?.certificationResumeLines}
              />
            </Suspense>
          )}
          {selectedResumeTemplate === "3d-animator" && (
            <Suspense>
              <ThreeDAnimator
                heading_font={selectedResumeHeadingFont}
                body_font={selectedResumeBodyFont}
                color={selectedResumeColor}
                selectedResumeHighlightColor={selectedResumeHighlightColor}
                show_social_icons={showSocials}
                user={props?.user}
                resume={props?.resume}
                userWorkExperiences={props?.userWorkExperiences}
                userSkills={props?.userSkills}
                userEducation={props?.userEducation}
                userCertifications={props?.userCertifications}
                userOrganizations={props?.userOrganizations}
                show_skills_section={showSkills}
                show_skill_progress={showSkillProgress}
                show_education_section={showEducation}
                show_custom_section_one={showCustomSectionOne}
                show_custom_section_two={showCustomSectionTwo}
                educationResumeLines={props?.educationResumeLines}
                workResumeLines={props?.workResumeLines}
                skillResumeLines={props?.skillResumeLines}
                organizationResumeLines={props?.organizationResumeLines}
                certificationResumeLines={props?.certificationResumeLines}
              />
            </Suspense>
          )}
        </div>
      </div>
      <PreviewButton resume={props?.resume} user={props?.user} />
    </main>
  );
}

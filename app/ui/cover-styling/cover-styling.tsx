"use client";

import { Suspense, useState } from "react";
import PreviewButton from "@/app/ui/preview-button";
// import ElectricalEngineer from "@/app/ui/resume/electrical-engineer/electrical-engineer";
import YourCoverStyling from "@/app/ui/forms/your-cover-styling";
import { User, UserCoverExperiences } from "@/app/lib/definitions";
import BackButton from "../back-button";

interface Props {
  userCoverExperiences: UserCoverExperiences;
  user: User;
}

export default function CoverStyling(props: Props) {
  // const [selectedCoverTemplate, setSelectedCoverTemplate] = useState(
  //   props.cover?.template
  // );

  // const [selectedCoverBodyFont, setSelectedCoverBodyFont] = useState(
  //   props.cover?.body_font
  // );

  // const [selectedCoverHeadingFont, setSelectedCoverHeadingFont] = useState(
  //   props.cover?.heading_font
  // );

  // const [selectedCoverColor, setSelectedCoverColor] = useState(
  //   props.cover?.color
  // );

  // const [selectedCoverHighlightColor, setSelectedCoverHighlightColor] =
  //   useState(props.cover?.highlight_color);

  // const [showSocials, setShowSocials] = useState(
  //   props.cover?.show_social_icons
  // );

  return (
    <main className="flex w-full">
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full w-[600px] overflow-scroll px-3">
          <div className="pb-2">
            <BackButton classname="" href="/dashboard/cover">
              Back
            </BackButton>{" "}
          </div>
          <YourCoverStyling />
          <div className="py-2" />
          {/* <YourProfile resume={props?.resume} user={props?.user} />
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
          /> */}
          <div className="p-2 text-center">
            <a
              // href={`/api/pdf?resumeId=${props?.resume?.id}&userEmail=${props?.user?.email}`}
              download="generated_pdf.pdf"
              className="downloadBtn hover:text-rose-500"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div className="flex flex-col m-auto w-full h-full overflow-scroll right-0">
          {/* {selectedResumeTemplate === "classic" && (
            <Suspense>
              <Classic
                headingFont={selectedResumeHeadingFont}
                bodyFont={selectedResumeBodyFont}
                user={props?.user}
              />
            </Suspense>
          )} */}
          {/* {selectedResumeTemplate === "electrical-engineer" && (
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
          )} */}
        </div>
      </div>
      {/* <PreviewButton resume={props?.resume} user={props?.user} /> */}
    </main>
  );
}

"use client";

import { Suspense, useState } from "react";
import PreviewButton from "@/app/ui/preview-button";
// import ElectricalEngineer from "@/app/ui/resume/electrical-engineer/electrical-engineer";
import YourCoverStyling from "@/app/ui/forms/your-cover-styling";
import { User, UserCoverExperiences } from "@/app/lib/definitions";
import BackButton from "../back-button";
import Link from "next/link";
import StandardCover from "../cover/standard/standard-cover";

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
        <div className="flex flex-col h-full w-[400px] overflow-x-none overflow-y-auto px-3">
          <div className="pb-2">
            <BackButton classname="" href="/dashboard/cover">
              Back
            </BackButton>{" "}
          </div>
          <YourCoverStyling />
          <div className="py-2" />
          <div className="p-2 text-center">
            {props?.user?.access_level !== "basic" ? (
              <a
                // href={`/api/pdf?resumeId=${props?.resume?.id}&userEmail=${props?.user?.email}`}
                download={`${props.user.first_name}_${props.user.last_name}.pdf`}
                className="downloadBtn hover:text-rose-500"
              >
                Download PDF
              </a>
            ) : (
              <Link className="btn btn-amber" href={"/dashboard/upgrade"}>
                Upgrade Account to Download PDF
              </Link>
            )}
          </div>
        </div>
        <div className="h-full overflow-x-hidden overflow-y-auto mx-auto pr-4">
          <StandardCover />

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

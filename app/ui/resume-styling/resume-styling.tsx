"use client";

import { Suspense, useState } from "react";
import PreviewButton from "@/app/ui/resume-preview-button";
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
  Application,
  BodyFonts,
  Company,
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
import ResumePreviewButton from "@/app/ui/resume-preview-button";
import Link from "next/link";
import clsx from "clsx";
import Elegant from "../resume/elegant/elegant";
import Modern from "../resume/modern/modern";

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
  company: Company;
  application: Application;
}

type Section =
  | "styling"
  | "profile"
  | "socials"
  | "skills"
  | "education"
  | "experience"
  | "organizations"
  | "certifications";

export default function ResumeStyling(props: Props) {
  const [selectedSection, setSelectedSection] = useState<Section>("styling");

  const [selectedResumeTemplate, setSelectedResumeTemplate] = useState(
    props?.resume?.template,
  );

  const [selectedResumeBodyFont, setSelectedResumeBodyFont] = useState(
    props?.resume?.body_font,
  );

  const [selectedResumeHeadingFont, setSelectedResumeHeadingFont] = useState(
    props?.resume?.heading_font,
  );

  const [selectedResumeColor, setSelectedResumeColor] = useState(
    props?.resume?.color,
  );

  const [selectedResumeHighlightColor, setSelectedResumeHighlightColor] =
    useState(props?.resume?.highlight_color);

  const [showSocials, setShowSocials] = useState(
    props?.resume?.show_social_icons,
  );

  const [showSkills, setShowSkills] = useState(
    props?.resume?.show_skills_section,
  );

  const [showSkillProgress, setShowSkillProgress] = useState(
    props?.resume?.show_skill_progress,
  );

  const [showEducation, setShowEducation] = useState(
    props?.resume?.show_education_section,
  );

  const [showCustomSectionOne, setShowCustomSectionOne] = useState(
    props?.resume?.show_custom_section_one,
  );

  const [showCustomSectionTwo, setShowCustomSectionTwo] = useState(
    props?.resume?.show_custom_section_two,
  );

  return (
    <main className="flex w-full">
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full w-[400px] overflow-x-none overflow-y-auto px-3">
          <div className="flex flex-row justify-between pb-2">
            {" "}
            <div className="flex flex-col">
              <BackButton className="" href="/dashboard/applications">
                Back
              </BackButton>{" "}
            </div>
            <div className="flex flex-col ">
              {props?.user?.access_level !== "" ? (
                <a
                  href={`/api/pdf?resumeId=${props?.resume?.id}&userEmail=${props?.user?.email}`}
                  download={`${props?.user?.first_name}_${props?.user?.last_name}_${props?.application?.job_position}_resume.pdf`}
                  className="downloadBtn hover:text-rose-500 "
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
          <div className="flex flex-row flex-wrap justify-between gap-2 mb-2">
            <button
              onClick={() => setSelectedSection("styling")}
              className={clsx(
                selectedSection === "styling"
                  ? "bg-rose-500 text-white"
                  : "bg-amber-300 text-black",
                "flex flex-col  p-1 tight-shadow rounded hover:bg-rose-500 hover:text-white font-medium",
              )}
            >
              Styling
            </button>
            <button
              onClick={() => setSelectedSection("profile")}
              className={clsx(
                selectedSection === "profile"
                  ? "bg-rose-500 text-white"
                  : "bg-amber-300 text-black",
                "flex flex-col  p-1 tight-shadow rounded hover:bg-rose-500 hover:text-white font-medium",
              )}
            >
              Profile
            </button>
            <button
              onClick={() => setSelectedSection("socials")}
              className={clsx(
                selectedSection === "socials"
                  ? "bg-rose-500 text-white"
                  : "bg-amber-300 text-black",
                "flex flex-col  p-1 tight-shadow rounded hover:bg-rose-500 hover:text-white font-medium",
              )}
            >
              Socials
            </button>
            <button
              onClick={() => setSelectedSection("skills")}
              className={clsx(
                selectedSection === "skills"
                  ? "bg-rose-500 text-white"
                  : "bg-amber-300 text-black",
                "flex flex-col  p-1 tight-shadow rounded hover:bg-rose-500 hover:text-white font-medium",
              )}
            >
              Skills
            </button>
            <button
              onClick={() => setSelectedSection("education")}
              className={clsx(
                selectedSection === "education"
                  ? "bg-rose-500 text-white"
                  : "bg-amber-300 text-black",
                "flex flex-col  p-1 tight-shadow rounded hover:bg-rose-500 hover:text-white font-medium",
              )}
            >
              Education
            </button>
            <button
              onClick={() => setSelectedSection("experience")}
              className={clsx(
                selectedSection === "experience"
                  ? "bg-rose-500 text-white"
                  : "bg-amber-300 text-black",
                "flex flex-col  p-1 tight-shadow rounded hover:bg-rose-500 hover:text-white font-medium",
              )}
            >
              Experience
            </button>
            <button
              onClick={() => setSelectedSection("organizations")}
              className={clsx(
                selectedSection === "organizations"
                  ? "bg-rose-500 text-white"
                  : "bg-amber-300 text-black",
                "flex flex-col  p-1 tight-shadow rounded hover:bg-rose-500 hover:text-white font-medium",
              )}
            >
              Organizations
            </button>
            <button
              onClick={() => setSelectedSection("certifications")}
              className={clsx(
                selectedSection === "certifications"
                  ? "bg-rose-500 text-white"
                  : "bg-amber-300 text-black",
                "flex flex-col  p-1 tight-shadow rounded hover:bg-rose-500 hover:text-white font-medium",
              )}
            >
              Certifications
            </button>
          </div>
          {selectedSection === "styling" && (
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
          )}
          {selectedSection === "profile" && (
            <YourProfile resume={props?.resume} user={props?.user} />
          )}
          {selectedSection === "socials" && (
            <YourSocialLinks
              resume={props?.resume}
              user={props?.user}
              showSocials={showSocials}
              setShowSocials={setShowSocials}
            />
          )}
          {selectedSection === "skills" && (
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
          )}
          {selectedSection === "education" && (
            <YourEducation
              resume={props?.resume}
              user={props?.user}
              userEducation={props?.userEducation}
              showEducation={showEducation}
              setShowEducation={setShowEducation}
              educationResumeLines={props?.educationResumeLines}
            />
          )}
          {selectedSection === "experience" && (
            <YourWorkExperiences
              userWorkExperiences={props?.userWorkExperiences}
              user={props?.user}
              resume={props?.resume}
              workResumeLines={props?.workResumeLines}
            />
          )}
          {selectedSection === "organizations" && (
            <YourOrganizations
              user={props?.user}
              resume={props?.resume}
              userOrganizations={props?.userOrganizations}
              showCustomSectionOne={showCustomSectionOne}
              setShowCustomSectionOne={setShowCustomSectionOne}
              organizationResumeLines={props?.organizationResumeLines}
            />
          )}
          {selectedSection === "certifications" && (
            <YourCertifications
              resume={props?.resume}
              user={props?.user}
              userCertifications={props?.userCertifications}
              showCustomSectionTwo={showCustomSectionTwo}
              setShowCustomSectionTwo={setShowCustomSectionTwo}
              certificationResumeLines={props?.certificationResumeLines}
            />
          )}
        </div>
        <div className="flex flex-col m-auto h-full overflow-x-none overflow-y-auto pr-4">
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
          {selectedResumeTemplate === "elegant" && (
            <Suspense>
              <Elegant
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
          {selectedResumeTemplate === "modern" && (
            <Suspense>
              <Modern
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
        </div>
      </div>
      <ResumePreviewButton resume={props?.resume} user={props?.user} />
    </main>
  );
}

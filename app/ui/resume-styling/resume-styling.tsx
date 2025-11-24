"use client";

import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import clsx from "clsx";
import ThreeDAnimator from "@/app/ui/resume/3d-animator/3d-animator";
import YourResumeStyling from "@/app/ui/forms/your-resume-styling";
import YourProfile from "@/app/ui/forms/your-profile";
import YourSkills from "@/app/ui/forms/your-skills";
import YourEducation from "@/app/ui/forms/your-education";
import YourWorkExperiences from "@/app/ui/forms/your-work-experiences";
import YourOrganizations from "@/app/ui/forms/your-organizations";
import YourCertifications from "@/app/ui/forms/your-certifications";
import YourSocialLinks from "@/app/ui/forms/your-social-links";
import BackButton from "@/app/ui/back-button";
import ResumePreviewButton from "@/app/ui/resume-preview-button";
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
import ElectricalEngineer from "../resume/electrical-engineer/electrical-engineer";

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

// Section button configuration
const SECTIONS: Array<{ id: Section; label: string }> = [
  { id: "styling", label: "Styling" },
  { id: "profile", label: "Profile" },
  { id: "socials", label: "Socials" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "organizations", label: "Organizations" },
  { id: "certifications", label: "Certifications" },
];

const toBoolean = (val: unknown) => val === "true" || val === true;

export default function ResumeStyling(props: Props) {
  const {
    user,
    resume,
    application,
    resumeTemplates,
    resumeColors,
    bodyFonts,
    headerFonts,
    userSkills,
    userEducation,
    userOrganizations,
    userCertifications,
    userWorkExperiences,
    educationResumeLines,
    workResumeLines,
    skillResumeLines,
    certificationResumeLines,
    organizationResumeLines,
  } = props;

  // Section selection state
  const [selectedSection, setSelectedSection] = useState<Section>("styling");

  // Styling states
  const [selectedResumeTemplate, setSelectedResumeTemplate] = useState(
    resume?.template,
  );
  const [selectedResumeBodyFont, setSelectedResumeBodyFont] = useState(
    resume?.body_font,
  );
  const [selectedResumeHeadingFont, setSelectedResumeHeadingFont] = useState(
    resume?.heading_font,
  );
  const [selectedResumeColor, setSelectedResumeColor] = useState(resume?.color);
  const [selectedResumeHighlightColor, setSelectedResumeHighlightColor] =
    useState(resume?.highlight_color);

  // Visibility states with consistent boolean conversion
  const [showSocials, setShowSocials] = useState(
    toBoolean(resume?.show_social_icons),
  );
  const [showSkills, setShowSkills] = useState(
    toBoolean(resume?.show_skills_section),
  );
  const [showSkillProgress, setShowSkillProgress] = useState(
    toBoolean(resume?.show_skill_progress),
  );
  const [showEducation, setShowEducation] = useState(
    toBoolean(resume?.show_education_section),
  );
  const [showCustomSectionOne, setShowCustomSectionOne] = useState(
    toBoolean(resume?.show_custom_section_one),
  );
  const [showCustomSectionTwo, setShowCustomSectionTwo] = useState(
    toBoolean(resume?.show_custom_section_two),
  );

  // Common props for all resume templates
  const commonResumeProps = useMemo(
    () => ({
      heading_font: selectedResumeHeadingFont,
      body_font: selectedResumeBodyFont,
      color: selectedResumeColor,
      highlightColor: selectedResumeHighlightColor,
      show_social_icons: showSocials,
      user,
      resume,
      userWorkExperiences,
      userSkills,
      userEducation,
      userCertifications,
      userOrganizations,
      show_skills_section: showSkills,
      show_skill_progress: showSkillProgress,
      show_education_section: showEducation,
      show_custom_section_one: showCustomSectionOne,
      show_custom_section_two: showCustomSectionTwo,
      educationResumeLines,
      workResumeLines,
      skillResumeLines,
      organizationResumeLines,
      certificationResumeLines,
    }),
    [
      selectedResumeHeadingFont,
      selectedResumeBodyFont,
      selectedResumeColor,
      selectedResumeHighlightColor,
      showSocials,
      showSkills,
      showSkillProgress,
      showEducation,
      showCustomSectionOne,
      showCustomSectionTwo,
      user,
      resume,
      userWorkExperiences,
      userSkills,
      userEducation,
      userCertifications,
      userOrganizations,
      educationResumeLines,
      workResumeLines,
      skillResumeLines,
      organizationResumeLines,
      certificationResumeLines,
    ],
  );

  // Check if user has access to download PDF
  const canDownloadPDF = user?.access_level !== "";

  // Generate PDF download URL and filename
  const pdfDownloadUrl = `/api/pdf?resumeId=${resume?.id}&userEmail=${user?.email}`;
  const pdfFilename = `${user?.first_name}_${user?.last_name}_${application?.job_position}_resume.pdf`;

  // Section button component
  const SectionButton = ({
    section,
  }: {
    section: { id: Section; label: string };
  }) => (
    <button
      onClick={() => setSelectedSection(section.id)}
      className={clsx(
        "flex flex-col p-2 tight-shadow rounded font-medium transition-colors duration-200",
        selectedSection === section.id
          ? "bg-rose-500 text-white"
          : "bg-amber-300 text-black hover:bg-rose-500 hover:text-white",
      )}
      aria-pressed={selectedSection === section.id}
    >
      {section.label}
    </button>
  );

  // Resume template renderer
  const renderResumeTemplate = () => {
    const templates = {
      "electrical-engineer": <ElectricalEngineer {...commonResumeProps} />,
      "3d-animator": <ThreeDAnimator {...commonResumeProps} />,
    };

    const template =
      templates[selectedResumeTemplate as keyof typeof templates];

    return template ? (
      <Suspense fallback={<ResumeLoadingFallback />}>{template}</Suspense>
    ) : null;
  };

  // Section content renderer
  const renderSectionContent = () => {
    const sections = {
      styling: (
        <YourResumeStyling
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
        />
      ),
      profile: <YourProfile resume={resume} user={user} />,
      socials: (
        <YourSocialLinks
          resume={resume}
          user={user}
          showSocials={showSocials}
          setShowSocials={setShowSocials}
        />
      ),
      skills: (
        <YourSkills
          user={user}
          userSkills={userSkills}
          resume={resume}
          setShowSkills={setShowSkills}
          showSkills={showSkills}
          setShowSkillProgress={setShowSkillProgress}
          showSkillProgress={showSkillProgress}
          skillResumeLines={skillResumeLines}
        />
      ),
      education: (
        <YourEducation
          resume={resume}
          user={user}
          userEducation={userEducation}
          showEducation={showEducation}
          setShowEducation={setShowEducation}
          educationResumeLines={educationResumeLines}
        />
      ),
      experience: (
        <YourWorkExperiences
          userWorkExperiences={userWorkExperiences}
          user={user}
          resume={resume}
          workResumeLines={workResumeLines}
        />
      ),
      organizations: (
        <YourOrganizations
          user={user}
          resume={resume}
          userOrganizations={userOrganizations}
          showCustomSectionOne={showCustomSectionOne}
          setShowCustomSectionOne={setShowCustomSectionOne}
          organizationResumeLines={organizationResumeLines}
        />
      ),
      certifications: (
        <YourCertifications
          resume={resume}
          user={user}
          userCertifications={userCertifications}
          showCustomSectionTwo={showCustomSectionTwo}
          setShowCustomSectionTwo={setShowCustomSectionTwo}
          certificationResumeLines={certificationResumeLines}
        />
      ),
    };

    return sections[selectedSection];
  };

  return (
    <main className="flex w-full h-screen">
      <div className="flex flex-row h-full w-full">
        {/* Left Sidebar - Controls */}
        <aside className="flex flex-col h-full w-[400px] overflow-x-hidden overflow-y-auto px-3 border-r border-gray-200">
          {/* Header Actions */}
          <div className="flex flex-row justify-between items-center pb-3 pt-2 sticky top-0  z-10 border-b border-gray-100">
            <BackButton href="/dashboard/applications">Back</BackButton>

            {canDownloadPDF ? (
              <a
                href={pdfDownloadUrl}
                download={pdfFilename}
                className="text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors"
              >
                Download PDF
              </a>
            ) : (
              <Link
                href="/dashboard/upgrade"
                className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
              >
                Upgrade to Download
              </Link>
            )}
          </div>

          {/* Section Navigation */}
          <nav className="flex flex-row flex-wrap gap-2 my-4" role="tablist">
            {SECTIONS.map((section) => (
              <SectionButton key={section.id} section={section} />
            ))}
          </nav>

          {/* Section Content */}
          <div className="flex-1 pb-4">{renderSectionContent()}</div>
        </aside>

        {/* Right Side - Resume Preview */}
        <div className="flex flex-col flex-1 h-full overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="m-auto py-8 px-4">{renderResumeTemplate()}</div>
        </div>
      </div>

      {/* Floating Preview Button */}
      <ResumePreviewButton resume={resume} user={user} />
    </main>
  );
}

// Loading fallback component for resume templates
function ResumeLoadingFallback() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
        <p className="text-sm text-gray-500">Loading resume preview...</p>
      </div>
    </div>
  );
}

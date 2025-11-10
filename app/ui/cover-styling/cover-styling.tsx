"use client";

import { Suspense, useState } from "react";
import PreviewButton from "@/app/ui/resume-preview-button";
// import ElectricalEngineer from "@/app/ui/resume/electrical-engineer/electrical-engineer";
import YourCoverStyling from "@/app/ui/forms/your-cover-styling";
import {
  Application,
  BodyFonts,
  Company,
  CoverLetter,
  CoverTemplates,
  HeaderFonts,
  ResumeColors,
  ResumeTemplates,
  User,
  UserCoverExperienceLines,
  UserCoverExperiences,
} from "@/app/lib/definitions";
import BackButton from "../back-button";
import Link from "next/link";
import StandardCover from "../cover/standard/standard-cover";
import YourCoverLetterExperiences from "../forms/your-cover-letter-experiences";
import CoverLetterPreviewButton from "../cover-letter-preview-button";

export default function CoverStyling({
  userCoverExperiences,
  user,
  coverLetter,
  company,
  application,
  selectedCoverExperiences,
  coverTemplates,
  resumeColors,
  bodyFonts,
  headerFonts,
}: {
  userCoverExperiences: UserCoverExperiences;
  user: User;
  coverLetter: CoverLetter;
  company: Company;
  application: Application;
  selectedCoverExperiences: UserCoverExperienceLines;
  coverTemplates: CoverTemplates;
  resumeColors: ResumeColors;
  bodyFonts: BodyFonts;
  headerFonts: HeaderFonts;
}) {
  const [selectedCoverTemplate, setSelectedCoverTemplate] = useState(
    coverLetter?.template,
  );

  const [selectedCoverBodyFont, setSelectedCoverBodyFont] = useState(
    coverLetter?.body_font,
  );

  const [selectedCoverHeadingFont, setSelectedCoverHeadingFont] = useState(
    coverLetter?.heading_font,
  );

  const [selectedCoverColor, setSelectedCoverColor] = useState(
    coverLetter?.color,
  );

  const [selectedCoverHighlightColor, setSelectedCoverHighlightColor] =
    useState(coverLetter?.highlight_color);

  return (
    <main className="flex w-full">
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full w-[400px] overflow-x-none overflow-y-auto px-3">
          <div className="pb-2">
            <BackButton className="" href="/dashboard/cover">
              Back
            </BackButton>{" "}
          </div>
          <YourCoverStyling
            coverLetter={coverLetter}
            coverTemplates={coverTemplates}
            resumeColors={resumeColors}
            bodyFonts={bodyFonts}
            headerFonts={headerFonts}
            selectedCoverTemplate={selectedCoverTemplate}
            setSelectedCoverTemplate={setSelectedCoverTemplate}
            selectedCoverBodyFont={selectedCoverBodyFont}
            setSelectedCoverBodyFont={setSelectedCoverBodyFont}
            selectedCoverHeadingFont={selectedCoverHeadingFont}
            setSelectedCoverHeadingFont={setSelectedCoverHeadingFont}
            selectedCoverColor={selectedCoverColor}
            setSelectedCoverColor={setSelectedCoverColor}
            selectedCoverHighlightColor={selectedCoverHighlightColor}
            setSelectedCoverHighlightColor={setSelectedCoverHighlightColor}
          />
          <YourCoverLetterExperiences
            user={user}
            coverLetter={coverLetter}
            userCoverExperiences={userCoverExperiences}
            selectedCoverExperiences={selectedCoverExperiences}
          />
          <div className="py-2" />
          <div className="p-2 text-center">
            {user?.access_level !== "basic" ? (
              <a
                href={`/api/cover-pdf?coverLetterId=${coverLetter?.id}&userEmail=${user?.email}`}
                download={`${user.first_name}_${user.last_name}_${application?.job_position}_cover_letter.pdf`}
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
          <Suspense>
            {selectedCoverTemplate === "standard" && (
              <StandardCover
                user={user}
                coverLetter={coverLetter}
                company={company}
                application={application}
                selectedCoverExperiences={selectedCoverExperiences}
                userCoverExperiences={userCoverExperiences}
                selectedCoverBodyFont={selectedCoverBodyFont}
                selectedCoverHeadingFont={selectedCoverHeadingFont}
                selectedCoverColor={selectedCoverColor}
                selectedCoverHighlightColor={selectedCoverHighlightColor}
              />
            )}
          </Suspense>
        </div>
      </div>
      <CoverLetterPreviewButton coverLetter={coverLetter} user={user} />
    </main>
  );
}

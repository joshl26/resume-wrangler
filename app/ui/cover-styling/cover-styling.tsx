"use client";

import { Suspense, useState } from "react";
import PreviewButton from "@/app/ui/preview-button";
// import ElectricalEngineer from "@/app/ui/resume/electrical-engineer/electrical-engineer";
import YourCoverStyling from "@/app/ui/forms/your-cover-styling";
import {
  Application,
  Company,
  CoverLetter,
  User,
  UserCoverExperienceLines,
  UserCoverExperiences,
} from "@/app/lib/definitions";
import BackButton from "../back-button";
import Link from "next/link";
import StandardCover from "../cover/standard/standard-cover";
import YourCoverLetterExperiences from "../forms/your-cover-letter-experiences";

export default function CoverStyling({
  userCoverExperiences,
  user,
  coverLetter,
  company,
  application,
  selectedCoverExperiences,
}: {
  userCoverExperiences: UserCoverExperiences;
  user: User;
  coverLetter: CoverLetter;
  company: Company;
  application: Application;
  selectedCoverExperiences: UserCoverExperienceLines;
}) {
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
          <YourCoverStyling coverLetter={coverLetter} />
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
                // href={`/api/pdf?resumeId=${resume?.id}&userEmail=${user?.email}`}
                download={`${user.first_name}_${user.last_name}.pdf`}
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
            <StandardCover
              user={user}
              coverLetter={coverLetter}
              company={company}
              application={application}
              selectedCoverExperiences={selectedCoverExperiences}
              userCoverExperiences={userCoverExperiences}
            />
          </Suspense>
        </div>
      </div>
      {/* <PreviewButton resume={resume} user={user} /> */}
    </main>
  );
}

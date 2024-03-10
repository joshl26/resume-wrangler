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
}: {
  resumeTemplates: any;
  resumeColors: any;
  bodyFonts: any;
  headerFonts: any;
  user: any;
  resume: any;
  userSkills: any;
  userEducation: any;
}) {
  // console.log(userSkills);
  // const resumeTitleAction = (e: { target: HTMLInputElement }) => {
  //   let updatedValue = {};

  //   updatedValue = { resumeTitle: e.target.value };

  //   setResumeStyling((resumeStyling) => ({
  //     ...resumeStyling,
  //     ...updatedValue,
  //   }));
  // };

  // const resumeStylingOnChangeHandler = (e: any) => {
  //   // if (resumeStylingChanged === false) {
  //   //   setResumeStylingChanged(true);
  //   // }
  //   resumeTitleAction(e);
  // };

  // const bodyFontAction = (e: { target: HTMLSelectElement }) => {
  //   let updatedValue = {};

  //   updatedValue = { bodyFont: e.target.value };

  //   setResumeStyling((resumeStyling) => ({
  //     ...resumeStyling,
  //     ...updatedValue,
  //   }));
  // };

  // const headerFontAction = (e: { target: HTMLSelectElement }) => {
  //   let updatedValue = {};

  //   updatedValue = { headingFont: e.target.value };

  //   setResumeStyling((resumeStyling) => ({
  //     ...resumeStyling,
  //     ...updatedValue,
  //   }));
  // };

  // const resumeTemplateAction = (e: { target: HTMLSelectElement }) => {
  //   let updatedValue = {};

  //   updatedValue = { resumeTemplate: e.target.value };

  //   setResumeStyling((resumeStyling) => ({
  //     ...resumeStyling,
  //     ...updatedValue,
  //   }));
  // };

  // const colorAction = (e: React.MouseEvent<HTMLDivElement>) => {
  //   let updatedValue = {};

  //   updatedValue = { color: e.currentTarget.id };

  //   setResumeStyling((resumeStyling) => ({
  //     ...resumeStyling,
  //     ...updatedValue,
  //   }));
  // };

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
          />
          <div className="py-2"></div>
          <YourProfile user={user} />
          <YourSocialLinks user={user} />
          <div className="py-2"></div>
          <YourSkills user={user} userSkills={userSkills} /> */}
          <YourEducation userEducation={userEducation} />
          {/*
          <YourWorkExperiences />
          <YourOrganizations />
          <YourCertifications /> */}
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
          {/* {resume.resumeTemplate === "electrical-engineer" && (
            <Suspense>
              <ElectricalEngineer
                headingFont={resume.headingFont}
                bodyFont={resume.bodyFont}
                user={user}
              />
            </Suspense>
          )} */}
        </div>
      </div>
      <PreviewButton />
    </main>
  );
}

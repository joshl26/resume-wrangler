import {
  fetchBodyFonts,
  fetchHeaderFonts,
  fetchResumeColors,
  fetchResumeTemplates,
} from "@/app/lib/data";
import ResumeStyling from "@/app/ui/resume-styling/resume-styling";
import { notFound } from "next/navigation";

export default async function EditResume() {
  const [resumeTemplates, resumeColors, bodyFonts, headerFonts] =
    await Promise.all([
      fetchResumeTemplates(),
      fetchResumeColors(),
      fetchBodyFonts(),
      fetchHeaderFonts(),
    ]);

  // console.log(!resumeColors);

  if (!resumeTemplates ?? !resumeColors ?? !bodyFonts ?? !headerFonts) {
    notFound();
  }

  return (
    <ResumeStyling
      resumeTemplates={resumeTemplates}
      resumeColors={resumeColors}
      bodyFonts={bodyFonts}
      headerFonts={headerFonts}
    />
  );
}

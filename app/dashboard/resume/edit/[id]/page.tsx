import {
  fetchBodyFonts,
  fetchHeaderFonts,
  fetchResumeColors,
  fetchResumeTemplates,
  getUser,
} from "@/app/lib/data";
import ResumeStyling from "@/app/ui/resume-styling/resume-styling";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function EditResume() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      // image: session.user.image,
    };
    //   console.log(id);
  }

  const [resumeTemplates, resumeColors, bodyFonts, headerFonts, user] =
    await Promise.all([
      fetchResumeTemplates(),
      fetchResumeColors(),
      fetchBodyFonts(),
      fetchHeaderFonts(),
      getUser(session?.user?.email!),
    ]);

  // console.log(!resumeColors);

  if (
    !resumeTemplates ??
    !resumeColors ??
    !bodyFonts ??
    !headerFonts ??
    !user
  ) {
    notFound();
  }

  return (
    <ResumeStyling
      resumeTemplates={resumeTemplates}
      resumeColors={resumeColors}
      bodyFonts={bodyFonts}
      headerFonts={headerFonts}
      user={[]}
    />
  );
}

import {
  fetchBodyFonts,
  fetchHeaderFonts,
  fetchResumeById,
  fetchResumeColors,
  fetchResumeTemplates,
  getUser,
} from "@/app/lib/data";
import ResumeStyling from "@/app/ui/resume-styling/resume-styling";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function EditResume({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  // console.log(id);

  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      // image: session.user.image,
    };
    //   console.log(id);
  }

  const [resumeTemplates, resumeColors, bodyFonts, headerFonts, user, resume] =
    await Promise.all([
      fetchResumeTemplates(),
      fetchResumeColors(),
      fetchBodyFonts(),
      fetchHeaderFonts(),
      getUser(session?.user?.email!),
      fetchResumeById(id),
    ]);

  console.log(resume);

  if (
    !resumeTemplates ??
    !resumeColors ??
    !bodyFonts ??
    !headerFonts ??
    !user ??
    !resume
  ) {
    notFound();
  }

  return (
    <ResumeStyling
      resumeTemplates={[]}
      resumeColors={[]}
      bodyFonts={[]}
      headerFonts={[]}
      user={[]}
      resume={resume}
    />
  );
}

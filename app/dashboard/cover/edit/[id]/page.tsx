import {
  fetchBodyFonts,
  fetchHeaderFonts,
  fetchResumeColors,
  getUser,
  fetchCoverExperiencesByUserId,
  fetchCoverLetterByIdAndUserId,
  fetchCompanyById,
  fetchApplicationById,
  fetchCoverExperiencesByCoverLetterId,
  fetchCoverTemplates,
} from "@/app/lib/data";
import CoverStyling from "@/app/ui/cover-styling/cover-styling";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function EditResume({
  params,
}: {
  params: { id: string };
}) {
  const id = params?.id;

  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  const [user, coverTemplates, resumeColors, bodyFonts, headerFonts] =
    await Promise.all([
      getUser(session?.user?.email!),
      fetchCoverTemplates(),
      fetchResumeColors(),
      fetchBodyFonts(),
      fetchHeaderFonts(),
    ]);

  const [userCoverExperiences, coverLetter] = await Promise.all([
    fetchCoverExperiencesByUserId(user?.id),
    fetchCoverLetterByIdAndUserId(id, user),
  ]);

  const [company, application, selectedCoverExperiences] = await Promise.all([
    fetchCompanyById(coverLetter?.company_id),
    fetchApplicationById(coverLetter?.application_id),
    fetchCoverExperiencesByCoverLetterId(coverLetter?.id),
  ]);

  if (
    !userCoverExperiences ??
    !user ??
    !coverLetter ??
    !application ??
    !selectedCoverExperiences ??
    !coverTemplates ??
    !resumeColors ??
    !bodyFonts ??
    !headerFonts
  ) {
    notFound();
  }

  return (
    <CoverStyling
      user={user}
      userCoverExperiences={userCoverExperiences}
      coverLetter={coverLetter}
      company={company}
      application={application}
      selectedCoverExperiences={selectedCoverExperiences}
      coverTemplates={coverTemplates}
      resumeColors={resumeColors}
      bodyFonts={bodyFonts}
      headerFonts={headerFonts}
    />
  );
}

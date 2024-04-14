import {
  fetchBodyFonts,
  fetchCertificationsByUserId,
  fetchCertificationsByResumeID,
  fetchEducationByUserId,
  fetchEducationExperiencesbyResumeID,
  fetchHeaderFonts,
  fetchOrganizationsByResumeID,
  fetchOrganizationsByUserId,
  fetchResumeColors,
  fetchResumeTemplates,
  fetchSkillsByResumeID,
  fetchSkillsByUserId,
  fetchWorkExperiencesByUserId,
  fetchWorkExperiencesbyResumeID,
  getUser,
  fetchResumeByIdAndUserId,
  fetchCoverExperiencesByUserId,
  fetchCoverLetterByIdAndUserId,
  fetchCompanyById,
  fetchApplicationById,
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

  const [user] = await Promise.all([getUser(session?.user?.email!)]);

  const [userCoverExperiences, coverLetter] = await Promise.all([
    fetchCoverExperiencesByUserId(user?.id),
    fetchCoverLetterByIdAndUserId(id, user),
  ]);

  const [company, application] = await Promise.all([
    fetchCompanyById(coverLetter?.company_id),
    fetchApplicationById(coverLetter?.application_id),
  ]);

  if (!userCoverExperiences ?? !user ?? !coverLetter ?? !application) {
    notFound();
  }

  return (
    <CoverStyling
      user={user}
      userCoverExperiences={userCoverExperiences}
      coverLetter={coverLetter}
      company={company}
      application={application}
    />
  );
}

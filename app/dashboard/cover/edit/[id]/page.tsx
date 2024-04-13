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

  const [userCoverExperiences] = await Promise.all([
    fetchCoverExperiencesByUserId(user?.id),
  ]);

  if (!userCoverExperiences ?? !user) {
    notFound();
  }

  return (
    <CoverStyling user={user} userCoverExperiences={userCoverExperiences} />
  );
}

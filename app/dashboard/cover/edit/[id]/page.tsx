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

  const [user, resumeTemplates, resumeColors, bodyFonts, headerFonts] =
    await Promise.all([
      getUser(session?.user?.email!),
      fetchResumeTemplates(),
      fetchResumeColors(),
      fetchBodyFonts(),
      fetchHeaderFonts(),
    ]);

  const [
    userSkills,
    userEducation,
    userOrganizations,
    userCertifications,
    userWorkExperiences,
  ] = await Promise.all([
    fetchSkillsByUserId(user?.id),
    fetchEducationByUserId(user?.id),
    fetchOrganizationsByUserId(user?.id),
    fetchCertificationsByUserId(user?.id),
    fetchWorkExperiencesByUserId(user?.id),
  ]);

  const [
    resume,
    educationResumeLines,
    workResumeLines,
    certificationResumeLines,
    organizationResumeLines,
  ] = await Promise.all([
    fetchResumeByIdAndUserId(id, user),
    fetchEducationExperiencesbyResumeID(id),
    fetchWorkExperiencesbyResumeID(id),
    fetchSkillsByResumeID(id),
    fetchCertificationsByResumeID(id),
    fetchOrganizationsByResumeID(id),
  ]);

  if (
    !resumeTemplates ??
    !resumeColors ??
    !bodyFonts ??
    !headerFonts ??
    !user ??
    !resume ??
    !userSkills ??
    !userEducation ??
    !userOrganizations ??
    !userCertifications ??
    !userWorkExperiences ??
    !educationResumeLines ??
    !workResumeLines ??
    !certificationResumeLines ??
    !organizationResumeLines
  ) {
    notFound();
  }

  return <CoverStyling />;
}
import {
  fetchBodyFonts,
  fetchCerftificationsByUserId,
  fetchCertificationsByResumeID,
  fetchEducationByUserId,
  fetchEducationExperiencesbyResumeID,
  fetchHeaderFonts,
  fetchOrganizationsByResumeID,
  fetchOrganizationsByUserId,
  fetchResumeById,
  fetchResumeColors,
  fetchResumeTemplates,
  fetchSkillsByResumeID,
  fetchSkillsByUserId,
  fetchWorkExperiencesByUserId,
  fetchWorkExperiencesbyResumeID,
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
  const id = params?.id;

  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
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
    fetchCerftificationsByUserId(user?.id),
    fetchWorkExperiencesByUserId(user?.id),
  ]);

  const educationResumeLines = await fetchEducationExperiencesbyResumeID(id);
  const workResumeLines = await fetchWorkExperiencesbyResumeID(id);
  const skillResumeLines = await fetchSkillsByResumeID(id);
  const certificationResumeLines = await fetchCertificationsByResumeID(id);
  const organizationResumeLines = await fetchOrganizationsByResumeID(id);

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

  return (
    <ResumeStyling
      resumeTemplates={resumeTemplates}
      resumeColors={resumeColors}
      bodyFonts={bodyFonts}
      headerFonts={headerFonts}
      user={user}
      resume={resume}
      userSkills={userSkills}
      userEducation={userEducation}
      userOrganizations={userOrganizations}
      userCertifications={userCertifications}
      userWorkExperiences={userWorkExperiences}
      educationResumeLines={educationResumeLines}
      workResumeLines={workResumeLines}
      skillResumeLines={skillResumeLines}
      certificationResumeLines={certificationResumeLines}
      organizationResumeLines={organizationResumeLines}
    />
  );
}

import {
  fetchCerftificationsByUserId,
  fetchEducationByUserId,
  fetchOrganizationsByUserId,
  fetchResumeById,
  fetchSkillsByUserId,
  fetchWorkExperiencesByUserId,
  getUser,
} from "@/app/lib/data";

// http://localhost:3000/api/resume-data?resumeId=4&userId=410544b2-4001-4271-9855-fec4b6a6442a

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resumeId: string | null = searchParams.get("resumeId");
  const userEmail: string | null = searchParams.get("userEmail");

  if (resumeId === null) {
    return Response.json({ message: "no resume id" });
  } else if (userEmail === null) {
    return Response.json({ message: "no user email" });
  }

  const [user, resume] = await Promise.all([
    getUser(userEmail),
    fetchResumeById(resumeId),
  ]);

  if (user === undefined) {
    return Response.json({ message: "not valid email" });
  }

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

  return Response.json({
    user: user,
    resume: resume,
    userSkills: userSkills,
    userEducation: userEducation,
    userOrganizations: userOrganizations,
    userCertifications: userCertifications,
    userWorkExperiences: userWorkExperiences,
  });
}

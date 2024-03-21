import {
  fetchCerftificationsByUserId,
  fetchEducationExperiencesbyResumeID,
  fetchOrganizationsByUserId,
  fetchResumeById,
  fetchSkillsByResumeID,
  fetchSkillsByUserId,
  fetchWorkExperiencesbyResumeID,
  getUser,
} from "@/app/lib/data";
//test
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
    skillResumeLines,
    educationResumeLines,
    userOrganizations,
    userCertifications,
    workResumeLines,
  ] = await Promise.all([
    fetchSkillsByResumeID(resumeId),
    fetchEducationExperiencesbyResumeID(resumeId),
    fetchOrganizationsByUserId(user?.id),
    fetchCerftificationsByUserId(user?.id),
    fetchWorkExperiencesbyResumeID(resumeId),
  ]);

  return Response.json({
    user: user,
    resume: resume,
    skillResumeLines: skillResumeLines,
    educationResumeLines: educationResumeLines,
    userOrganizations: userOrganizations,
    userCertifications: userCertifications,
    workResumeLines: workResumeLines,
  });
}

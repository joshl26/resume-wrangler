import {
  fetchCertificationsByResumeID,
  fetchEducationExperiencesbyResumeID,
  fetchOrganizationsByResumeID,
  fetchResumeById,
  fetchSkillsByResumeID,
  fetchWorkExperiencesbyResumeID,
  getUser,
} from "@/app/lib/data";
//test
// http://localhost:3000/api/resume-data?resumeId=4&userId=410544b2-4001-4271-9855-fec4b6a6442a

// export const dynamic = 'force-dynamic'; // static by default, unless reading the request

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
    organizationResumeLines,
    certificationResumeLines,
    workResumeLines,
  ] = await Promise.all([
    fetchSkillsByResumeID(resumeId),
    fetchEducationExperiencesbyResumeID(resumeId),
    fetchOrganizationsByResumeID(resumeId),
    fetchCertificationsByResumeID(resumeId),
    fetchWorkExperiencesbyResumeID(resumeId),
  ]);

  return Response.json({
    user: user,
    resume: resume,
    skillResumeLines: skillResumeLines,
    educationResumeLines: educationResumeLines,
    organizationResumeLines: organizationResumeLines,
    certificationResumeLines: certificationResumeLines,
    workResumeLines: workResumeLines,
  });
}

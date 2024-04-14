import {
  fetchApplicationById,
  fetchCompanyById,
  fetchCoverExperiencesByCoverLetterId,
  fetchCoverExperiencesByUserId,
  fetchCoverLetterByIdAndUserId,
  getUser,
} from "@/app/lib/data";
//test
// http://localhost:3000/api/resume-data?resumeId=4&userId=410544b2-4001-4271-9855-fec4b6a6442a

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coverId: string | null = searchParams.get("coverId");
  const userEmail: string | null = searchParams.get("userEmail");

  if (coverId === null) {
    return Response.json({ message: "no cover id" });
  } else if (userEmail === null) {
    return Response.json({ message: "no user email" });
  }

  const [user] = await Promise.all([getUser(userEmail)]);

  const [coverLetter] = await Promise.all([
    fetchCoverLetterByIdAndUserId(coverId, user),
  ]);

  if (user === undefined) {
    return Response.json({ message: "not valid email" });
  }

  const [company, application] = await Promise.all([
    fetchCompanyById(coverLetter?.company_id),
    fetchApplicationById(coverLetter?.application_id),
  ]);

  const [selectedCoverExperiences, userCoverExperiences] = await Promise.all([
    fetchCoverExperiencesByCoverLetterId(coverLetter?.id),
    fetchCoverExperiencesByUserId(user?.id),
  ]);

  return Response.json({
    user: user,
    coverLetter: coverLetter,
    selectedCoverExperiences: selectedCoverExperiences,
    userCoverExperiences: userCoverExperiences,
    company: company,
    application: application,
  });
}

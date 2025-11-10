// app/api/cover-data/route.ts
import {
  fetchApplicationById,
  fetchCompanyById,
  fetchCoverExperiencesByCoverLetterId,
  fetchCoverExperiencesByUserId,
  fetchCoverLetterByIdAndUserId,
  getUser,
} from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coverId = searchParams.get("coverId");
  const userEmail = searchParams.get("userEmail");

  if (!coverId) {
    return NextResponse.json({ message: "no cover id" }, { status: 400 });
  }
  if (!userEmail) {
    return NextResponse.json({ message: "no user email" }, { status: 400 });
  }

  const user = await getUser(userEmail);
  if (!user) {
    return NextResponse.json({ message: "not valid email" }, { status: 404 });
  }

  const coverLetter = await fetchCoverLetterByIdAndUserId(coverId, user);
  if (!coverLetter) {
    return NextResponse.json(
      { message: "cover letter not found" },
      { status: 404 },
    );
  }

  // Only call these fetchers when the id exists (otherwise resolve to null)
  const [company, application] = await Promise.all([
    coverLetter.company_id
      ? fetchCompanyById(coverLetter.company_id)
      : Promise.resolve(null),
    coverLetter.application_id
      ? fetchApplicationById(coverLetter.application_id)
      : Promise.resolve(null),
  ]);

  // coverLetter.id should exist (we've verified coverLetter), but guard anyway
  const [selectedCoverExperiences, userCoverExperiences] = await Promise.all([
    coverLetter.id
      ? fetchCoverExperiencesByCoverLetterId(coverLetter.id)
      : Promise.resolve([]),
    fetchCoverExperiencesByUserId(user.id),
  ]);

  return NextResponse.json({
    user,
    coverLetter,
    selectedCoverExperiences,
    userCoverExperiences,
    company,
    application,
    selectedCoverBodyFont: coverLetter.body_font ?? null,
    selectedCoverHeadingFont: coverLetter.heading_font ?? null,
    selectedCoverColor: coverLetter.color ?? null,
    selectedCoverHighlightColor: coverLetter.highlight_color ?? null,
  });
}

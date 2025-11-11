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
import { withRateLimit } from "@/app/lib/rateLimit";

async function coverDataHandler(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const coverId = searchParams.get("coverId");
    const userEmail = searchParams.get("userEmail");

    // Validate inputs
    if (!coverId || typeof coverId !== "string") {
      return NextResponse.json(
        { message: "Valid cover ID is required" },
        { status: 400 }
      );
    }

    if (!userEmail || typeof userEmail !== "string") {
      return NextResponse.json(
        { message: "Valid user email is required" },
        { status: 400 }
      );
    }

    // Sanitize inputs (basic)
    const sanitizedCoverId = coverId.trim();
    const sanitizedUserEmail = userEmail.trim().toLowerCase();

    // Fetch user
    const user = await getUser(sanitizedUserEmail);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Fetch cover letter
    const coverLetter = await fetchCoverLetterByIdAndUserId(
      sanitizedCoverId,
      user.id
    );
    if (!coverLetter) {
      return NextResponse.json(
        { message: "Cover letter not found or access denied" },
        { status: 404 }
      );
    }

    // Fetch related data in parallel
    const [
      company,
      application,
      selectedCoverExperiences,
      userCoverExperiences
    ] = await Promise.all([
      coverLetter.company_id
        ? fetchCompanyById(coverLetter.company_id)
        : Promise.resolve(null),
      coverLetter.application_id
        ? fetchApplicationById(coverLetter.application_id)
        : Promise.resolve(null),
      fetchCoverExperiencesByCoverLetterId(coverLetter.id),
      fetchCoverExperiencesByUserId(user.id)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        coverLetter: {
          id: coverLetter.id,
          title: coverLetter.title,
          body: coverLetter.body,
          createdAt: coverLetter.created_at,
          updatedAt: coverLetter.updated_at,
          companyId: coverLetter.company_id,
          applicationId: coverLetter.application_id
        },
        selectedCoverExperiences,
        userCoverExperiences,
        company,
        application,
        styling: {
          bodyFont: coverLetter.body_font ?? null,
          headingFont: coverLetter.heading_font ?? null,
          color: coverLetter.color ?? null,
          highlightColor: coverLetter.highlight_color ?? null
        }
      }
    });
  } catch (error) {
    console.error("Cover data fetch error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch cover data" 
      },
      { status: 500 }
    );
  }
}

// Apply moderate rate limiting (100 requests per 15 minutes)
export const GET = withRateLimit(coverDataHandler, 100, 900);
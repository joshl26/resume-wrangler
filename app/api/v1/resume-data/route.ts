// app/api/resume-data/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  fetchCertificationsByResumeID,
  fetchEducationExperiencesbyResumeID,
  fetchOrganizationsByResumeID,
  fetchResumeById,
  fetchSkillsByResumeID,
  fetchWorkExperiencesbyResumeID,
  getUser,
} from "@/app/lib/data";
import { withRateLimit } from "@/app/lib/rateLimit";

async function resumeDataHandler(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const resumeIdRaw = searchParams.get("resumeId");
    const userEmailRaw = searchParams.get("userEmail");

    if (!resumeIdRaw) {
      return NextResponse.json(
        { success: false, message: "resumeId is required" },
        { status: 400 },
      );
    }
    if (!userEmailRaw) {
      return NextResponse.json(
        { success: false, message: "userEmail is required" },
        { status: 400 },
      );
    }

    const resumeId = resumeIdRaw.trim();
    const userEmail = userEmailRaw.trim().toLowerCase();

    // Resolve user + resume in parallel
    const [user, resume] = await Promise.all([
      getUser(userEmail),
      fetchResumeById(resumeId),
    ]);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (!resume) {
      return NextResponse.json(
        { success: false, message: "Resume not found" },
        { status: 404 },
      );
    }

    // Authorization: allow if owner or admin
    if (user.access_level !== "admin" && resume.user_id !== user.id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    // Fetch resume-linked data in parallel
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

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          resume,
          skillResumeLines,
          educationResumeLines,
          organizationResumeLines,
          certificationResumeLines,
          workResumeLines,
        },
      },
      {
        status: 200,
        headers: {
          // Set caching as appropriate. If the data is sensitive, use 'no-store'
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error: any) {
    console.error("resume-data error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch resume data" },
      { status: 500 },
    );
  }
}

// Apply rate limiting: adjust points/duration as you prefer
export const GET = withRateLimit(resumeDataHandler, 100, 900);

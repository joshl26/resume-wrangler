// app/dashboard/cover/edit/[id]/page.tsx
import {
  fetchBodyFonts,
  fetchHeaderFonts,
  fetchResumeColors,
  getUser,
  fetchCoverExperiencesByUserId,
  fetchCoverLetterByIdAndUserId,
  fetchCompanyById,
  fetchApplicationById,
  fetchCoverExperiencesByCoverLetterId,
  fetchCoverTemplates,
} from "@/app/lib/data";
import CoverStyling from "@/app/ui/cover-styling/cover-styling";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import type {
  UserCoverExperiences,
  UserCoverExperienceLines,
  CoverTemplate,
  ResumeColor,
  BodyFont,
  HeaderFont,
  CoverLetter,
  Company,
  Application,
  User,
} from "@/app/lib/definitions";

/**
 * Edit Cover Letter styling page
 *
 * - Ensures fetched arrays are normalized (filter out nulls).
 * - Requires company and application to exist (so props match CoverStyling's types).
 * - Normalizes selected cover experiences into the "lines" shape expected by CoverStyling.
 */

type Params = { id: string };

interface PageProps {
  // Next may pass params as a Promise or a plain object
  params?: Promise<Params>;
}

// Type guard to filter out null/undefined entries from arrays
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

/**
 * Normalize selected cover experiences so the result matches
 * the expected UserCoverExperienceLines shape:
 *   { cover_letter_id: string; cover_experience_id: string; … }
 */
function normalizeToLines(
  items: unknown[] | null | undefined,
  coverLetterId: string,
): UserCoverExperienceLines {
  const arr = (items ?? []).filter(notNull);

  return arr.map((it) => {
    // If it's already a line-like object
    if (
      it &&
      typeof it === "object" &&
      "cover_letter_id" in it &&
      "cover_experience_id" in it
    ) {
      const obj = it as any;
      return {
        cover_letter_id: String(obj.cover_letter_id),
        cover_experience_id: String(obj.cover_experience_id),
        ...(obj.line ? { line: obj.line } : {}),
      } as UserCoverExperienceLines[number];
    }

    // If it's a cover-experience object with an `id`
    if (
      it &&
      typeof it === "object" &&
      ("id" in (it as any) || "cover_experience_id" in (it as any))
    ) {
      const obj = it as any;
      const ceId = obj.id ?? obj.cover_experience_id;
      return {
        cover_letter_id: coverLetterId,
        cover_experience_id: String(ceId),
      } as UserCoverExperienceLines[number];
    }

    // Fallback: create a minimal line with empty ids (shouldn't happen)
    return {
      cover_letter_id: coverLetterId,
      cover_experience_id: String((it as any)?.id ?? ""),
    } as UserCoverExperienceLines[number];
  });
}

export default async function EditCover({ params }: PageProps) {
  const resolvedParams = await params;
  if (!resolvedParams) return notFound();

  const { id } = resolvedParams;

  // Auth & user
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return notFound();

  session.user = { name: session.user?.name, email };

  const user = await getUser(email);
  if (!user || !user.id) return notFound();

  // Fetch independent resources in parallel
  const [
    coverTemplatesRaw,
    resumeColorsRaw,
    bodyFontsRaw,
    headerFontsRaw,
    userCoverExperiencesRaw,
  ] = await Promise.all([
    fetchCoverTemplates(),
    fetchResumeColors(),
    fetchBodyFonts(),
    fetchHeaderFonts(),
    fetchCoverExperiencesByUserId(user.id),
  ]);

  // Validate non-null responses
  if (
    coverTemplatesRaw == null ||
    resumeColorsRaw == null ||
    bodyFontsRaw == null ||
    headerFontsRaw == null ||
    userCoverExperiencesRaw == null
  ) {
    return notFound();
  }

  // Normalize and filter out nulls
  const coverTemplates = (coverTemplatesRaw ?? []).filter(
    notNull,
  ) as CoverTemplate[];
  const resumeColors = (resumeColorsRaw ?? []).filter(notNull) as ResumeColor[];
  const bodyFonts = (bodyFontsRaw ?? []).filter(notNull) as BodyFont[];
  const headerFonts = (headerFontsRaw ?? []).filter(notNull) as HeaderFont[];
  const userCoverExperiences = (userCoverExperiencesRaw ?? []).filter(
    notNull,
  ) as UserCoverExperiences;

  // Fetch the cover letter (depends on id and user)
  const coverLetter = await fetchCoverLetterByIdAndUserId(id, user);
  if (!coverLetter) return notFound();

  // Require coverLetter to have company_id and application_id to satisfy <CoverStyling /> types.
  if (!coverLetter.company_id || !coverLetter.application_id) {
    return notFound();
  }

  // Fetch company and application (both required)
  const [company, application, selectedCoverExperiencesRaw] = await Promise.all(
    [
      fetchCompanyById(coverLetter.company_id),
      fetchApplicationById(coverLetter.application_id),
      fetchCoverExperiencesByCoverLetterId(coverLetter.id),
    ],
  );

  if (!company || !application || selectedCoverExperiencesRaw == null) {
    return notFound();
  }

  const selectedCoverExperiences = normalizeToLines(
    selectedCoverExperiencesRaw,
    coverLetter.id,
  );

  // Final check (mostly defensive; previous checks already ensure existence)
  if (
    !user ||
    !coverLetter ||
    !coverTemplates.length ||
    !resumeColors.length ||
    !bodyFonts.length ||
    !headerFonts.length ||
    !userCoverExperiences.length ||
    !selectedCoverExperiences.length
  ) {
    return notFound();
  }

  return (
    <CoverStyling
      user={user as User}
      userCoverExperiences={userCoverExperiences}
      coverLetter={coverLetter as CoverLetter}
      company={company as Company}
      application={application as Application}
      selectedCoverExperiences={
        selectedCoverExperiences as UserCoverExperienceLines
      }
      coverTemplates={coverTemplates}
      resumeColors={resumeColors}
      bodyFonts={bodyFonts}
      headerFonts={headerFonts}
    />
  );
}

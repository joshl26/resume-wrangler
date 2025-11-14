// app/resume/[id]/edit/page.tsx
import {
  fetchBodyFonts,
  fetchCertificationsByResumeID,
  fetchCertificationsByUserId,
  fetchEducationByUserId,
  fetchEducationExperiencesbyResumeID,
  fetchHeaderFonts,
  fetchOrganizationsByResumeID,
  fetchOrganizationsByUserId,
  fetchResumeByIdAndUserId,
  fetchResumeColors,
  fetchResumeTemplates,
  fetchSkillsByResumeID,
  fetchSkillsByUserId,
  fetchWorkExperiencesByUserId,
  fetchWorkExperiencesbyResumeID,
  fetchApplicationById,
  fetchCompanyById,
  getUser,
} from "@/app/lib/data";
import ResumeStyling from "@/app/ui/resume-styling/resume-styling";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import type {
  ResumeTemplate,
  ResumeColor,
  BodyFont,
  HeaderFont,
  User,
  Resume,
  UserSkill,
  UserEducationExperience,
  UserOrganization,
  UserCertification,
  UserWorkExperience,
  ResumeLine,
  Application,
  Company,
} from "@/app/lib/definitions";

type Params = { id: string };

interface PageProps {
  params?: Promise<Params>;
}

// Type guard to filter out null/undefined from arrays
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

/**
 * Map resume-line rows to actual user entity objects by ID.
 * - `lines` can be ResumeLine[] OR already an array of entities.
 * - `entities` is the array of user entities fetched earlier (UserEducationExperience[], UserWorkExperience[], etc.)
 * - `idKey` is the property on ResumeLine that references the entity id (e.g. 'user_education_id')
 */
function mapLinesToEntities<TEntity extends { id: string }>(
  lines: unknown[] | null | undefined,
  entities: TEntity[],
  idKey: string,
): TEntity[] {
  if (!lines) return [];

  // If the lines are already entity objects (have id + user_id etc.) just filter and return
  const maybeEntities = (lines as unknown[]).filter(notNull) as unknown[];
  if (
    maybeEntities.length &&
    typeof maybeEntities[0] === "object" &&
    "id" in (maybeEntities[0] as any) &&
    "user_id" in (maybeEntities[0] as any)
  ) {
    // treat as entities already
    return maybeEntities.filter((x): x is TEntity => {
      const e = x as any;
      return typeof e.id === "string";
    });
  }

  // Otherwise lines are likely ResumeLine[] referencing entity ids
  const resumeLines = (lines as ResumeLine[]).filter(notNull);
  const mapped: (TEntity | null)[] = resumeLines.map((rl) => {
    const refId = (rl as any)[idKey] as string | undefined;
    if (!refId) return null;
    return entities.find((e) => e.id === refId) ?? null;
  });

  return mapped.filter(notNull);
}

export default async function EditResume({ params }: PageProps) {
  const resolvedParams = await params;
  if (!resolvedParams) return notFound();

  const { id } = resolvedParams;

  // Auth: require authenticated user with an email
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return notFound();

  // Fetch the full user record using email (do not mutate session.user)
  const user = await getUser(email);
  if (!user) return notFound();

  // Fetch independent resources in parallel
  const [
    resumeTemplatesRaw,
    resumeColorsRaw,
    bodyFontsRaw,
    headerFontsRaw,
    userSkillsRaw,
    userEducationRaw,
    userOrganizationsRaw,
    userCertificationsRaw,
    userWorkExperiencesRaw,
  ] = await Promise.all([
    fetchResumeTemplates(),
    fetchResumeColors(),
    fetchBodyFonts(),
    fetchHeaderFonts(),
    fetchSkillsByUserId(user.id),
    fetchEducationByUserId(user.id),
    fetchOrganizationsByUserId(user.id),
    fetchCertificationsByUserId(user.id),
    fetchWorkExperiencesByUserId(user.id),
  ]);

  // Normalize arrays (filter out nulls) and cast to proper types from definitions
  const resumeTemplates = (resumeTemplatesRaw ?? []).filter(
    notNull,
  ) as ResumeTemplate[];
  const resumeColors = (resumeColorsRaw ?? []).filter(notNull) as ResumeColor[];
  const bodyFonts = (bodyFontsRaw ?? []).filter(notNull) as BodyFont[];
  const headerFonts = (headerFontsRaw ?? []).filter(notNull) as HeaderFont[];
  const userSkills = (userSkillsRaw ?? []).filter(notNull) as UserSkill[];
  const userEducation = (userEducationRaw ?? []).filter(
    notNull,
  ) as UserEducationExperience[];
  const userOrganizations = (userOrganizationsRaw ?? []).filter(
    notNull,
  ) as UserOrganization[];
  const userCertifications = (userCertificationsRaw ?? []).filter(
    notNull,
  ) as UserCertification[];
  const userWorkExperiences = (userWorkExperiencesRaw ?? []).filter(
    notNull,
  ) as UserWorkExperience[];

  // Fetch resume and its dependent resume-specific lines
  const [
    resume,
    educationResumeLinesRaw,
    workResumeLinesRaw,
    skillResumeLinesRaw,
    certificationResumeLinesRaw,
    organizationResumeLinesRaw,
  ] = await Promise.all([
    fetchResumeByIdAndUserId(id, user),
    fetchEducationExperiencesbyResumeID(id),
    fetchWorkExperiencesbyResumeID(id),
    fetchSkillsByResumeID(id),
    fetchCertificationsByResumeID(id),
    fetchOrganizationsByResumeID(id),
  ]);

  if (!resume) return notFound();

  // Map resume-line rows to actual user entities:
  // - Education lines -> UserEducationExperience[]
  // - Work lines -> UserWorkExperience[]
  // - Skill lines -> UserSkill[]
  // certificationResumeLinesRaw and organizationResumeLinesRaw often already return the entity arrays;
  // handle both cases gracefully by using mapLinesToEntities which detects the shape.
  const educationResumeLines = mapLinesToEntities<UserEducationExperience>(
    educationResumeLinesRaw,
    userEducation,
    "user_education_id",
  );

  const workResumeLines = mapLinesToEntities<UserWorkExperience>(
    workResumeLinesRaw,
    userWorkExperiences,
    "work_experience_id",
  );

  const skillResumeLines = mapLinesToEntities<UserSkill>(
    skillResumeLinesRaw,
    userSkills,
    "user_skills_id",
  );

  // Certifications and organizations: the fetchers may return entity arrays directly.
  // If they return ResumeLine-like rows, try to map via obvious id keys; otherwise treat as entities.
  const certificationResumeLines = Array.isArray(certificationResumeLinesRaw)
    ? (certificationResumeLinesRaw as unknown[])
        .filter(notNull)
        .filter(
          (x): x is UserCertification =>
            "id" in (x as any) && "user_id" in (x as any),
        )
    : [];

  const organizationResumeLines = Array.isArray(organizationResumeLinesRaw)
    ? (organizationResumeLinesRaw as unknown[])
        .filter(notNull)
        .filter(
          (x): x is UserOrganization =>
            "id" in (x as any) && "user_id" in (x as any),
        )
    : [];

  // Require application to exist on the resume because ResumeStyling expects an Application.
  if (!resume.application_id) {
    return notFound();
  }

  // Fetch application (required)
  const application = await fetchApplicationById(resume.application_id);
  if (!application) return notFound();

  // Require company to exist on the application and successfully fetch it so we can pass a non-null Company prop.
  if (!application.company_id) return notFound();
  const company = await fetchCompanyById(application.company_id);
  if (!company) return notFound();

  // Final checks: ensure required pieces exist
  if (
    resumeTemplates.length === 0 ||
    resumeColors.length === 0 ||
    bodyFonts.length === 0 ||
    headerFonts.length === 0
  ) {
    return notFound();
  }

  return (
    <ResumeStyling
      resumeTemplates={resumeTemplates}
      resumeColors={resumeColors}
      bodyFonts={bodyFonts}
      headerFonts={headerFonts}
      user={user as User}
      resume={resume as Resume}
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
      application={application as Application}
      company={company as Company}
    />
  );
}

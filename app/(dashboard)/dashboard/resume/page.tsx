// app/dashboard/resumes/page.tsx
import React, { JSX } from "react";
import {
  fetchApplicationsByUserId,
  fetchLatestCompaniesByUserId,
  fetchResumesByUserIDJoinApplications,
  getUser,
} from "@/app/lib/data";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import BackButton from "@/app/ui/back-button";
import Resumes from "@/app/ui/tables/resumes/resumes-table";
import type { Resume, Application } from "@/app/lib/definitions";

/** Type guard to filter out null/undefined entries from arrays */
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

/** Normalize input to array */
function toArray<T>(input: T[] | Iterable<T>): T[] {
  return Array.isArray(input) ? input : Array.from(input);
}

// Local type for merged objects (resume + some application fields)
type ResumeWithApplication = Resume & Partial<Application>;

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();

  // Require authenticated user with an email
  const email = session?.user?.email;
  if (!email) return notFound();

  // Fetch full user record using email (do not mutate session.user)
  const user = await getUser(email);
  if (!user?.id) return notFound();

  // Fetch all data in parallel
  const [resumesRaw, applicationsRaw, companiesRaw] = await Promise.all([
    fetchResumesByUserIDJoinApplications(user.id),
    fetchApplicationsByUserId(user.id),
    fetchLatestCompaniesByUserId(user.id),
  ]);

  if (!resumesRaw || !applicationsRaw || !companiesRaw) {
    return notFound();
  }

  // Normalize and filter out null/undefined entries
  const resumes = toArray(resumesRaw).filter(notNull);
  const applications = toArray(applicationsRaw).filter(notNull);
  const companies = toArray(companiesRaw).filter(notNull);

  // Merge each resume with its matching application (if any)
  const mergedResumes: ResumeWithApplication[] = resumes.map((resume) => {
    const application = applications.find(
      (app) => app.id === resume.application_id,
    );
    return {
      ...resume,
      ...application,
    };
  });

  return (
    <div className="w-full h-full px-2">
      <BackButton href="/dashboard/">Back</BackButton>

      <div className="flex flex-col">
        <h1 className="text-[2rem] font-bold py-1">Resumes</h1>
      </div>

      {/* Pass the merged resumes (Resume & Partial<Application>) and companies.
          The Resumes table component expects items that may include application fields. */}
      <Resumes user={user} resumes={mergedResumes} companies={companies} />
    </div>
  );
}

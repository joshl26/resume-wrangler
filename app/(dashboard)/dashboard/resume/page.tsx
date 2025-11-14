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
import type { User, Resume, Application, Company } from "@/app/lib/definitions";

/** Type guard to filter out null/undefined entries from arrays */
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
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
  if (!user || !user.id) return notFound();

  // Fetch everything in parallel
  const [resumesRaw, applicationsRaw, companiesRaw] = await Promise.all([
    fetchResumesByUserIDJoinApplications(user.id),
    fetchApplicationsByUserId(user.id),
    fetchLatestCompaniesByUserId(user.id),
  ]);

  if (resumesRaw == null || applicationsRaw == null || companiesRaw == null) {
    return notFound();
  }

  // Normalize raw responses -> plain arrays
  const resumesArray = Array.isArray(resumesRaw)
    ? resumesRaw
    : Array.from(resumesRaw as Iterable<unknown>);
  const applicationsArray = Array.isArray(applicationsRaw)
    ? applicationsRaw
    : Array.from(applicationsRaw as Iterable<unknown>);
  const companiesArray = Array.isArray(companiesRaw)
    ? companiesRaw
    : Array.from(companiesRaw as Iterable<unknown>);

  // Filter out null/undefined entries and cast to proper types
  const resumes = resumesArray.filter(notNull) as Resume[];
  const applications = applicationsArray.filter(notNull) as Application[];
  const companies = companiesArray.filter(notNull) as Company[];

  // Merge each resume with its matching application (if any).
  const mergedResumes: ResumeWithApplication[] = resumes.map((r) => {
    const app = applications.find((a) => a.id === r.application_id) ?? {};
    return {
      ...r,
      ...app,
    } as ResumeWithApplication;
  });

  return (
    <div className="w-full h-full px-2">
      <BackButton className="" href={"/dashboard/"}>
        Back
      </BackButton>

      <div className="flex flex-col ">
        <h1 className="text-[2rem] font-bold py-1">Resumes</h1>
      </div>

      {/* Pass the merged resumes (Resume & Partial<Application>) and companies.
          The Resumes table component expects items that may include application fields. */}
      <Resumes
        user={user as User}
        resumes={mergedResumes}
        companies={companies}
      />
    </div>
  );
}

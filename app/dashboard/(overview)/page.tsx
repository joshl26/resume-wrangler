// app/dashboard/(overview)/page.tsx (streaming-friendly)
import React, { Suspense } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";
import Dashboard from "@/app/ui/dashboard/dashboard";
import { auth } from "@/auth";
import BackButton from "@/ui/back-button";
import {
  CardCountsSkeleton,
  ApplicationsTableSkeleton,
} from "@/app/ui/skeletons";
import {
  Applications,
  Companies,
  CoverLetters,
  Resumes,
} from "@/app/lib/definitions";

export default async function Page() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return (
      <main className="w-full p-6">
        <p className="text-center">Please sign in to view your dashboard.</p>
      </main>
    );
  }

  return (
    <main className="w-full">
      {/* Cards stream independently */}
      <Suspense fallback={<CardCountsSkeleton />}>
        <CardCounts userEmail={email} />
      </Suspense>

      {/* Applications table can be heavy; stream separately */}
      <Suspense fallback={<ApplicationsTableSkeleton />}>
        <ApplicationsList userEmail={email} />
      </Suspense>
    </main>
  );
}

// CardCounts — async server component that fetches counts in parallel
async function CardCounts({ userEmail }: { userEmail: string }) {
  const { getUser } = await import("@/app/lib/data");
  const user = await getUser(userEmail);
  if (!user) return null;

  const [
    openApplicationsCount,
    closedApplicationsCount,
    pendingApplicationsCount,
  ] = await Promise.all([
    (await import("@/app/lib/data")).fetchOpenApplicationsCountByUserId(
      user.id,
    ),
    (await import("@/app/lib/data")).fetchClosedApplicationsCountByUserId(
      user.id,
    ),
    (await import("@/app/lib/data")).fetchPendingApplicationsCountByUserId(
      user.id,
    ),
  ]);

  return (
    <Dashboard
      user={user}
      applications={[]} // streamed separately below
      openApplicationsCount={openApplicationsCount}
      closedApplicationsCount={closedApplicationsCount}
      pendingApplicationsCount={pendingApplicationsCount}
    />
  );
}

// server-side ApplicationsList (replace existing implementation)
async function ApplicationsList({ userEmail }: { userEmail: string }) {
  const {
    getUser,
    fetchApplicationsByUserId,
    fetchResumesByUserIDJoinApplications,
    fetchCoverLettersByUserIDJoinApplications,
    fetchLatestCompaniesByUserId,
    fetchApplicationsPages,
    fetchApplicationsCount,
  } = await import("@/app/lib/data");

  const user = await getUser(userEmail);
  if (!user) return null;

  const [
    applicationsRaw,
    resumesRaw,
    coverLettersRaw,
    companiesRaw,
    totalPagesRaw,
    totalCountRaw,
  ] = await Promise.all([
    fetchApplicationsByUserId(user.id),
    fetchResumesByUserIDJoinApplications(user.id),
    fetchCoverLettersByUserIDJoinApplications(user.id),
    fetchLatestCompaniesByUserId(user.id),
    fetchApplicationsPages("", user.id, ""),
    fetchApplicationsCount("", user.id, ""),
  ]);

  // Generic type guard to remove null/undefined and let TS narrow types correctly
  const isNotNull = <T,>(v: T | null | undefined): v is T => v != null;

  const applications: Applications = Array.isArray(applicationsRaw)
    ? (applicationsRaw.filter(isNotNull) as Applications)
    : ([] as Applications);

  const resumes: Resumes = Array.isArray(resumesRaw)
    ? (resumesRaw.filter(isNotNull) as Resumes)
    : ([] as Resumes);

  const coverLetters: CoverLetters = Array.isArray(coverLettersRaw)
    ? (coverLettersRaw.filter(isNotNull) as CoverLetters)
    : ([] as CoverLetters);

  const companies: Companies = Array.isArray(companiesRaw)
    ? (companiesRaw.filter(isNotNull) as Companies)
    : ([] as Companies);

  const totalPages = Number(totalPagesRaw) || 1;
  const totalCount = Number(totalCountRaw) || applications.length;
  const currentPage = 1;
  const query = "";
  const sort = "";

  const { default: ApplicationsTable } = await import(
    "@/app/ui/tables/applications/applications-table"
  );

  return (
    <ApplicationsTable
      user={user}
      resumes={resumes}
      coverLetters={coverLetters}
      companies={companies}
      totalPages={totalPages}
      query={query}
      currentPage={currentPage}
      totalCount={totalCount}
      sort={sort}
      serverApplications={applications}
    />
  );
}

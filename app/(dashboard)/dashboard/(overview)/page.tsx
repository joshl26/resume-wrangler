// app/dashboard/(overview)/page.tsx (streaming-friendly)
import React, { Suspense } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";
import Dashboard from "@/app/ui/dashboard/dashboard";
import { auth } from "@/auth";
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
import {
  fetchOpenApplicationsCountByUserId,
  fetchClosedApplicationsCountByUserId,
  fetchPendingApplicationsCountByUserId,
  fetchApplicationsByUserId,
  fetchResumesByUserIDJoinApplications,
  fetchCoverLettersByUserIDJoinApplications,
  fetchLatestCompaniesByUserId,
  fetchApplicationsPages,
  fetchApplicationsCount,
  getUser,
} from "@/app/lib/data";

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
    <main className="w-full max-h-screen ">
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
  const user = await getUser(userEmail);
  if (!user) return null;

  try {
    const [
      openApplicationsCount,
      closedApplicationsCount,
      pendingApplicationsCount,
    ] = await Promise.allSettled([
      fetchOpenApplicationsCountByUserId(user.id),
      fetchClosedApplicationsCountByUserId(user.id),
      fetchPendingApplicationsCountByUserId(user.id),
    ]);

    // Extract values or use 0 as fallback
    const openCount =
      openApplicationsCount.status === "fulfilled"
        ? openApplicationsCount.value
        : 0;
    const closedCount =
      closedApplicationsCount.status === "fulfilled"
        ? closedApplicationsCount.value
        : 0;
    const pendingCount =
      pendingApplicationsCount.status === "fulfilled"
        ? pendingApplicationsCount.value
        : 0;

    return (
      <Dashboard
        user={user}
        applications={[]} // streamed separately below
        openApplicationsCount={openCount}
        closedApplicationsCount={closedCount}
        pendingApplicationsCount={pendingCount}
      />
    );
  } catch (error) {
    console.error("Failed to fetch card counts:", error);
    return (
      <Dashboard
        user={user}
        applications={[]}
        openApplicationsCount={0}
        closedApplicationsCount={0}
        pendingApplicationsCount={0}
      />
    );
  }
}

// server-side ApplicationsList (replace existing implementation)
async function ApplicationsList({ userEmail }: { userEmail: string }) {
  const user = await getUser(userEmail);
  if (!user) return null;

  try {
    const [
      applicationsRaw,
      resumesRaw,
      coverLettersRaw,
      companiesRaw,
      totalPagesRaw,
      totalCountRaw,
    ] = await Promise.allSettled([
      fetchApplicationsByUserId(user.id),
      fetchResumesByUserIDJoinApplications(user.id),
      fetchCoverLettersByUserIDJoinApplications(user.id),
      fetchLatestCompaniesByUserId(user.id),
      fetchApplicationsPages("", user.id, ""),
      fetchApplicationsCount("", user.id, ""),
    ]);

    // Extract values with proper fallbacks
    const applications: Applications =
      applicationsRaw.status === "fulfilled" &&
      Array.isArray(applicationsRaw.value)
        ? applicationsRaw.value.filter(
            (v): v is NonNullable<typeof v> => v != null,
          )
        : [];

    const resumes: Resumes =
      resumesRaw.status === "fulfilled" && Array.isArray(resumesRaw.value)
        ? resumesRaw.value.filter((v): v is NonNullable<typeof v> => v != null)
        : [];

    const coverLetters: CoverLetters =
      coverLettersRaw.status === "fulfilled" &&
      Array.isArray(coverLettersRaw.value)
        ? coverLettersRaw.value.filter(
            (v): v is NonNullable<typeof v> => v != null,
          )
        : [];

    const companies: Companies =
      companiesRaw.status === "fulfilled" && Array.isArray(companiesRaw.value)
        ? companiesRaw.value.filter(
            (v): v is NonNullable<typeof v> => v != null,
          )
        : [];

    const totalPages =
      totalPagesRaw.status === "fulfilled"
        ? Number(totalPagesRaw.value) || 1
        : 1;
    const totalCount =
      totalCountRaw.status === "fulfilled"
        ? Number(totalCountRaw.value) || applications.length
        : applications.length;

    const currentPage = 1;
    const query = "";
    const sort = "";

    const ApplicationsTable = (
      await import("@/app/ui/tables/applications/applications-table")
    ).default;

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
  } catch (error) {
    console.error("Failed to fetch applications data:", error);
    return (
      <div className="p-6 text-center">
        <p>Failed to load applications. Please try again later.</p>
      </div>
    );
  }
}

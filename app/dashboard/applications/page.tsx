// app/dashboard/applications/page.tsx
import {
  fetchApplicationsByUserId,
  fetchApplicationsCount,
  fetchApplicationsPages,
  fetchCoverLettersByUserId,
  fetchLatestCompaniesByUserId,
  fetchResumesByUserId,
  getUser,
} from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import ApplicationsTable from "@/app/ui/tables/applications/applications-table";
import { auth } from "@/auth";
import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import BackButton from "@/app/ui/back-button";
import Search from "@/app/ui/search";
import Dropdown from "@/app/ui/DropdownButton";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

type SearchParams = {
  query?: string;
  page?: string;
  sort?: string;
};

interface PageProps {
  // Match Next's generated signature: searchParams may be a Promise or undefined
  searchParams?: Promise<SearchParams>;
}

// Type guard to filter out null/undefined entries from arrays
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page({ searchParams }: PageProps) {
  // Await so it works whether searchParams is a Promise or plain object
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";
  const sort = resolvedSearchParams?.sort || "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const session = await auth();
  // Ensure session user + email exist before calling getUser
  const email = session?.user?.email;
  if (!email) {
    return notFound();
  }

  const user = await getUser(email);
  if (!user || !user.id) {
    return notFound();
  }

  // Fetch data in parallel
  const [applicationsRaw, companiesRaw, resumesRaw, coverLettersRaw] =
    await Promise.all([
      fetchApplicationsByUserId(user.id),
      fetchLatestCompaniesByUserId(user.id),
      fetchResumesByUserId(user.id),
      fetchCoverLettersByUserId(user.id),
    ]);

  // Filter out any null/undefined entries returned by the fetchers
  const applications = (applicationsRaw ?? []).filter(notNull);
  const companies = (companiesRaw ?? []).filter(notNull);
  const resumes = (resumesRaw ?? []).filter(notNull);
  const coverLetters = (coverLettersRaw ?? []).filter(notNull);

  // If you prefer to treat empty lists as "valid" (not 404), remove the following check.
  if (!applications || !companies || !resumes || !coverLetters) {
    return notFound();
  }

  // Compute pagination values
  const totalPages = await fetchApplicationsPages(query, user.id, sort);
  const totalCount = await fetchApplicationsCount(query, user.id, sort);

  return (
    <div className="w-full px-2 ">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col">
          <BackButton className={""} href={"/dashboard/"}>
            Back
          </BackButton>
        </div>
        <div className="flex flex-col pr-3">
          <Button className="btn btn-amber tight-shadow hover:animate-pulse">
            <a href="/dashboard/applications/new" className="m-auto">
              Add New Application
            </a>
          </Button>
        </div>
      </div>

      <div className="flex flex-row justify-between ">
        <div className="flex flex-col">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col pr-3">
          <div className="flex flex-row gap-x-3 m-auto ">
            <div className="flex flex-col ">
              <Search placeholder="Search applications..." />
            </div>
            <div className="flex flex-col">
              <Dropdown />
            </div>
          </div>
        </div>
      </div>

      <Suspense key={query + currentPage}>
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
        />
      </Suspense>
    </div>
  );
}

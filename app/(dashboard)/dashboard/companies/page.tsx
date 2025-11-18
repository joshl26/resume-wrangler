// app/dashboard/companies/page.tsx
import {
  fetchCompaniesCount,
  fetchCompaniesPages,
  fetchFilteredCompanies,
  fetchLatestCompaniesByUserId,
  getUser,
} from "@/app/lib/data";
import { Companies } from "@/app/lib/definitions";
import Breadcrumb from "@/app/ui/Breadcrumb";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import Search from "@/app/ui/search";
import CompaniesTable from "@/app/ui/tables/companies/companies-table";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

type SearchParams = {
  query?: string;
  page?: string;
};

interface PageProps {
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
  const [companiesRaw, filteredCompaniesRaw] = await Promise.all([
    fetchLatestCompaniesByUserId(user.id),
    fetchFilteredCompanies(query, currentPage, user.id),
  ]);

  // Filter out any null/undefined entries returned by the fetchers
  const companies = (companiesRaw ?? []).filter(notNull);
  const filteredCompanies = (filteredCompaniesRaw ?? []).filter(notNull);

  // Compute pagination values
  const totalPages = await fetchCompaniesPages(query, user.id);
  const totalCount = await fetchCompaniesCount(query, user.id);

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Companies", url: "/dashboard/companies/" },
  ];

  return (
    <div className="w-full px-2">
      <div className="flex flex-col">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </nav>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col pr-3 pb-5">
          <div className="flex flex-row gap-x-3 m-auto">
            <div className="flex flex-col">
              <Search placeholder="Search companies..." />
            </div>
            <div className="flex flex-col">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/companies/new" className="m-auto">
                  Add New Company
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Suspense key={query + currentPage}>
        <CompaniesTable
          companies={companies}
          user={user}
          totalPages={totalPages}
          query={query}
          currentPage={currentPage}
          totalCount={totalCount}
          filteredCompanies={filteredCompanies}
        />
      </Suspense>
      <div className="pt-10">
        <BackButton href={"/dashboard/"}>Back to Dashboard</BackButton>
      </div>
    </div>
  );
}

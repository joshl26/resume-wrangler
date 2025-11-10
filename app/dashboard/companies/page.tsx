// app/dashboard/companies/page.tsx
import {
  fetchCompaniesCount,
  fetchCompaniesPages,
  fetchFilteredCompanies,
  fetchLatestCompaniesByUserId,
  getUser,
} from "@/app/lib/data";
import { Companies } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
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
  // Match Next's generated signature: searchParams may be a Promise or undefined
  searchParams?: Promise<SearchParams>;
}

// Type guard to filter out null/undefined from arrays
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page({ searchParams }: PageProps) {
  // Allow searchParams to be Promise or a plain object
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const session = await auth();
  if (!session?.user) {
    return notFound();
  }

  // Only keep needed fields
  session.user = {
    name: session.user.name,
    email: session.user.email,
  };

  const user = await getUser(session.user.email!);
  if (!user) return notFound();

  // Fetch raw companies; these fetchers sometimes return arrays containing nulls
  const companiesRaw = await fetchLatestCompaniesByUserId(user.id);

  // Filter out nulls to produce a strict Companies type
  const companies: Companies = (companiesRaw ?? []).filter(
    notNull,
  ) as Companies;

  if (!companies || companies.length === 0) {
    return notFound();
  }

  const totalPages = await fetchCompaniesPages(query, user.id);
  const totalCount = await fetchCompaniesCount(query, user.id);

  // filteredCompanies should already be typed as Companies from your API, but guard anyway
  const filteredCompaniesRaw = await fetchFilteredCompanies(
    query,
    currentPage,
    user.id,
  );
  const filteredCompanies: Companies = (filteredCompaniesRaw ?? []).filter(
    notNull,
  ) as Companies;

  return (
    <div className="h-full w-full px-2">
      <BackButton className="" href={"/dashboard/"}>
        Back
      </BackButton>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col px-4">
          <div className="flex flex-row gap-x-3 h-auto ">
            <div className="flex flex-col w-1/2 m-auto  ">
              <Search placeholder="Search companies..." />
            </div>
            <div className="flex flex-col w-1/2 m-auto">
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
    </div>
  );
}

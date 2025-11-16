// app/dashboard/organizations/page.tsx
import {
  fetchFilteredUserCustomSectionOne,
  fetchOrganizationsByUserId,
  fetchUserCustomSectionOneCount,
  fetchUserCustomSectionOnePages,
  getUser,
} from "@/app/lib/data";
import { userOrganizations } from "@/app/lib/definitions";
import Breadcrumb from "@/app/ui/Breadcrumb";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import Search from "@/app/ui/search";
import Organizations from "@/app/ui/tables/organizations/organizations-table";
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

// Type guard to filter out null/undefined from arrays
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return notFound();
  }

  const user = await getUser(email);
  if (!user || !user.id) {
    return notFound();
  }

  const organizationsRaw = await fetchOrganizationsByUserId(user.id);
  const organizations = (organizationsRaw ?? []).filter(notNull);

  const totalPages = await fetchUserCustomSectionOnePages(query, user.id);
  const totalCount = await fetchUserCustomSectionOneCount(query, user.id);

  const filteredOrgsRaw = await fetchFilteredUserCustomSectionOne(
    query,
    currentPage,
    user.id,
  );
  const filteredOrganizations: userOrganizations = (
    filteredOrgsRaw ?? []
  ).filter(notNull) as userOrganizations;

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Organizations", url: "/dashboard/organizations/" },
  ];

  return (
    <div className="w-full px-2">
      <div className="flex flex-col">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </nav>
      </div>

      <div className="flex flex-row justify-between mb-5">
        <div className="flex flex-col pr-3 pb-5">
          <div className="flex flex-row gap-x-3 m-auto">
            <div className="flex flex-col">
              <Search placeholder="Search organizations..." />
            </div>
            <div className="flex flex-col">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/organizations/new" className="m-auto">
                  Add New Organization
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Suspense key={query + currentPage}>
        <Organizations
          organizations={organizations}
          user={user}
          totalPages={totalPages}
          query={query}
          currentPage={currentPage}
          totalCount={totalCount}
          filteredOrganizations={filteredOrganizations}
        />
      </Suspense>
    </div>
  );
}

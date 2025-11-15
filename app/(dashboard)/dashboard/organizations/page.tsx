// app/dashboard/organizations/page.tsx
import {
  fetchFilteredUserCustomSectionOne,
  fetchOrganizationsByUserId,
  fetchUserCustomSectionOneCount,
  fetchUserCustomSectionOnePages,
  getUser,
} from "@/app/lib/data";
import { userOrganizations } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
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
  // Match Next's generated signature: searchParams may be a Promise or undefined
  searchParams?: Promise<SearchParams>;
}

// Type guard to filter out null/undefined from arrays
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page({ searchParams }: PageProps) {
  // Unwrap searchParams whether it's a Promise or a plain object
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  // Auth
  const session = await auth();
  const email = session?.user?.email;

  // Use plain email string to fetch user (do not mutate session.user)
  const user = await getUser(email!);

  // Fetch organizations and ensure non-null entries
  const organizationsRaw = await fetchOrganizationsByUserId(user.id);
  const organizations = (organizationsRaw ?? []).filter(notNull);

  const totalPages = await fetchUserCustomSectionOnePages(query, user.id);
  const totalCount = await fetchUserCustomSectionOneCount(query, user.id);

  // Fetch filtered organizations and ensure non-null entries
  const filteredOrgsRaw = await fetchFilteredUserCustomSectionOne(
    query,
    currentPage,
    user.id,
  );
  const filteredOrganizations: userOrganizations = (
    filteredOrgsRaw ?? []
  ).filter(notNull) as userOrganizations;

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
              <Search placeholder="Search organizations..." />
            </div>
            <div className="flex flex-col w-1/2 m-auto">
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

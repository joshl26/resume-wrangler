// app/dashboard/education/page.tsx
import {
  fetchEducationByUserId,
  fetchEducationCount,
  fetchEducationPages,
  getUser,
} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import Search from "@/app/ui/search";
import Education from "@/app/ui/tables/education/education-table";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

type SearchParams = {
  query?: string;
  page?: string;
};

interface PageProps {
  // match Next's generated signature: searchParams may be a Promise or undefined
  searchParams?: Promise<SearchParams>;
}

// Type guard to filter out null/undefined from arrays if needed
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
  if (!user) return notFound();

  // Fetch education records and ensure non-null entries
  const educationRaw = await fetchEducationByUserId(user.id);
  const education = (educationRaw ?? []).filter(notNull);

  if (!education || education.length === 0) {
    return notFound();
  }

  const totalPages = await fetchEducationPages(query, user.id);
  const totalCount = await fetchEducationCount(query, user.id);

  return (
    <div className="h-full w-full overflow-y-auto px-2">
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
              <Search placeholder="Search education..." />
            </div>
            <div className="flex flex-col w-1/2 m-auto">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/education/new" className="m-auto">
                  Add New Education
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Suspense key={query + currentPage}>
        <Education
          user={user}
          totalPages={totalPages}
          query={query}
          currentPage={currentPage}
          totalCount={totalCount}
        />
      </Suspense>
    </div>
  );
}

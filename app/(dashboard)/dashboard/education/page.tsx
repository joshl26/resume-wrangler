// app/dashboard/education/page.tsx
import {
  fetchEducationByUserId,
  fetchEducationCount,
  fetchEducationPages,
  getUser,
} from "@/app/lib/data";
import Breadcrumb from "@/app/ui/Breadcrumb";
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
  const educationRaw = await fetchEducationByUserId(user.id);

  // Filter out any null/undefined entries returned by the fetchers
  const education = (educationRaw ?? []).filter(notNull);

  // Compute pagination values
  const totalPages = await fetchEducationPages(query, user.id);
  const totalCount = await fetchEducationCount(query, user.id);

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Education", url: "/dashboard/education/" },
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
              <Search placeholder="Search education..." />
            </div>
            <div className="flex flex-col">
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
      <div className="pt-10">
        <BackButton href={"/dashboard/"}>Back</BackButton>
      </div>
    </div>
  );
}

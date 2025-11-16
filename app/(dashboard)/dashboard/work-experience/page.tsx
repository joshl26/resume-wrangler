// app/dashboard/work-experience/page.tsx
import {
  fetchFilteredWorkExperiences,
  fetchWorkExperiencePages,
  fetchWorkExperiencesByUserId,
  fetchWorkExperiencesCount,
  getUser,
} from "@/app/lib/data";
import { UserWorkExperiences } from "@/app/lib/definitions";
import BackButton from "@/app/ui/back-button";
import Breadcrumb from "@/app/ui/Breadcrumb";
import { Button } from "@/app/ui/button";
import Search from "@/app/ui/search";
import WorkExperience from "@/app/ui/tables/work-experience/work-experience-table";
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

  // Fetch data in parallel
  const [workExperiencesRaw, filteredWorkExperiencesRaw] = await Promise.all([
    fetchWorkExperiencesByUserId(user.id),
    fetchFilteredWorkExperiences(query, currentPage, user.id),
  ]);

  const workExperiences = (workExperiencesRaw ?? []).filter(notNull);
  const filteredWorkExperiences = (filteredWorkExperiencesRaw ?? []).filter(
    notNull,
  );

  const totalPages = await fetchWorkExperiencePages(query, user.id);
  const totalCount = await fetchWorkExperiencesCount(query, user.id);

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Work Experience", url: "/dashboard/work-experience/" },
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
              <Search placeholder="Search work experience..." />
            </div>
            <div className="flex flex-col">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/work-experience/new" className="m-auto">
                  Add New Work Experience
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Suspense key={query + currentPage}>
        <WorkExperience
          workExperiences={workExperiences}
          user={user}
          totalPages={totalPages}
          query={query}
          currentPage={currentPage}
          totalCount={totalCount}
          filteredWorkExperiences={filteredWorkExperiences}
        />
      </Suspense>

      <div className="pt-10">
        <BackButton href={"/dashboard/"}>Back</BackButton>
      </div>
    </div>
  );
}

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
  // Next may pass searchParams as a Promise or a plain object
  searchParams?: Promise<SearchParams>;
}

// Type guard to filter out null/undefined from arrays
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page({ searchParams }: PageProps) {
  // unwrap searchParams whether Promise or object
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const session = await auth();
  if (!session?.user) return notFound();

  const userEmail = session.user.email!;
  const user = await getUser(userEmail);
  if (!user) return notFound();

  // Fetch all page data in parallel for better performance
  const [workExperiencesRaw, totalPages, totalCount, filteredRaw] = await Promise.all([
    fetchWorkExperiencesByUserId(user.id),
    fetchWorkExperiencePages(query, user.id),
    fetchWorkExperiencesCount(query, user.id),
    fetchFilteredWorkExperiences(query, currentPage, user.id),
  ]);

  // normalize and filter nulls
  const workExperiences: UserWorkExperiences = ((workExperiencesRaw ?? []) as any[]).filter(
    notNull,
  ) as unknown as UserWorkExperiences;

  const filteredWorkExperiences: UserWorkExperiences = ((filteredRaw ?? []) as any[]).filter(
    notNull,
  ) as unknown as UserWorkExperiences;

  return (
    <div className="h-full w-full px-2">
      <BackButton className="" href={"/dashboard/"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold py-1">Work Experience</h1>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex flex-row gap-x-3 h-auto ">
            <div className="flex flex-col w-1/2 m-auto  ">
              <Search placeholder="Search work experience..." />
            </div>
            <div className="flex flex-col w-1/2 m-auto">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/work-experience/new" className="m-auto">
                  Add New Work Experience
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="py-8 text-center">Loading work experiences…</div>} key={query + currentPage}>
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
    </div>
  );
}
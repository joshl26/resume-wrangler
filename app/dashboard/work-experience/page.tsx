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

  // keep only necessary fields
  session.user = { name: session.user.name, email: session.user.email };

  const user = await getUser(session.user.email!);
  if (!user) return notFound();

  // fetch work experiences and filter nulls
  const workExperiencesRaw = await fetchWorkExperiencesByUserId(user.id);
  const workExperiences = (workExperiencesRaw ?? []).filter(notNull);

  if (!workExperiences) return notFound();

  const totalPages = await fetchWorkExperiencePages(query, user.id);
  const totalCount = await fetchWorkExperiencesCount(query, user.id);

  const filteredRaw = await fetchFilteredWorkExperiences(
    query,
    currentPage,
    user.id,
  );
  const filteredWorkExperiences: UserWorkExperiences = (
    filteredRaw ?? []
  ).filter(notNull) as unknown as UserWorkExperiences;

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
    </div>
  );
}

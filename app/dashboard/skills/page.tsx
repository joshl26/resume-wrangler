// app/dashboard/skills/page.tsx
import {
  fetchSkillsByUserId,
  fetchSkillsCount,
  fetchSkillsPages,
  getUser,
} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import Search from "@/app/ui/search";
import Skills from "@/app/ui/tables/skills/skills-table";
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
  if (!session?.user) return notFound();

  session.user = {
    name: session.user.name,
    email: session.user.email,
  };

  const user = await getUser(session.user.email!);
  if (!user) return notFound();

  // Fetch skills and ensure non-null entries
  const skillsRaw = await fetchSkillsByUserId(user.id);
  const skills = (skillsRaw ?? []).filter(notNull);

  if (!skills) return notFound();

  const totalPages = await fetchSkillsPages(query, user.id);
  const totalCount = await fetchSkillsCount(query, user.id);

  return (
    <div className="h-full w-full px-2 overflow-y-auto ">
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
              <Search placeholder="Search skills..." />
            </div>
            <div className="flex flex-col w-1/2 m-auto">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/skills/new" className="m-auto">
                  Add New Skill
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Suspense key={query + currentPage}>
        <Skills
          user={user}
          skills={skills}
          totalPages={totalPages}
          query={query}
          currentPage={currentPage}
          totalCount={totalCount}
        />
      </Suspense>
    </div>
  );
}

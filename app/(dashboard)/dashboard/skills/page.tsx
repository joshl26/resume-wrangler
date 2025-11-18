// app/dashboard/skills/page.tsx

import {
  fetchSkillsByUserId,
  fetchSkillsCount,
  fetchSkillsPages,
  getUser,
} from "@/app/lib/data";
import Breadcrumb from "@/app/ui/Breadcrumb";
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
  searchParams?: Promise<SearchParams>;
}

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

  const skillsRaw = await fetchSkillsByUserId(user.id);
  const skills = (skillsRaw ?? []).filter(notNull);

  const totalPages = await fetchSkillsPages(query, user.id);
  const totalCount = await fetchSkillsCount(query, user.id);

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Skills", url: "/dashboard/skills/" },
  ];

  return (
    <div className="w-full px-2">
      <div className="flex flex-col">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </nav>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col pr-3 pb-5">
          <div className="flex flex-row gap-x-3 m-auto">
            <div className="flex flex-col">
              <Search placeholder="Search skills..." />
            </div>
            <div className="flex flex-col">
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

      <div className="pt-10">
        <BackButton href="/dashboard/">Back to Dashboard</BackButton>
      </div>
    </div>
  );
}

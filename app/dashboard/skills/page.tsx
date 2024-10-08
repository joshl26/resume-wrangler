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

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  const user = await getUser(session?.user?.email!);
  const skills = await fetchSkillsByUserId(user?.id);

  if (!user ?? !skills) {
    notFound();
  }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchSkillsPages(query, user?.id);
  const totalCount = await fetchSkillsCount(query, user?.id);

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

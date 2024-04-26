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
  const workExperiences = await fetchWorkExperiencesByUserId(user?.id);

  if (!user ?? !workExperiences) {
    notFound();
  }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchWorkExperiencePages(query, user?.id);
  const totalCount = await fetchWorkExperiencesCount(query, user?.id);

  const filteredWorkExperiences: UserWorkExperiences =
    await fetchFilteredWorkExperiences(query, currentPage, user?.id);

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

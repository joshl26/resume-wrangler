import {
  fetchApplicationsByUserId,
  fetchApplicationsPages,
  fetchCoverLettersByUserId,
  fetchLatestCompaniesByUserId,
  fetchResumesByUserId,
  getUser,
} from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import ApplicationsTable from "@/app/ui/tables/applications/applications-table";
import { auth } from "@/auth";
import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import BackButton from "@/app/ui/back-button";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/pagination";
import { Applications } from "@/app/lib/definitions";

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

  const [user] = await Promise.all([getUser(session?.user?.email)]);

  const [applications, companies, resumes, coverLetters] = await Promise.all([
    fetchApplicationsByUserId(user?.id),
    fetchLatestCompaniesByUserId(user?.id),
    fetchResumesByUserId(user?.id),
    fetchCoverLettersByUserId(user?.id),
  ]);

  if (!applications ?? !companies ?? !resumes ?? !coverLetters) {
    notFound();
  }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchApplicationsPages(query, user?.id);

  return (
    <div className="h-full w-full overflow-y-auto px-2">
      <BackButton className={""} href={"/dashboard/"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold py-1 pb-2">Applications</h1>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex flex-row gap-x-3 h-auto ">
            <div className="flex flex-col w-1/2 m-auto  ">
              <Search placeholder="Search applications..." />
            </div>
            <div className="flex flex-col w-1/2 m-auto">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/applications/new" className="m-auto">
                  Add New Application
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Suspense key={query + currentPage}>
        <ApplicationsTable
          user={user}
          resumes={resumes}
          coverLetters={coverLetters}
          applications={applications}
          companies={companies}
          totalPages={totalPages}
          query={query}
          currentPage={currentPage}
        />
      </Suspense>

      {/* <div className="pt-4">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}

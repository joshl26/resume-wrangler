import {
  fetchApplicationsByUserId,
  fetchApplicationsCount,
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
import Link from "next/link";

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
  const totalCount = await fetchApplicationsCount(query, user?.id);

  return (
    <div className="w-full h-auto px-2 mb-2">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col">
          <BackButton className={""} href={"/dashboard/"}>
            Back
          </BackButton>
        </div>
        <div className="flex flex-col pr-3">
          <Button className="btn btn-amber tight-shadow hover:animate-pulse">
            <a href="/dashboard/applications/new" className="m-auto">
              Add New Application
            </a>
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col m-auto">
              <h1 className="text-[2rem] font-bold py-1 pb-2">Applications</h1>
            </div>
            <div className="flex flex-col m-auto px-1"> | </div>
            <div className="flex flex-col m-auto text-[.9rem] hover:underline">
              <Link href={"/dashboard/companies"}>Companies</Link>
            </div>
            <div className="flex flex-col m-auto px-1"> | </div>
            <div className="flex flex-col m-auto text-[.9rem] hover:underline">
              <Link href={"/dashboard/certifications"}>Certifications</Link>
            </div>
            <div className="flex flex-col m-auto px-1"> | </div>
            <div className="flex flex-col m-auto text-[.9rem] hover:underline">
              <Link href={"/dashboard/education"}>Education</Link>
            </div>
            <div className="flex flex-col m-auto px-1"> | </div>
            <div className="flex flex-col m-auto text-[.9rem] hover:underline">
              <Link href={"/dashboard/organizations"}>Organizations</Link>
            </div>
            <div className="flex flex-col m-auto px-1"> | </div>
            <div className="flex flex-col m-auto text-[.9rem] hover:underline">
              <Link href={"/dashboard/skills"}>Skills</Link>
            </div>
            <div className="flex flex-col m-auto px-1"> | </div>
            <div className="flex flex-col m-auto text-[.9rem] hover:underline">
              <Link href={"/dashboard/work-experience"}>Work Experience</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col pr-3">
          <div className="flex flex-row gap-x-3 m-auto ">
            <div className="flex flex-col ">
              <Search placeholder="Search applications..." />
            </div>
            <div className="flex flex-col w-1/2">
              <Pagination totalPages={totalPages} totalCount={totalCount} />
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
          totalCount={totalCount}
        />
      </Suspense>
    </div>
  );
}

import {
  fetchApplicationsByUserId,
  fetchCoverLettersByUserId,
  fetchLatestCompaniesByUserId,
  fetchResumesByUserId,
  getUser,
} from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import ApplicationsTable from "@/app/ui/tables/applications/applications-table";
import { auth } from "@/auth";
import React from "react";
import { notFound } from "next/navigation";
import BackButton from "@/app/ui/back-button";

export default async function Page() {
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

  return (
    <div className="h-full w-full overflow-y-auto px-2">
      <BackButton href={"/dashboard/"}>Back</BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold py-1">Applications</h1>
        </div>
        <div className="flex flex-col px-4">
          <Button className="w-[200px] text-center btn btn-amber tight-shadow">
            <a href="/dashboard/applications/new" className="m-auto">
              Add new application
            </a>
          </Button>
        </div>
      </div>
      <ApplicationsTable
        user={user}
        resumes={resumes}
        coverLetters={coverLetters}
        applications={applications}
        companies={companies}
      />
    </div>
  );
}

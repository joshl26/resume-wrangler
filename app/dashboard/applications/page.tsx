import {
  fetchApplicationsByUserId,
  fetchCoverLettersByUserId,
  fetchLatestCompaniesByUserId,
  fetchResumesByUserId,
  getUser,
} from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import Applications from "@/app/ui/tables/applications/applications-table";
import { auth } from "@/auth";
import React from "react";

export default async function Page() {
  const session = await auth();
  // console.log(session);
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      // image: session.user.image,
    };
  }

  const user = await getUser(session?.user?.email!);

  const applications = await fetchApplicationsByUserId(user?.id!);
  const companies = await fetchLatestCompaniesByUserId(user?.id!);
  const resumes = await fetchResumesByUserId(user?.id!);
  const coverLetters = await fetchCoverLettersByUserId(user?.id!);

  // console.log(applications);
  return (
    <div className="h-full w-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold">Applications</h1>
        </div>
        <div className="flex flex-col px-4">
          <Button className="w-[200px] text-center">
            <a href="/dashboard/applications/new" className="m-auto">
              Add new application
            </a>
          </Button>
        </div>
      </div>

      <Applications
        user={user}
        resumes={resumes}
        coverLetters={coverLetters}
        applications={applications}
        companies={companies}
      />
    </div>
  );
}

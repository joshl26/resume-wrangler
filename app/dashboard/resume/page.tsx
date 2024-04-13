import React from "react";
import {
  fetchApplicationsByUserId,
  fetchCoverLettersByUserIDJoinApplications,
  fetchLatestCompaniesByUserId,
  getUser,
} from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import { notFound } from "next/navigation";
import CoverLetters from "@/app/ui/tables/cover-letters/covers-table";
import { auth } from "@/auth";
import BackButton from "@/app/ui/back-button";
import Resumes from "@/app/ui/tables/resumes/resumes-table";

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  const user = await getUser(session?.user?.email!);
  const coverLetters = await fetchCoverLettersByUserIDJoinApplications(
    user?.id
  );
  const applications = await fetchApplicationsByUserId(user?.id);
  const companies = await fetchLatestCompaniesByUserId(user?.id);

  if (!coverLetters ?? !user ?? !applications ?? !companies) {
    notFound();
  }

  return (
    <div className="w-full h-full px-2">
      <BackButton classname="" href={"/dashboard/"}>
        Back
      </BackButton>
      <div className="flex flex-col ">
        <h1 className="text-[2rem] font-bold py-1">Resumes</h1>
      </div>
      <Resumes
        user={user}
        coverLetters={coverLetters}
        applications={applications}
        companies={companies}
      />
      {/* <CoverLetters
        user={user}
        coverLetters={coverLetters}
        applications={applications}
        companies={companies}
      /> */}
    </div>
  );
}

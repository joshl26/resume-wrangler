import React from "react";
import {
  fetchApplicationsByUserId,
  fetchLatestCompaniesByUserId,
  fetchResumesByUserIDJoinApplications,
  getUser,
} from "@/app/lib/data";
import { notFound } from "next/navigation";
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
  const resumes = await fetchResumesByUserIDJoinApplications(user?.id);
  const applications = await fetchApplicationsByUserId(user?.id);
  const companies = await fetchLatestCompaniesByUserId(user?.id);

  if (!resumes ?? !user ?? !applications ?? !companies) {
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
        resumes={resumes}
        applications={applications}
        companies={companies}
      />
    </div>
  );
}

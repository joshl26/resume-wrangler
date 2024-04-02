import { fetchWorkExperiencesByUserId, getUser } from "@/app/lib/data";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import WorkExperience from "@/app/ui/tables/work-experience/work-experience-table";
import { auth } from "@/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page() {
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

  return (
    <div className="h-full w-full px-2">
      <BackButton href={"/dashboard/"}>Back</BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold ">Work Experience</h1>
        </div>
        <div className="flex flex-col px-2">
          <Button className="btn btn-amber tight-shadow">
            <a href="/dashboard/work-experience/new">Add work experience</a>
          </Button>
        </div>
      </div>
      <WorkExperience workExperiences={workExperiences} />
    </div>
  );
}

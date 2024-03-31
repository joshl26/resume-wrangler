import { fetchWorkExperiencesByUserId, getUser } from "@/app/lib/data";
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
    <div className="h-full w-full">
      <Link className="px-3 underline" href={"/dashboard/"}>
        Back
      </Link>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold px-3">Work Experience</h1>
        </div>
        <div className="flex flex-col px-4">
          <Button className="w-[200px] text-center">
            <a href="/dashboard/work-experience/new" className="m-auto">
              Add work experience
            </a>
          </Button>
        </div>
      </div>
      <WorkExperience workExperiences={workExperiences} />
    </div>
  );
}

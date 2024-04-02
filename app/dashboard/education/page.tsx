import { fetchEducationByUserId, getUser } from "@/app/lib/data";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import Education from "@/app/ui/tables/education/education-table";
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
  const education = await fetchEducationByUserId(user.id);

  if (!user ?? !education) {
    notFound();
  }

  return (
    <div className="h-full w-full overflow-y-auto px-2">
      <BackButton href={"/dashboard/"}>Back</BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold py-1">Education</h1>
        </div>
        <div className="flex flex-col px-4">
          <Button className="btn btn-amber tight-shadow hover:animate-pulse">
            <a href="/dashboard/education/new" className="m-auto">
              Add New Education Experience
            </a>
          </Button>
        </div>
      </div>
      <Education education={education} />
    </div>
  );
}

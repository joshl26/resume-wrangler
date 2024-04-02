import { fetchSkillsByUserId, getUser } from "@/app/lib/data";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import Skills from "@/app/ui/tables/skills/skills-table";
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
  const skills = await fetchSkillsByUserId(user?.id);

  if (!user ?? !skills) {
    notFound();
  }

  return (
    <div className="h-full w-full px-2">
      <BackButton href={"/dashboard/"}>Back</BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold ">Skills</h1>
        </div>
        <div className="flex flex-col px-4">
          <Button className="w-[200px] text-center btn btn-amber">
            <a href="/dashboard/skills/new" className="m-auto">
              Add new Skill
            </a>
          </Button>
        </div>
      </div>
      <Skills skills={skills} />
    </div>
  );
}

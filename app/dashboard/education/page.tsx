import {
  fetchEducationByUserId,
  fetchOrganizationsByUserId,
  getUser,
} from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import Education from "@/app/ui/tables/education/education-table";
import { auth } from "@/auth";
import Link from "next/link";
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

  // const applications = await fetchApplicationsByUserId(user?.id!);
  const education = await fetchEducationByUserId(user.id);
  // console.log(applications);
  return (
    <div className="h-full w-full">
      <Link className="underline px-4" href={"/dashboard/"}>
        Back
      </Link>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold px-3">Education</h1>
        </div>
        <div className="flex flex-col px-4">
          <Button className="w-[200px] text-center">
            <a href="/dashboard/education/new" className="m-auto">
              Add new program
            </a>
          </Button>
        </div>
      </div>
      <Education education={education} />
    </div>
  );
}

import {
  fetchEducationByUserId,
  fetchEducationPages,
  getUser,
} from "@/app/lib/data";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import Search from "@/app/ui/search";
import Education from "@/app/ui/tables/education/education-table";
import { auth } from "@/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

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

  const user = await getUser(session?.user?.email!);
  const education = await fetchEducationByUserId(user.id);

  if (!user ?? !education) {
    notFound();
  }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchEducationPages(query, user?.id);

  console.log(totalPages);

  return (
    <div className="h-full w-full overflow-y-auto px-2">
      <BackButton className="" href={"/dashboard/"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold py-1 pb-2">Education</h1>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex flex-row gap-x-3 h-auto ">
            <div className="flex flex-col w-1/2 m-auto  ">
              <Search placeholder="Search education..." />
            </div>
            <div className="flex flex-col w-1/2 m-auto">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/education/new" className="m-auto">
                  Add New Education
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Education
        user={user}
        education={education}
        totalPages={totalPages}
        currentPage={currentPage}
        query={query}
      />
    </div>
  );
}

import { fetchLatestCompaniesByUserId, getUser } from "@/app/lib/data";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import Companies from "@/app/ui/tables/companies/companies-table";
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
  const companies = await fetchLatestCompaniesByUserId(user.id);

  if (!user ?? !companies) {
    notFound();
  }

  return (
    <div className="h-full w-full px-2">
      <BackButton href={"/dashboard/"}>Back</BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold py-1">Companies</h1>
        </div>
        <div className="flex flex-col px-4">
          <Button className="btn btn-amber tight-shadow hover:animate-pulse">
            <a href="/dashboard/companies/new" className="m-auto">
              Add New Company
            </a>
          </Button>
        </div>
      </div>
      <Companies companies={companies} />
    </div>
  );
}

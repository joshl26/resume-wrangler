import { fetchOrganizationsByUserId, getUser } from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import Organizations from "@/app/ui/tables/organizations/organizations-table";
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
  const organizations = await fetchOrganizationsByUserId(user?.id);

  if (!user ?? !organizations) {
    notFound();
  }

  return (
    <div className="h-full w-full">
      <Link className="underline px-4" href={"/dashboard/"}>
        Back
      </Link>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold px-3">Organizations</h1>
        </div>
        <div className="flex flex-col px-4">
          <Button className="w-[200px] text-center">
            <a href="/dashboard/organizations/new" className="m-auto">
              Add new organization
            </a>
          </Button>
        </div>
      </div>
      <Organizations organizations={organizations} />
    </div>
  );
}

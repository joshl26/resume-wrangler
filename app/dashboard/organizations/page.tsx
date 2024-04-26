import {
  fetchFilteredUserCustomSectionOne,
  fetchOrganizationsByUserId,
  fetchUserCustomSectionOneCount,
  fetchUserCustomSectionOnePages,
  getUser,
} from "@/app/lib/data";
import { userOrganizations } from "@/app/lib/definitions";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import Search from "@/app/ui/search";
import Organizations from "@/app/ui/tables/organizations/organizations-table";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

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
  const organizations = await fetchOrganizationsByUserId(user?.id);

  if (!user ?? !organizations) {
    notFound();
  }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchUserCustomSectionOnePages(query, user?.id);
  const totalCount = await fetchUserCustomSectionOneCount(query, user?.id);
  const filteredOrganizations: userOrganizations =
    await fetchFilteredUserCustomSectionOne(query, currentPage, user?.id);

  return (
    <div className="h-full w-full px-2">
      <BackButton className="" href={"/dashboard/"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold py-1">Organizations</h1>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex flex-row gap-x-3 h-auto ">
            <div className="flex flex-col w-1/2 m-auto  ">
              <Search placeholder="Search organizations..." />
            </div>
            <div className="flex flex-col w-1/2 m-auto">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/organizations/new" className="m-auto">
                  Add New Organization
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Suspense key={query + currentPage}>
        <Organizations
          organizations={organizations}
          user={user}
          totalPages={totalPages}
          query={query}
          currentPage={currentPage}
          totalCount={totalCount}
          filteredOrganizations={filteredOrganizations}
        />
      </Suspense>
    </div>
  );
}

import {
  fetchCompaniesCount,
  fetchCompaniesPages,
  fetchFilteredCompanies,
  fetchLatestCompaniesByUserId,
  getUser,
} from "@/app/lib/data";
import { Companies } from "@/app/lib/definitions";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import Search from "@/app/ui/search";
import CompaniesTable from "@/app/ui/tables/companies/companies-table";
import { auth } from "@/auth";
import Link from "next/link";
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
  const companies = await fetchLatestCompaniesByUserId(user.id);

  if (!user ?? !companies) {
    notFound();
  }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCompaniesPages(query, user?.id);
  const totalCount = await fetchCompaniesCount(query, user?.id);

  const filteredCompanies: Companies = await fetchFilteredCompanies(
    query,
    currentPage,
    user?.id
  );

  return (
    <div className="h-full w-full px-2">
      <BackButton className="" href={"/dashboard/"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold py-1">Companies</h1>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex flex-row gap-x-3 h-auto ">
            <div className="flex flex-col w-1/2 m-auto  ">
              <Search placeholder="Search applications..." />
            </div>
            <div className="flex flex-col w-1/2 m-auto">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/companies/new" className="m-auto">
                  Add New Company
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Suspense key={query + currentPage}>
        <CompaniesTable
          companies={companies}
          user={user}
          totalPages={totalPages}
          query={query}
          currentPage={currentPage}
          totalCount={totalCount}
          filteredCompanies={filteredCompanies}
        />
      </Suspense>
    </div>
  );
}

import React, { Suspense } from "react";
import {
  fetchCertificationsByUserId,
  fetchFilteredUserCustomSectionTwo,
  fetchUserCustomSectionTwoCount,
  fetchUserCustomSectionTwoPages,
  getUser,
} from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import Certifications from "@/app/ui/tables/certifications/certifications-table";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import BackButton from "@/app/ui/back-button";
import { UserCertifications } from "@/app/lib/definitions";
import Search from "@/app/ui/search";

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
  const certifications = await fetchCertificationsByUserId(user?.id);

  if (!user ?? !certifications) {
    notFound();
  }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchUserCustomSectionTwoPages(query, user?.id);
  const totalCount = await fetchUserCustomSectionTwoCount(query, user?.id);
  const filteredCertifications: UserCertifications =
    await fetchFilteredUserCustomSectionTwo(query, currentPage, user?.id);

  return (
    <div className="h-full w-full px-2">
      <BackButton className="" href={"/dashboard/"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold py-1">Certifications</h1>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex flex-row gap-x-3 h-auto ">
            <div className="flex flex-col w-1/2 m-auto  ">
              <Search placeholder="Search certifications..." />
            </div>
            <div className="flex flex-col w-1/2 m-auto">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/certifications/new" className="m-auto">
                  Add New Certification
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Suspense key={query + currentPage}>
        <Certifications
          certifications={certifications}
          user={user}
          totalPages={totalPages}
          query={query}
          currentPage={currentPage}
          totalCount={totalCount}
          filteredCertifications={filteredCertifications}
        />
      </Suspense>
    </div>
  );
}

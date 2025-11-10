// app/dashboard/certifications/page.tsx
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
import { UserCertifications, UserCertification } from "@/app/lib/definitions";
import Search from "@/app/ui/search";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

type SearchParams = {
  query?: string;
  page?: string;
};

interface PageProps {
  searchParams?: Promise<SearchParams>;
}

// runtime type guard for single certification (adjust as needed)
function isUserCertification(v: any): v is UserCertification {
  return v && typeof v === "object" && typeof v.id === "string";
}

// tiny type guard to filter null/undefined values
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const session = await auth();
  if (!session?.user) {
    return notFound();
  }

  session.user = { name: session.user.name, email: session.user.email };
  const user = await getUser(session.user.email!);
  if (!user) return notFound();

  // fetch raw data
  const certificationsRaw = await fetchCertificationsByUserId(user.id);

  // assert/normalize certifications into the correct type
  const certifications: UserCertifications = Array.isArray(certificationsRaw)
    ? (certificationsRaw.filter(notNull).filter(isUserCertification) as UserCertifications)
    : ([] as UserCertifications);

  if (!certifications || certifications.length === 0) {
    return notFound();
  }

  const totalPages = await fetchUserCustomSectionTwoPages(query, user.id);
  const totalCount = await fetchUserCustomSectionTwoCount(query, user.id);

  // normalized fetch + explicit cast + runtime sanity check
  const filteredRaw = await fetchFilteredUserCustomSectionTwo(
    query,
    currentPage,
    user.id,
  );

  const filteredCertifications: UserCertifications = Array.isArray(filteredRaw)
    ? (filteredRaw.filter(notNull).filter(isUserCertification) as UserCertifications)
    : ([] as UserCertifications);

  return (
    <div className="h-full w-full px-2">
      <BackButton className="" href={"/dashboard/"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <Breadcrumbs />
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
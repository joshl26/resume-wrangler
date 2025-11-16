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
import Breadcrumb from "@/app/ui/Breadcrumb";

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

  const email = session?.user.email;
  if (!email) {
    return notFound();
  }

  const user = await getUser(email);
  if (!user || !user.id) {
    return notFound();
  }

  const certificationsRaw = await fetchCertificationsByUserId(user.id);

  const certifications: UserCertifications = Array.isArray(certificationsRaw)
    ? (certificationsRaw
        .filter(notNull)
        .filter(isUserCertification) as UserCertifications)
    : ([] as UserCertifications);

  const totalPages = await fetchUserCustomSectionTwoPages(query, user.id);
  const totalCount = await fetchUserCustomSectionTwoCount(query, user.id);

  const filteredRaw = await fetchFilteredUserCustomSectionTwo(
    query,
    currentPage,
    user.id,
  );

  const filteredCertifications: UserCertifications = Array.isArray(filteredRaw)
    ? (filteredRaw
        .filter(notNull)
        .filter(isUserCertification) as UserCertifications)
    : ([] as UserCertifications);

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Certifications", url: "/dashboard/certifications/" },
  ];

  return (
    <div className="w-full px-2">
      <div className="flex flex-col">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </nav>
      </div>

      <div className="flex flex-row justify-between mb-5">
        <div className="flex flex-col pr-3 pb-5">
          <div className="flex flex-row gap-x-3 m-auto">
            <div className="flex flex-col">
              <Search placeholder="Search certifications..." />
            </div>
            <div className="flex flex-col">
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

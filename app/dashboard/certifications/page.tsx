// app/.../page.tsx
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
import Breadcrumbs from "@/app/ui/Breadcrumbs";

type SearchParams = {
  query?: string;
  page?: string;
};

interface PageProps {
  // match Next's generated signature: searchParams may be a Promise or undefined
  searchParams?: Promise<SearchParams>;
}

// tiny type guard to filter null/undefined values
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page({ searchParams }: PageProps) {
  // unwrap searchParams whether it's a Promise or a plain object
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const session = await auth();
  if (!session?.user) {
    return notFound();
  }

  // keep only required fields and fetch user
  session.user = { name: session.user.name, email: session.user.email };
  const user = await getUser(session.user.email!);
  if (!user) return notFound();

  // fetch raw data
  const certificationsRaw = await fetchCertificationsByUserId(user.id);

  // filter out any null/undefined elements (type-safe)
  const certifications = (certificationsRaw ?? []).filter(notNull);

  // guard for missing data
  if (!certifications || certifications.length === 0) {
    return notFound();
  }

  // paging/count/filter data
  const totalPages = await fetchUserCustomSectionTwoPages(query, user.id);
  const totalCount = await fetchUserCustomSectionTwoCount(query, user.id);
  const filteredCertifications: UserCertifications =
    await fetchFilteredUserCustomSectionTwo(query, currentPage, user.id);

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

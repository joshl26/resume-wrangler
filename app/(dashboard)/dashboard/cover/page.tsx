// app/dashboard/cover/page.tsx
import React, { JSX } from "react";
import {
  fetchApplicationsByUserId,
  fetchCoverLettersByUserIDJoinApplications,
  fetchLatestCompaniesByUserId,
  getUser,
} from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import { notFound } from "next/navigation";
import CoverLetters from "@/app/ui/tables/cover-letters/covers-table";
import { auth } from "@/auth";
import BackButton from "@/app/ui/back-button";
import type {
  CoverLetter,
  Application,
  Company,
  User,
} from "@/app/lib/definitions";

/** Type guard to filter out null/undefined entries from arrays */
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();

  // Ensure we have an authenticated user with an email string
  const email = session?.user?.email;
  if (!email) {
    return notFound();
  }

  // Do NOT mutate session.user (it may require additional fields like `id`)
  // Use the plain `email` string to fetch the user.
  const user = await getUser(email);
  if (!user || !user.id) {
    return notFound();
  }

  // Fetch resources in parallel
  const [coverLettersRaw, applicationsRaw, companiesRaw] = await Promise.all([
    fetchCoverLettersByUserIDJoinApplications(user.id),
    fetchApplicationsByUserId(user.id),
    fetchLatestCompaniesByUserId(user.id),
  ]);

  // If any fetcher returned null/undefined, treat as not found
  if (
    coverLettersRaw == null ||
    applicationsRaw == null ||
    companiesRaw == null
  ) {
    return notFound();
  }

  // Normalize results:
  // Convert each raw value into a plain array of unknown, then filter with the notNull guard.
  // This avoids TypeScript confusion over unioned array types / differing filter overloads.
  const coverLettersArr = Array.from(coverLettersRaw as Iterable<unknown>);
  const applicationsArr = Array.from(applicationsRaw as Iterable<unknown>);
  const companiesArr = Array.from(companiesRaw as Iterable<unknown>);

  const coverLetters = coverLettersArr.filter(notNull) as CoverLetter[];
  const applications = applicationsArr.filter(notNull) as Application[];
  const companies = companiesArr.filter(notNull) as Company[];

  // Optionally treat empty lists as valid states (remove checks if you prefer)
  // if (!coverLetters.length || !applications.length || !companies.length) return notFound();

  return (
    <div className="w-full h-full px-2">
      <BackButton className="" href={"/dashboard/"}>
        Back
      </BackButton>
      <div className="flex flex-col ">
        <h1 className="text-[2rem] font-bold py-1">Cover Letters</h1>
      </div>
      <CoverLetters
        user={user as User}
        coverLetters={coverLetters}
        applications={applications}
        companies={companies}
      />
    </div>
  );
}

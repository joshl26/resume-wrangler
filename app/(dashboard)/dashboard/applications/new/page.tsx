// definition: Add a new job application entry for the authenticated user.
// file: app/(dashboard)/dashboard/applications/new/page.tsx

import React, { JSX } from "react";
import { fetchLatestCompaniesByUserId, getUser } from "@/app/lib/data";
import { User, Company } from "@/app/lib/definitions";
import NewApplication from "@/app/ui/forms/new-application";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import BackButton from "@/app/ui/back-button";
import Breadcrumb from "@/app/ui/Breadcrumb";

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return (
      <main className="w-full max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Add Job Application
        </h1>
        <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md text-center">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            You must be signed in to add job application details.
          </p>
          <a
            href="/signin"
            className="inline-block rounded bg-azure-radiance-600 px-4 py-2 text-white hover:bg-azure-radiance-700 dark:bg-azure-radiance-500 dark:hover:bg-azure-radiance-600 transition-colors"
          >
            Sign in
          </a>
        </div>
      </main>
    );
  }

  const user: User | null = await getUser(email);
  if (!user || !user.id) {
    return notFound();
  }

  const companiesRaw: Company[] | null = await fetchLatestCompaniesByUserId(
    user.id,
  );
  const companies: Company[] = companiesRaw ?? [];

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard/" },
    { name: "Job Applications", url: "/dashboard/applications/" },
    { name: "Create New Job Application", url: "/dashboard/applications/new/" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 py-4">
        <Breadcrumb items={breadcrumbItems} />
      </nav>
      <div className="rounded-lg my-8 mx-4 sm:mx-6 p-6 shadow-lg bg-white dark:bg-gray-800 transition-colors">
        <NewApplication user={user} companies={companies} />
      </div>
      <div className="px-4 sm:px-6">
        <BackButton href="/dashboard/applications/" className="mt-4">
          Back to Job Applications
        </BackButton>
      </div>
    </div>
  );
}

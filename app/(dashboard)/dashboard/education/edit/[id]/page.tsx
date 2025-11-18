// Description: Page component for editing an education entry in the dashboard.
// file: app/(dashboard)/dashboard/education/[id]/edit/page.tsx

import { getUser, fetchEducationById } from "@/app/lib/data";
import EditEducation from "@/app/ui/forms/edit-education";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React, { JSX } from "react";
import BackButton from "@/app/ui/back-button";
import Breadcrumb from "@/app/ui/Breadcrumb";

type Params = { id: string };

interface PageProps {
  params?: Promise<Params>;
}

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return (
      <main className="w-full max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Edit Education
        </h1>
        <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md text-center">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            You must be signed in to edit education details.
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

  const user = await getUser(email);
  if (!user) {
    return notFound();
  }

  const resolvedParams = await params;
  if (!resolvedParams) {
    return notFound();
  }

  const { id } = resolvedParams;

  const education = await fetchEducationById(id);

  if (!education) {
    return notFound();
  }

  // Verify the education entry belongs to the authenticated user
  if (education.user_id !== user.id) {
    return notFound();
  }

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard/" },
    { name: "Education", url: "/dashboard/education/" },
    { name: "Edit Education", url: `/dashboard/education/${id}/edit/` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 py-4">
        <Breadcrumb items={breadcrumbItems} />
      </nav>
      <div className="rounded-lg my-8 mx-4 sm:mx-6 p-6 shadow-lg bg-white dark:bg-gray-800 transition-colors">
        <EditEducation education={education} />
      </div>
      <div className="px-4 sm:px-6">
        <BackButton href="/dashboard/education/" className="mt-4">
          Back to Education
        </BackButton>
      </div>
    </div>
  );
}

// Description: Page component for editing a work experience entry in the dashboard.
// file: app/(dashboard)/dashboard/work-experience/[id]/edit/page.tsx

import { getUser, fetchWorkExperienceById } from "@/app/lib/data";
import EditWorkExperience from "@/app/ui/forms/edit-work-experience";
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
          Edit Work Experience
        </h1>
        <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md text-center">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            You must be signed in to edit work experience details.
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

  const workExperience = await fetchWorkExperienceById(id);

  if (!workExperience) {
    return notFound();
  }

  // Verify the work experience entry belongs to the authenticated user
  if (workExperience.user_id !== user.id) {
    return notFound();
  }

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard/" },
    { name: "Work Experience", url: "/dashboard/work-experience/" },
    {
      name: "Edit Work Experience",
      url: `/dashboard/work-experience/${id}/edit/`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 py-4">
        <Breadcrumb items={breadcrumbItems} />
      </nav>
      <div className="rounded-lg my-8 mx-4 sm:mx-6 p-6 shadow-lg bg-white dark:bg-gray-800 transition-colors">
        <EditWorkExperience workExperience={workExperience} />
      </div>
      <div className="px-4 sm:px-6">
        <BackButton href="/dashboard/work-experience/" className="mt-4">
          Back to Work Experience
        </BackButton>
      </div>
    </div>
  );
}

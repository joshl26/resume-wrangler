// app/dashboard/cover-experience/page.tsx
import { fetchCoverExperiencesByUserId, getUser } from "@/app/lib/data";
import BackButton from "@/app/ui/back-button";
import Breadcrumb from "@/app/ui/Breadcrumb";
import { Button } from "@/app/ui/button";
import CoverExperience from "@/app/ui/cover-experience/cover-experience-table";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React from "react";

function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return notFound();
  }

  const user = await getUser(email);
  if (!user || !user.id) {
    return notFound();
  }

  const coverExperiencesRaw = await fetchCoverExperiencesByUserId(user.id);
  const coverExperiences = (coverExperiencesRaw ?? []).filter(notNull);

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Cover Letter Experience", url: "/dashboard/cover-experience/" },
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
            {/* You can add a Search component here if needed */}
            <div className="flex flex-col">{/* Placeholder for Search */}</div>
            <div className="flex flex-col">
              <Button className="btn btn-amber tight-shadow hover:animate-pulse">
                <a href="/dashboard/cover-experience/new" className="m-auto">
                  Add Cover Experience
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto h-full">
        <CoverExperience user={user} coverExperiences={coverExperiences} />
      </div>

      <div className="pt-10">
        <BackButton href={"/dashboard/"}>Back to Dashboard</BackButton>
      </div>
    </div>
  );
}

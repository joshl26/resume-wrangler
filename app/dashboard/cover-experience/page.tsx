// app/dashboard/cover-experience/page.tsx
import { fetchCoverExperiencesByUserId, getUser } from "@/app/lib/data";
import BackButton from "@/app/ui/back-button";
import { Button } from "@/app/ui/button";
import CoverExperience from "@/app/ui/cover-experience/cover-experience-table";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React from "react";

// Type guard to filter out null/undefined from arrays
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page() {
  const session = await auth();

  // Require authenticated user with email
  const email = session?.user?.email;
  if (!email) {
    return notFound();
  }

  // Keep only necessary user fields
  session.user = {
    name: session.user?.name,
    email,
  };

  // Safe to call getUser with a string
  const user = await getUser(email);
  if (!user || !user.id) {
    return notFound();
  }

  // Fetch cover experiences and filter out nulls
  const coverExperiencesRaw = await fetchCoverExperiencesByUserId(user.id);
  const coverExperiences = (coverExperiencesRaw ?? []).filter(notNull);

  return (
    <div className="h-full w-full px-2">
      <BackButton className="" href={"/dashboard/"}>
        Back
      </BackButton>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] font-bold py-1">Cover Experience</h1>
        </div>
        <div className="flex flex-col px-2">
          <Button className="btn btn-amber tight-shadow hover:animate-pulse">
            <a href="/dashboard/cover-experience/new">Add Cover Experience</a>
          </Button>
        </div>
      </div>
      <div className="overflow-y-auto h-full">
        <CoverExperience user={user} coverExperiences={coverExperiences} />
      </div>
    </div>
  );
}

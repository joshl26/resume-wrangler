// app/dashboard/cover-experience/edit/[id]/[userId]/page.tsx
import { fetchCoverExperienceById } from "@/app/lib/data";
import EditCoverExperience from "@/app/ui/forms/edit-cover-experience";
import { notFound } from "next/navigation";
import React from "react";

type Params = { id: string; userId: string };

interface PageProps {
  // Match Next's generated signature: params may be a Promise or undefined
  params?: Promise<Params>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  if (!resolvedParams) {
    return notFound();
  }

  const { id, userId } = resolvedParams;

  const coverExperience = await fetchCoverExperienceById(id, userId);

  if (!coverExperience) {
    return notFound();
  }

  return (
    <div>
      <EditCoverExperience coverExperience={coverExperience} userId={userId} />
    </div>
  );
}

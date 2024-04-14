import { fetchCoverExperienceById } from "@/app/lib/data";
import EditCoverExperience from "@/app/ui/forms/edit-cover-experience";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: { id: string; userId: string };
}) {
  const id = params.id;
  const userId = params.userId;

  const coverExperience = await fetchCoverExperienceById(id, userId);

  if (!coverExperience) {
    notFound();
  }

  return (
    <div>
      <EditCoverExperience coverExperience={coverExperience} userId={userId} />
    </div>
  );
}

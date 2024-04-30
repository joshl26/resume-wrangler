import { fetchWorkExperienceById } from "@/app/lib/data";
import EditWorkExperience from "@/app/ui/forms/edit-work-experience";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const workExperience = await fetchWorkExperienceById(id);

  if (!workExperience) {
    notFound();
  }

  return (
    <div className="overflow-y-auto h-full w-full">
      <EditWorkExperience workExperience={workExperience} />
    </div>
  );
}

// app/.../page.tsx
import { fetchWorkExperienceById } from "@/app/lib/data";
import EditWorkExperience from "@/app/ui/forms/edit-work-experience";
import { notFound } from "next/navigation";
import React from "react";

type Params = { id: string };

interface PageProps {
  // Next may pass params as a Promise or undefined
  params?: Promise<Params>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  if (!resolvedParams) return notFound();

  const { id } = resolvedParams;

  const workExperience = await fetchWorkExperienceById(id);
  if (!workExperience) return notFound();

  return (
    <div className="overflow-y-auto h-full w-full">
      <EditWorkExperience workExperience={workExperience} />
    </div>
  );
}

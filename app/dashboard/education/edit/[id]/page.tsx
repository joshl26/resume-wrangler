// app/.../page.tsx
import { fetchEducationById } from "@/app/lib/data";
import EditEducation from "@/app/ui/forms/edit-education";
import { notFound } from "next/navigation";
import React from "react";

type Params = { id: string };

interface PageProps {
  // Match Next's generated signature: params may be a Promise or undefined
  params?: Promise<Params>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  if (!resolvedParams) {
    return notFound();
  }

  const { id } = resolvedParams;

  const education = await fetchEducationById(id);

  if (!education) {
    return notFound();
  }

  return (
    <div className="overflow-y-auto h-full w-full">
      <EditEducation education={education} />
    </div>
  );
}

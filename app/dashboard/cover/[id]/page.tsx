// app/resume-template/[id]/page.tsx
import { fetchResumeTemplateById } from "@/app/lib/data";
import EditButton from "@/app/ui/resume-edit-button";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

type Params = { id: string };

interface PageProps {
  // match Next's generated signature: params may be a Promise or undefined
  params?: Promise<Params>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  if (!resolvedParams) {
    return notFound();
  }

  const { id } = resolvedParams;

  const resumeTemplateRaw = await fetchResumeTemplateById(id);
  if (!resumeTemplateRaw) {
    return notFound();
  }

  // Support either an array result or a single object
  const resumeTemplate = Array.isArray(resumeTemplateRaw)
    ? resumeTemplateRaw[0]
    : resumeTemplateRaw;

  if (!resumeTemplate) {
    return notFound();
  }

  const thumbnailUrl = resumeTemplate.thumbnail_url;
  if (!thumbnailUrl) {
    return notFound();
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <Image
        className="w-3/4 m-auto"
        alt={resumeTemplate.name || "Resume template thumbnail"}
        height={100}
        width={1500}
        src={thumbnailUrl}
      />
      <EditButton resumeId={id} />
    </div>
  );
}

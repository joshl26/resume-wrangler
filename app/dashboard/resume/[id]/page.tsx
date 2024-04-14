import { fetchResumeTemplateById } from "@/app/lib/data";
import EditButton from "@/app/ui/resume-edit-button";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const resumeTemplate = await fetchResumeTemplateById(id);

  if (!resumeTemplate) {
    notFound();
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <Image
        className="w-3/4 m-auto"
        alt=""
        height={100}
        width={1500}
        src={resumeTemplate[0]?.thumbnail_url}
      />
      <EditButton resumeId={id} />
    </div>
  );
}

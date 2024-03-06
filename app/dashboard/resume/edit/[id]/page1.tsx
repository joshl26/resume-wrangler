import { fetchResumeTemplateById } from "@/app/lib/data";
import Image from "next/image";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const resumeTemplate = await fetchResumeTemplateById(id);

  return (
    <div className="w-full h-full overflow-y-auto">
      <Image
        className="w-3/4 m-auto"
        alt=""
        height={100}
        width={1500}
        src={resumeTemplate[0].thumbnail_url}
      />
    </div>
  );
}

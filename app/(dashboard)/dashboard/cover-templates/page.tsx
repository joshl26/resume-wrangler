// app/dashboard/cover-templates/page.tsx
import React, { JSX } from "react";
import CoverTemplates from "@/app/ui/cover-templates/cover-templates";
import { fetchCoverTemplates } from "@/app/lib/data";
import { notFound } from "next/navigation";

/** Type guard to filter out null/undefined values from arrays */
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default async function Page(): Promise<JSX.Element> {
  const coverTemplatesRaw = await fetchCoverTemplates();

  // Normalize and filter out any null/undefined entries that might come from the data layer
  const coverTemplates = (coverTemplatesRaw ?? []).filter(notNull);

  // If you treat an empty list as "not found", keep this check. Otherwise remove it to allow an empty state.
  if (!coverTemplates.length) {
    return notFound();
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-row px-3 pb-3">
        <h1 className="text-lg text-[2rem] font-bold">
          Start with one of our Cover Letter Templates
        </h1>
      </div>
      <CoverTemplates coverTemplates={coverTemplates} />
    </div>
  );
}

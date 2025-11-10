// app/.../page.tsx
import { fetchCertificationById } from "@/app/lib/data";
import EditCertification from "@/app/ui/forms/edit-certification";
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

  const certification = await fetchCertificationById(id);

  if (!certification) {
    return notFound();
  }

  return (
    <div>
      <EditCertification certification={certification} />
    </div>
  );
}

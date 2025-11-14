// app/.../page.tsx
import { fetchCompanyById } from "@/app/lib/data";
import EditCompany from "@/app/ui/forms/edit-company";
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

  const company = await fetchCompanyById(id);

  if (!company) {
    return notFound();
  }

  return (
    <div className="px-4 overflow-y-auto w-full h-full pb-10">
      <EditCompany company={company} />
    </div>
  );
}

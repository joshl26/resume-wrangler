// app/.../page.tsx
import { fetchOrganizationById } from "@/app/lib/data";
import EditOrganization from "@/app/ui/forms/edit-organization";
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

  const organization = await fetchOrganizationById(id);

  if (!organization) {
    return notFound();
  }

  return (
    <div>
      <EditOrganization organization={organization} />
    </div>
  );
}

import { fetchCertificationById, fetchOrganizationById } from "@/app/lib/data";
import EditCertification from "@/app/ui/forms/edit-certification";
import EditOrganization from "@/app/ui/forms/edit-organization";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const organization = await fetchOrganizationById(id);

  if (!organization) {
    notFound();
  }

  return (
    <div>
      <EditOrganization organization={organization} />
    </div>
  );
}

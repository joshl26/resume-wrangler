import { fetchCertificationById, fetchOrganizationById } from "@/app/lib/data";
import EditCertification from "@/app/ui/forms/edit-certification";
import EditOrganization from "@/app/ui/forms/edit-organization";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const organization: any = await fetchOrganizationById(id);

  if (organization?.length === 0) {
    // notFound();
    throw new Error("Application not found");
  }
  return (
    <div>
      <EditOrganization organization={organization} />
    </div>
  );
}

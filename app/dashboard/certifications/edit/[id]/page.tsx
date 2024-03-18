import { fetchCertificationById } from "@/app/lib/data";
import EditCertification from "@/app/ui/forms/edit-certification";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const certification = await fetchCertificationById(id);

  if (certification?.length === 0) {
    // notFound();
    throw new Error("Application not found");
  }
  return (
    <div>
      <EditCertification certification={certification} />
    </div>
  );
}

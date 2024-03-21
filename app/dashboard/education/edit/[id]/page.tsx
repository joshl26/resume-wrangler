import {
  fetchCertificationById,
  fetchEducationById,
  fetchEducationByUserId,
  fetchOrganizationById,
  getUser,
} from "@/app/lib/data";
import EditCertification from "@/app/ui/forms/edit-certification";
import EditEducation from "@/app/ui/forms/edit-education";
import EditOrganization from "@/app/ui/forms/edit-organization";
import { auth } from "@/auth";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const education: any = await fetchEducationById(id);

  if (education?.length === 0) {
    // notFound();
    throw new Error("Application not found");
  }
  return (
    <div>
      <EditEducation education={education} />
    </div>
  );
}

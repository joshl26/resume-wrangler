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
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const education = await fetchEducationById(id);

  if (!education) {
    notFound();
  }

  return (
    <div>
      <EditEducation education={education} />
    </div>
  );
}

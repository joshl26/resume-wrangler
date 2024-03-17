import { fetchCompanyById, fetchWorkExperienceById } from "@/app/lib/data";
import EditCompany from "@/app/ui/forms/edit-company";
import EditWorkExperience from "@/app/ui/forms/edit-work-experience";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const workExperience = await fetchWorkExperienceById(id);

  // console.log(companies);

  if (workExperience?.length === 0) {
    // notFound();
    throw new Error("Application not found");
  }
  return (
    <div>
      <EditWorkExperience workExperience={workExperience} />
    </div>
  );
}

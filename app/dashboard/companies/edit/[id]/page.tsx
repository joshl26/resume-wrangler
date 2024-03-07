import { fetchApplicationById, fetchLatestCompanies } from "@/app/lib/data";
import EditApplication from "@/app/ui/forms/edit-application";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  //   console.log(id);

  const application = await fetchApplicationById(id);
  const companies = await fetchLatestCompanies();

  // console.log(companies);

  if (application?.length === 0) {
    // notFound();
    throw new Error("Application not found");
  }
  return (
    <div>
      <EditApplication application={application} companies={companies} />
    </div>
  );
}

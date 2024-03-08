import { fetchCompanyById } from "@/app/lib/data";
import EditCompany from "@/app/ui/forms/edit-company";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const company = await fetchCompanyById(id);

  // console.log(companies);

  if (company?.length === 0) {
    // notFound();
    throw new Error("Application not found");
  }
  return (
    <div>
      <EditCompany company={company} />
    </div>
  );
}

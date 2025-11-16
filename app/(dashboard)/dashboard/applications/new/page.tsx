// Description: Page component for creating a new job application in the dashboard.
// app/dashboard/applications/new/page.tsx

import React, { JSX } from "react";
import { fetchLatestCompaniesByUserId, getUser } from "@/app/lib/data";
import { User, Company } from "@/app/lib/definitions";
import NewApplication from "@/app/ui/forms/new-application";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import BackButton from "@/app/ui/back-button";
import Breadcrumb from "@/app/ui/Breadcrumb";

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();

  const email = session?.user?.email;
  if (!email) {
    return notFound();
  }

  const user: User | null = await getUser(email);
  if (!user || !user.id) {
    return notFound();
  }

  const companiesRaw: Company[] | null = await fetchLatestCompaniesByUserId(
    user.id,
  );
  const companies: Company[] = companiesRaw ?? [];

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard/" },
    { name: "Job Applications", url: "/dashboard/applications/" },
    { name: "Creat New Job Application", url: "/dashboard/applications/new/" },
  ];

  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </nav>
      <NewApplication user={user} companies={companies} />
      <BackButton href="/dashboard/applications/" className="mb-4">
        Back
      </BackButton>
    </div>
  );
}

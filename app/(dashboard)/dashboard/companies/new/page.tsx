// app/dashboard/companies/new/page.tsx
import React, { JSX } from "react";
import { getUser } from "@/app/lib/data";
import NewCompany from "@/app/ui/forms/new-company";
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

  const user = await getUser(email);
  if (!user || !user.id) {
    return notFound();
  }

  const breadcrumbItems = [
    { name: "Dashboard", url: "/dashboard/" },
    { name: "Companies", url: "/dashboard/companies/" },
    { name: "Create New Company", url: "/dashboard/companies/new/" },
  ];

  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </nav>
      <div className="rounded-lg my-20 p-6 tight-shadow">
        <NewCompany user={user} />
      </div>
      <BackButton href="/dashboard/companies/" className="mt-4">
        Back to Companies
      </BackButton>
    </div>
  );
}

// app/.../page.tsx
import {
  fetchApplicationById,
  fetchLatestCompaniesByUserId,
  getUser,
} from "@/app/lib/data";
import EditApplication from "@/app/ui/forms/edit-application";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React from "react";

type Params = { id: string };

interface PageProps {
  // Match Next's generated signature: params may be a Promise or undefined
  params?: Promise<Params>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  if (!resolvedParams) {
    return notFound();
  }

  const { id } = resolvedParams;

  const session = await auth();
  if (!session?.user?.email) {
    return notFound();
  }

  const user = await getUser(session.user.email);
  const companies = await fetchLatestCompaniesByUserId(user.id);
  const application = await fetchApplicationById(id);

  // Use logical OR to check for any missing value
  if (!user || !companies || !application) {
    return notFound();
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <EditApplication application={application} companies={companies} />
    </div>
  );
}

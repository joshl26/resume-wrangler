// app/dashboard/applications/new/page.tsx
import React, { JSX } from "react";
import { fetchLatestCompaniesByUserId, getUser } from "@/app/lib/data";
import NewApplication from "@/app/ui/forms/new-application";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();

  // Safely extract email into a local variable and guard it.
  // This ensures the value passed to getUser is a plain `string`.
  const email = session?.user?.email;
  if (!email) {
    return notFound();
  }

  // Keep only the fields we need on the session user (optional)
  session.user = { name: session.user?.name, email };

  // Now it's safe to call getUser with a `string`
  const user = await getUser(email);
  if (!user || !user.id) {
    return notFound();
  }

  // Fetch companies for that user id
  const companiesRaw = await fetchLatestCompaniesByUserId(user.id);
  const companies = companiesRaw ?? [];

  return (
    <div>
      <NewApplication user={user} companies={companies} />
    </div>
  );
}

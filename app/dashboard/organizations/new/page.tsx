import { getUser } from "@/app/lib/data";
import NewOrganization from "@/app/ui/forms/new-organization";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await auth();

  // Require authenticated user with a valid email
  const email = session?.user?.email;
  if (!email) {
    return notFound();
  }

  const user = await getUser(email);
  if (!user) {
    return notFound();
  }

  return (
    <div>
      <NewOrganization user={user} />
    </div>
  );
}

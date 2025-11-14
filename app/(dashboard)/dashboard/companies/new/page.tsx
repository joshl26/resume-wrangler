import { getUser } from "@/app/lib/data";
import NewCompany from "@/app/ui/forms/new-company";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await auth();

  // Guard: require a valid email before proceeding
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
      <NewCompany user={user} />
    </div>
  );
}

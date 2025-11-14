import { getUser } from "@/app/lib/data";
import NewWorkExperience from "@/app/ui/forms/new-work-experience";
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
      <NewWorkExperience user={user} />
    </div>
  );
}

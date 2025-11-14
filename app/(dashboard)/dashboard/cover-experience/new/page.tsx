import { getUser } from "@/app/lib/data";
import NewCoverExperience from "@/app/ui/forms/new-cover-experience";
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
    <div className="w-full h-full overflow-y-auto px-4">
      <NewCoverExperience user={user} />
    </div>
  );
}

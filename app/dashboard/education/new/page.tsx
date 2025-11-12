import { getUser } from "@/app/lib/data";
import NewCertification from "@/app/ui/forms/new-certification";
import NewCompany from "@/app/ui/forms/new-company";
import NewEducation from "@/app/ui/forms/new-education";
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
      <NewEducation user={user} />
    </div>
  );
}

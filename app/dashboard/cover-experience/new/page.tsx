import { getUser } from "@/app/lib/data";
import NewCompany from "@/app/ui/forms/new-company";
import NewWorkExperience from "@/app/ui/forms/new-work-experience";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };

    const user = await getUser(session?.user?.email!);

    if (!user) {
      notFound();
    }

    return (
      <div>
        <NewWorkExperience user={user} />
      </div>
    );
  }
}

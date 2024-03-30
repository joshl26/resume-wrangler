import { fetchLatestCompaniesByUserId, getUser } from "@/app/lib/data";
import { Companies, User } from "@/app/lib/definitions";
import NewApplication from "@/app/ui/forms/new-application";
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

    const user: User = await getUser(session?.user?.email!);

    const companies: Companies = await fetchLatestCompaniesByUserId(user?.id);

    return (
      <div>
        <NewApplication user={user} companies={companies} />
      </div>
    );
  }
}

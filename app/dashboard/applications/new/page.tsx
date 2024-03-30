import {
  fetchApplicationById,
  fetchLatestCompaniesByUserId,
  getUser,
} from "@/app/lib/data";
import EditApplication from "@/app/ui/forms/edit-application";
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
      // image: session.user.image,
    };
    //   console.log(id);

    const user = await getUser(session?.user?.email!);

    const companies = await fetchLatestCompaniesByUserId(user?.id);

    //console.log(companies);

    return (
      <div>
        <NewApplication user={user} companies={companies} />
      </div>
    );
  }
}

import { fetchCompanyById, getUser } from "@/app/lib/data";
import EditCompany from "@/app/ui/forms/edit-company";
import NewCompany from "@/app/ui/forms/new-company";
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

    return (
      <div>
        <NewCompany user={user} />
      </div>
    );
  }
}

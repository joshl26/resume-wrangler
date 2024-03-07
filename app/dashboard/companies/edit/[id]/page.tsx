import {
  fetchApplicationById,
  fetchLatestCompaniesByUserId,
  getUser,
} from "@/app/lib/data";
import EditApplication from "@/app/ui/forms/edit-application";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const session = await auth();

  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      // image: session.user.image,
    };
    //   console.log(id);

    const user = await getUser(session?.user?.email!);

    //   console.log(id);

    const application = await fetchApplicationById(id);
    const companies = await fetchLatestCompaniesByUserId(user.id);

    // console.log(companies);

    if (application?.length === 0) {
      // notFound();
      throw new Error("Application not found");
    }
    return (
      <div>
        <EditApplication application={application} companies={companies} />
      </div>
    );
  }
}

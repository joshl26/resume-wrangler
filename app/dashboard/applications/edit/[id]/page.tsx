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
    };

    const user = await getUser(session?.user?.email!);
    const companies = await fetchLatestCompaniesByUserId(user.id);
    const application = await fetchApplicationById(id);

    if (!user ?? !companies ?? !application) {
      notFound();
    }

    return (
      <div className="w-full h-full overflow-y-auto">
        <EditApplication application={application} companies={companies} />
      </div>
    );
  }
}

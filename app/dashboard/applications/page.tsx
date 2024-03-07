import {
  fetchApplicationsByUserId,
  fetchLatestCompanies,
  getUser,
} from "@/app/lib/data";
import Applications from "@/app/ui/tables/applications/applications-table";
import { auth } from "@/auth";
import React from "react";

export default async function Page() {
  const session = await auth();
  console.log(session);
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      // image: session.user.image,
    };
  }

  const user = await getUser(session?.user?.email!);

  const applications = await fetchApplicationsByUserId(user?.id!);
  const companies = await fetchLatestCompanies();
  // console.log(applications);
  return (
    <div className="h-full w-full">
      <h1 className="text-[2rem] font-bold">Applications</h1>
      <Applications applications={applications} companies={companies} />
    </div>
  );
}

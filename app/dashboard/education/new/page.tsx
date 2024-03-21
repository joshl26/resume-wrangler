import { getUser } from "@/app/lib/data";
import NewCertification from "@/app/ui/forms/new-certification";
import NewCompany from "@/app/ui/forms/new-company";
import NewEducation from "@/app/ui/forms/new-education";
import NewOrganization from "@/app/ui/forms/new-organization";
import { auth } from "@/auth";
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
        <NewEducation user={user} />
      </div>
    );
  }
}

import { getUser } from "@/app/lib/data";
import NewSkill from "@/app/ui/forms/new-skill";
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
        <NewSkill user={user} />
      </div>
    );
  }
}

import React from "react";
import { auth } from "@/auth";
import { getUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import UserEditForm from "@/app/ui/user-profile/edit-form";

export default async function Page() {
  const session = await auth();

  const user: User = await getUser(session?.user?.email!);

  return <UserEditForm user={user} />;
}

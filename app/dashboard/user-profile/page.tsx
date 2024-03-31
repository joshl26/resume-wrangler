import React from "react";
import { auth } from "@/auth";
import { getUser } from "@/app/lib/data";
import UserEditForm from "@/app/ui/user-profile/edit-form";
import { notFound } from "next/navigation";

export default async function Page() {
  const session = await auth();

  const user = await getUser(session?.user?.email!);

  if (!user) {
    notFound();
  }

  return <UserEditForm user={user} />;
}

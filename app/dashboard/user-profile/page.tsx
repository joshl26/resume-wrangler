// Description: User Profile Page - Displays the user profile edit form for authenticated users.
// file: app/dashboard/user-profile/page.tsx

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

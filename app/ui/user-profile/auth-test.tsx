import React from "react";
import { getUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { Session } from "next-auth";
import UserEditForm from "./edit-form";

export default async function AuthTest({
  session,
}: {
  session: Session | null;
}) {
  const user: User = await getUser(session?.user?.email!);

  return <UserEditForm user={user} />;
}

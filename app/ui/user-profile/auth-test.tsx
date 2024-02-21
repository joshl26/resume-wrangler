import React from "react";
import { useSession } from "next-auth/react";
import { getUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "../button";
import { useFormState } from "react-dom";
import UserEditForm from "./edit-form";

export default async function AuthTest({
  session,
}: {
  session: Session | null;
}) {
  //   const { data: session, update, status } = useSession();

  const user: User = await getUser(session?.user?.email!);
  console.log(user);

  return <UserEditForm user={user} />;
}

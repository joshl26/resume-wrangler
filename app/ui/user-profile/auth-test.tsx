import React from "react";
import { useSession } from "next-auth/react";
import { getUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { Session } from "next-auth";

export default async function AuthTest({
  session,
}: {
  session: Session | null;
}) {
  //   const { data: session, update, status } = useSession();

  const user = await getUser(session?.user?.email!);
  //   console.log(user);

  return (
    <div>
      <h2>{user?.name}</h2> <h2>{user?.email}</h2>
    </div>
  );
}

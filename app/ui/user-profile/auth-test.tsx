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
      {/* <h2>{user?.name}</h2> <h2>{user?.email}</h2> */}
      <form>
        <input type="hidden" name="id" value={user.id} />
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input id="name" name="name" type="text" defaultValue={user.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={user.email}
          />
        </div>
        <div>
          <label
            htmlFor="first-name"
            className="mb-2 block text-sm font-medium"
          >
            First Name
          </label>
          <input
            id="first-name"
            name="first-name"
            type="text"
            defaultValue={user.first_name}
          />
        </div>
      </form>
    </div>
  );
}

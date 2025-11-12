// app/ui/dashboard/SignOutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="tight-shadow btn btn-amber flex w-full items-center gap-2 rounded-full p-1 justify-start mr-1 px-2 hover:animate-pulse"
    >
      <PowerIcon className="w-5" />
      <div className="block">
        <p>Sign Out</p>
      </div>
    </button>
  );
}
import React from "react";
import AuthTest from "@/app/ui/user-profile/auth-test";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return <AuthTest session={session} />;
}

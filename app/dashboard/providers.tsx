// providers for dashboard that might be different from main app
// dashboard/providers.tsx

"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

export default function Providers({ children, session }: { children: React.ReactNode; session?: Session | null; }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
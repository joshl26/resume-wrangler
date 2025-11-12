// auth.ts
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import { z } from "zod";
import { getUser } from "@/app/lib/data";
import { getServerSession, type Session } from "next-auth";

export const authOptions: AuthOptions = {
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[auth] authorize called with email:", credentials?.email ?? null);
        if (!credentials) return null;
        const parsed = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse(credentials);
        if (!parsed.success) return null;

        const user = await getUser(parsed.data.email);
        if (!user || !user.password) return null;

        const match = await bcrypt.compare(parsed.data.password, user.password);
        if (!match) return null;

        const { password, ...safeUser } = user as any;
        return safeUser;
      },
    }),
  ],
};

export default function nextAuthHandler(req: Request) {
  return NextAuth(authOptions)(req as any);
}

export async function auth(): Promise<Session | null> {
  return (await getServerSession(authOptions)) as Session | null;
}
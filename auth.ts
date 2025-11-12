// auth.ts
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import { z } from "zod";
import {
  getUser,
  getUserByEmail,
  createUser,
  upsertProviderAccount,
} from "@/app/lib/data";
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
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(1) })
          .safeParse(credentials);
        if (!parsed.success) return null;

        const user = await getUser(parsed.data.email);
        if (!user || !user.password) return null;

        const match = await bcrypt.compare(parsed.data.password, user.password);
        if (!match) return null;

        const { password, ...safeUser } = user as any;
        return safeUser;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider) {
          if (!user?.email) {
            console.error("[auth][signIn] no email present on OAuth profile", {
              provider: account.provider,
              profile,
            });
            return false;
          }

          const existing = await getUserByEmail(user.email);

          if (existing) {
            await upsertProviderAccount({
              userId: existing.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              accessToken: (account as any).access_token ?? null,
              refreshToken: (account as any).refresh_token ?? null,
              expiresAt: (account as any).expires_at
                ? new Date((account as any).expires_at * 1000)
                : null,
              scope: (account as any).scope ?? null,
              tokenType: (account as any).token_type ?? null,
              idToken: (account as any).id_token ?? null,
              profileJson: profile ?? null,
              profileName: user.name ?? null,
              profileEmail: user.email,
              profilePicture: (user as any).image ?? null,
              lastSignInAt: new Date(),
            });
            return true;
          } else {
            const newUser = await createUser({
              email: user.email,
              name: user.name ?? "",
              first_name: null,
              last_name: null,
            });

            await upsertProviderAccount({
              userId: newUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              accessToken: (account as any).access_token ?? null,
              refreshToken: (account as any).refresh_token ?? null,
              expiresAt: (account as any).expires_at
                ? new Date((account as any).expires_at * 1000)
                : null,
              scope: (account as any).scope ?? null,
              tokenType: (account as any).token_type ?? null,
              idToken: (account as any).id_token ?? null,
              profileJson: profile ?? null,
              profileName: user.name ?? null,
              profileEmail: user.email,
              profilePicture: (user as any).image ?? null,
              lastSignInAt: new Date(),
            });

            return true;
          }
        }
        return true;
      } catch (err) {
        console.error("[auth][signIn] error linking/creating user:", err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await getUserByEmail(user.email!);
        if (dbUser) token.userId = dbUser.id;
      }
      return token;
    },

    async session({ session, token }) {
      (session.user as any).id = (token as any).userId;
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
};

export default function nextAuthHandler(req: Request) {
  return NextAuth(authOptions)(req as any);
}

export async function auth(): Promise<Session | null> {
  return (await getServerSession(authOptions)) as Session | null;
}
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getUser } from "./app/lib/data";

/**
 * NextAuth handler with Credentials provider.
 * - validates input with zod
 * - compares password with bcrypt
 * - strips sensitive fields before returning the user object
 */
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.warn("No credentials provided");
          return null;
        }

        const parsed = z
          .object({
            email: z.string().email("Email is invalid"),
            password: z.string().min(6).max(72),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          console.warn("Invalid credentials format", parsed.error.format());
          return null;
        }

        const { email, password } = parsed.data;
        const user = await getUser(email);
        if (!user) {
          // don't reveal which part failed (security)
          return null;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;

        // Return a safe user object (strip password and other secrets)
        // Adjust fields you want to expose in the session/token
        const { password: _pwd, ...safeUser } = user as any;
        return safeUser;
      },
    }),
  ],
});

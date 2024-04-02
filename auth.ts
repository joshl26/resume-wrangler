import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { conn } from "./app/lib/database";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const query = `SELECT * FROM users WHERE email='${email}'`;
//     const user = await conn.query(query);
//     return user.rows[0];
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }

async function getUser(email: string) {
  try {
    const query = `SELECT * FROM users WHERE email='${email}'`;
    const data = await conn.query(query);

    const user: User = data?.rows[0];

    return user;
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});

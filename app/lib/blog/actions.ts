"use server";

import { auth } from "@/auth";
import { type Session } from "next-auth";
import { conn } from "./postgres";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function increment(slug: string) {
  noStore();

  try {
    const query = `INSERT INTO views (slug, count) VALUES ('${slug}', 1) ON CONFLICT (slug) DO UPDATE SET count = views.count + 1`;
    const data = await conn.query(query);
    return;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume templates.");
    return;
  }
}

async function getSession(): Promise<Session> {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function saveGuestbookEntry(formData: FormData) {
  const session = await getSession();
  const email = session.user?.email as string;
  const created_by = session.user?.name as string;

  if (!session.user) {
    throw new Error("Unauthorized");
  }

  const entry = formData.get("entry")?.toString() || "";
  const body = entry.slice(0, 500);

  try {
    const query = `INSERT INTO guestbook (email, body, created_by, created_at) VALUES ('${email}', '${body}', '${created_by}', NOW())`;
    const data = await conn.query(query);

    revalidatePath("/guestbook");

    // let data2 = await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${process.env.RESEND_SECRET}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     from: "guestbook@leerob.io",
    //     to: "me@leerob.io",
    //     subject: "New Guestbook Entry",
    //     html: `<p>Email: ${email}</p><p>Message: ${body}</p>`,
    //   }),
    // });

    // let response = await data2.json();
    // console.log("Email sent", response);

    return;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume templates.");
    return;
  }
}

export async function deleteGuestbookEntries(selectedEntries: string[]) {
  const session = await getSession();
  const email = session.user?.email as string;

  if (email !== "joshlehman.dev@gmail.com") {
    throw new Error("Unauthorized");
  }

  const selectedEntriesAsNumbers = selectedEntries.map(Number);
  const arrayLiteral = `{${selectedEntriesAsNumbers.join(",")}}`;

  try {
    const query = `DELETE FROM guestbook WHERE id = ANY('${arrayLiteral}'::int[])`;
    const data = await conn.query(query);

    revalidatePath("/admin");
    revalidatePath("/guestbook");
    return;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume templates.");
    return;
  }
}

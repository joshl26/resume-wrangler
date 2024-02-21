import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { conn } from "@/app/lib/database";
const bcrypt = require("bcrypt");

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    // validate email and password
    console.log({ username, email, password });

    const hashedPassword = await bcrypt.hash(password, 10);
    // // const hashedPassword = await hash(password, 10);

    const query = `INSERT INTO users (name, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`;

    const data = await conn.query(query);

    // const response = await sql`
    //   INSERT INTO users (email, password)
    //   VALUES (${email}, ${hashedPassword})
    // `;
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}

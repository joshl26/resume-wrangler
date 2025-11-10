"use server";

import { NextResponse } from "next/server";
import { conn } from "@/app/lib/database";
import bcrypt from "bcrypt";

// export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // console.log({ username, email, password });

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (name, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`;

    console.log(query);

    const data = await conn.query(query);

    console.log(data);

    return NextResponse.json(
      {
        success: true,
        message: "Signup succeeded",
      },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    if (e.code === "23505") {
      return NextResponse.json(
        {
          success: false,
        },
        {
          statusText: e.detail,
          status: 500,
        },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
        },
        {
          statusText: "Unknown Error",
          status: 400,
        },
      );
    }
  }
}

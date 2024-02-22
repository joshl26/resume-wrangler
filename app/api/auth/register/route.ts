import { NextResponse } from "next/server";
// import { hash } from "bcrypt";
// import { sql } from "@vercel/postgres";
import { conn } from "@/app/lib/database";
const bcrypt = require("bcrypt");

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    // validate email and password
    console.log({ username, email, password });

    //TODO check to see if email exists

    const hashedPassword = await bcrypt.hash(password, 10);
    // // const hashedPassword = await hash(password, 10);

    const query = `INSERT INTO users (name, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`;

    // const delay = (delayInms: number) => {
    //   return new Promise((resolve) => setTimeout(resolve, delayInms));
    // };

    const data = await conn.query(query);
    // let delayres = await delay(3000);

    // const response = await sql`
    //   INSERT INTO users (email, password)
    //   VALUES (${email}, ${hashedPassword})
    // `;

    return NextResponse.json(
      {
        success: true,
        message: "Signup succeeded",
      },
      {
        status: 200,
      }
    );
  } catch (e: any) {
    // console.log(e.code === "23505");

    if (e.code === "23505") {
      return NextResponse.json(
        {
          success: false,
        },
        {
          statusText: e.detail,
          status: 500,
        }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
        },
        {
          statusText: "Unknown Error",
          status: 400,
        }
      );
    }
  }
}

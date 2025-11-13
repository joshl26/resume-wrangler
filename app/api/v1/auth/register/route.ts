// app/api/auth/register/route.ts
"use server";

import { NextResponse } from "next/server";
import { conn } from "@/app/lib/database";
import bcrypt from "bcrypt";
import { withRateLimit } from "@/app/lib/rateLimit";

async function signupHandler(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // Input validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use parameterized query to prevent SQL injection
    const query = `
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3)
      RETURNING id, name, email
    `;

    const result = await conn.query(query, [username, email, hashedPassword]);
    const user = result.rows[0];

    return NextResponse.json(
      {
        success: true,
        message: "Signup succeeded",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (e: any) {
    console.error("Signup error:", e); // Server-side logging only

    // Handle duplicate email/username
    if (e.code === "23505") {
      const field = e.detail?.includes("email") ? "Email" : "Username";
      return NextResponse.json(
        {
          success: false,
          message: `${field} already exists`,
        },
        { status: 409 },
      );
    }

    // Handle other database errors
    return NextResponse.json(
      {
        success: false,
        message: "Signup failed. Please try again.",
      },
      { status: 500 },
    );
  }
}

// Apply strict rate limiting: 5 attempts per hour per IP
export const POST = withRateLimit(signupHandler, 5, 3600);

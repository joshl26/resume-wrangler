"use server";

import { conn } from "../database";

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";

export async function getBlogViews(): Promise<number> {
  if (!process.env.POSTGRES_DB_HOST) {
    return 0;
  }

  noStore();

  try {
    const query = `SELECT count FROM views`;
    // If your conn.query is typed, you can provide a row type:
    const res = await conn.query<{ count: number }>(query);
    const rows = res.rows ?? [];
    return rows.reduce((acc, curr) => acc + Number(curr.count ?? 0), 0);
  } catch (error: any) {
    console.error("Database Error:", error);
    return 0;
  }
}

export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  if (!process.env.POSTGRES_DB_HOST) {
    return [];
  }

  noStore();

  try {
    const query = `SELECT slug, count FROM views`;
    const res = await conn.query<{ slug: string; count: number }>(query);
    const rows = res.rows ?? [];
    // Make sure to normalize types (count -> number)
    return rows.map((r) => ({
      slug: String(r.slug),
      count: Number(r.count ?? 0),
    }));
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

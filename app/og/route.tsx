// app/og/route.tsx (unchanged top-level import.meta usage stays here)
import { NextRequest } from "next/server";
import { createOgImageResponse } from "./og-util";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");
  const font = fetch(
    new URL("../fonts/Raleway-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

  return createOgImageResponse(postTitle, fontData, process.env.DEPLOYMENT_URL);
}

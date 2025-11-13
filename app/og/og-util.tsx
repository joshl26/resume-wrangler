// app/og/og-util.ts
import { ImageResponse } from "next/og";

/**
 * Build and return an ImageResponse for the OG route.
 * Kept pure so it can be tested (fontData and deploymentUrl are injected).
 */
export function createOgImageResponse(
  postTitle: string | null,
  fontData: ArrayBuffer,
  deploymentUrl: string | undefined,
) {
  const element = (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "black",
        backgroundImage: `url(${deploymentUrl ?? ""}/og-bg.png)`,
      }}
    >
      <div
        style={{
          marginLeft: 190,
          marginRight: 190,
          display: "flex",
          fontSize: 130,
          fontFamily: "Raleway",
          letterSpacing: "-0.05em",
          fontStyle: "normal",
          color: "white",
          lineHeight: "120px",
          whiteSpace: "pre-wrap",
        }}
      >
        {postTitle}
      </div>
    </div>
  );

  const options = {
    width: 1920,
    height: 1080,
    fonts: [
      {
        name: "Raleway",
        data: fontData,
        style: "normal" as const, // <-- Fix: cast to literal type
      },
    ],
  };

  return new ImageResponse(element, options);
}

export type CreateOgImageResponse = typeof createOgImageResponse;

/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

/**
 * Per-test mock for next/image: MUST be declared before importing the component under test
 * (or set up globally in Jest setupFilesAfterEnv).
 */
jest.mock("next/image", () => {
  const React = require("react");
  const NextImage = ({ src, alt, ...props }: any) => {
    const resolvedSrc =
      typeof src === "string" ? src : (src && (src.src || src.default)) || "";
    return React.createElement("img", {
      src: resolvedSrc,
      alt: alt ?? "",
      ...props,
    });
  };
  return { __esModule: true, default: NextImage };
});

// Import the component after the next/image mock
import DeviceSize from "../device-size";

describe("DeviceSize", () => {
  it("renders the device size warning message and header classes", () => {
    const { container } = render(<DeviceSize />);

    const message = screen.getByText(
      /Please login from a device with a screen size larger that 768px width and\/or 300px height/i,
    );
    expect(message).toBeInTheDocument();

    const messageContainer = message.closest("div");
    expect(messageContainer).toHaveClass(
      "relative",
      "z-30",
      "p-5",
      "text-2xl",
      "text-center",
      "text-white",
      "bg-slate-500",
      "bg-opacity-50",
      "rounded-xl",
    );

    const header = container.querySelector("header");
    expect(header).toHaveClass(
      "p-10",
      "relative",
      "flex",
      "items-center",
      "justify-center",
      "h-screen",
      "mb-12",
      "overflow-hidden",
    );
  });

  it("renders the background video with correct attributes and source", () => {
    const { container } = render(<DeviceSize />);

    // Query the video element directly from the container
    const video = container.querySelector("video") as HTMLVideoElement | null;
    expect(video).toBeInTheDocument();

    // JSDOM serializes boolean attributes, so check for presence / property
    expect(video?.hasAttribute("autoplay")).toBeTruthy();
    expect(
      video?.hasAttribute("playsinline") || (video as any)?.playsInline,
    ).toBeTruthy();
    expect(video?.hasAttribute("loop")).toBeTruthy();
    expect(video?.hasAttribute("muted") || video?.muted).toBeTruthy();

    expect(video).toHaveClass(
      "absolute",
      "z-10",
      "w-auto",
      "min-w-full",
      "min-h-full",
      "max-w-none",
    );

    const source = container.querySelector(
      "video > source",
    ) as HTMLSourceElement | null;
    expect(source).toBeInTheDocument();
    expect(source).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/dv6keahg3/video/upload/v1710779448/ResumeWrangler/video/lasso-cowboys_j1ablg.mp4",
    );
    expect(source).toHaveAttribute("type", "video/mp4");

    // Fallback text inside <video>
    expect(video?.textContent).toContain(
      "Your browser does not support the video tag.",
    );
  });
});

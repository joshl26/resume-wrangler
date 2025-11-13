/// <reference types="@testing-library/jest-dom" />
import "@testing-library/jest-dom";

// common mocks (example)
jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
  }),
}));

import React from "react";

/**
 * Global mock for next/image to avoid Next.js image loader in JSDOM tests.
 * Returns a plain <img /> with a resolved src string.
 */
jest.mock("next/image", () => {
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

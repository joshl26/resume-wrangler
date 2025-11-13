/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

/**
 * Mock next/image BEFORE importing the component so Next's image loader
 * doesn't run in JSDOM. The mock returns a plain <img /> and resolves
 * both string src and module-imported src objects (webpack/jest file stubs).
 */
jest.mock("next/image", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ src, alt, ...props }: any) => {
      const resolvedSrc =
        typeof src === "string" ? src : (src && (src.src || src.default)) || "";
      return React.createElement("img", {
        src: resolvedSrc,
        alt: alt ?? "",
        ...props,
      });
    },
  };
});

// Import the component after the mock
import ResponsesCard from "../responses-card";

describe("ResponsesCard", () => {
  it("renders the card title and image", () => {
    const { container } = render(<ResponsesCard />);

    // Title
    expect(screen.getByText("Responses")).toBeInTheDocument();

    // Image: component uses alt="" so query by alt text empty string
    const img = screen.getByAltText("");
    expect(img).toBeInTheDocument();

    // The src may be Jest's file-stub or a mocked path; assert it's present
    const src = img.getAttribute("src");
    expect(src).toBeTruthy();

    // Image classes
    expect(img).toHaveClass("h-full", "w-auto", "m-auto");

    // Container classes
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass(
      "tour-response-this-week",
      "w-full",
      "h-[250px]",
      "bg-white",
      "rounded-lg",
      "tight-shadow",
    );

    // Use the image's parentElement as the wrapper (robust vs using querySelector with special chars)
    const wrapper = img.parentElement as HTMLElement | null;
    expect(wrapper).toBeTruthy();
    if (wrapper) {
      // The wrapper should include the height class and contain the image
      expect(wrapper.className).toMatch(/w-full/);
      expect(wrapper.querySelector("img")).toBe(img);
    }
  });

  it("applies heading classes", () => {
    render(<ResponsesCard />);

    const heading = screen.getByText("Responses");
    expect(heading).toHaveClass("font-bold", "p-2");
  });
});

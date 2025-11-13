/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

/**
 * Mock next/image to avoid Next's image parsing/loader in Jest.
 * Return a plain <img/> that exposes the src we can assert against.
 */
jest.mock("next/image", () => {
  return ({ src, alt, ...props }: any) => {
    const resolvedSrc =
      typeof src === "string" ? src : (src && (src.src || src.default)) || "";
    return <img src={resolvedSrc} alt={alt} {...props} />;
  };
});

// (Optional) you can mock the asset import path too, but it's not required if next/image is mocked
// jest.mock("@/public/graphs/MapChart.png", () => "/mocked-map-chart.png");

import DemographicsCard from "../demographics-card";

describe("DemographicsCard", () => {
  it("renders the demographics card with title and image", () => {
    render(<DemographicsCard />);

    // Title
    expect(screen.getByText("Demographics")).toBeInTheDocument();

    // Image: use getByAltText because alt is empty string in component
    const image = screen.getByAltText("");
    expect(image).toBeInTheDocument();

    // The src may be the Jest file-stub or a mocked path depending on your Jest config.
    // Assert it's present (non-empty) rather than an exact value.
    const src = image.getAttribute("src");
    expect(src).toBeTruthy();

    // alt is an empty string in your component
    expect(image).toHaveAttribute("alt", "");

    // CSS classes on the image
    expect(image).toHaveClass("h-full", "w-auto", "m-auto");
  });

  it("applies the correct CSS classes to the container", () => {
    const { container } = render(<DemographicsCard />);

    const cardContainer = container.firstChild as HTMLElement;
    expect(cardContainer).toHaveClass(
      "tour-demographics",
      "w-1/2",
      "h-[275px]",
      "bg-white",
      "rounded-lg",
      "tight-shadow",
    );

    const title = screen.getByText("Demographics");
    expect(title).toHaveClass("font-bold", "p-2");

    const image = screen.getByAltText("");
    const imageContainer = image.parentElement as HTMLElement;
    expect(imageContainer).toHaveClass("w-full", "h-[225px]");
  });
});

/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/cover-templates.test.tsx
 *
 * Tests for the CoverTemplates component
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// Mock next/image to render a simple img element
jest.mock("next/image", () => {
  return ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  );
});

// Import the component after setting up mocks
import CoverTemplates from "../cover-templates";

describe("CoverTemplates", () => {
  const coverTemplates = [
    {
      id: "template1",
      name: "Standard Template",
      thumbnail_url: "/images/template1.jpg",
    },
    {
      id: "template2",
      name: "Modern Template",
      thumbnail_url: "/images/template2.jpg",
    },
  ] as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders heading and template cards", () => {
    render(<CoverTemplates coverTemplates={coverTemplates} />);

    // Check heading is rendered
    expect(
      screen.getByText("Start off with one of our curated cover templates"),
    ).toBeInTheDocument();

    // Check that both templates are rendered
    expect(screen.getByAltText("Standard Template")).toBeInTheDocument();
    expect(screen.getByAltText("Modern Template")).toBeInTheDocument();

    // Check template names are displayed
    expect(screen.getByText("Standard Template")).toBeInTheDocument();
    expect(screen.getByText("Modern Template")).toBeInTheDocument();

    // Check Preview text is displayed for each template
    const previewTexts = screen.getAllByText("Preview");
    expect(previewTexts).toHaveLength(2);
  });

  it("renders images with correct src and alt attributes", () => {
    render(<CoverTemplates coverTemplates={coverTemplates} />);

    const standardImage = screen.getByAltText("Standard Template");
    const modernImage = screen.getByAltText("Modern Template");

    expect(standardImage).toHaveAttribute("src", "/images/template1.jpg");
    expect(modernImage).toHaveAttribute("src", "/images/template2.jpg");

    expect(standardImage).toHaveAttribute("width", "350");
    expect(modernImage).toHaveAttribute("width", "350");
  });

  it("renders template cards with correct structure", () => {
    const { container } = render(
      <CoverTemplates coverTemplates={coverTemplates} />,
    );

    // Check that template containers exist
    const templateContainers = container.querySelectorAll(".w-\\[350px\\]");
    expect(templateContainers).toHaveLength(2);

    // Check that each template has the expected structure
    templateContainers.forEach((container, index) => {
      const template = coverTemplates[index];

      // Check image exists
      const image = container.querySelector("img");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", template.thumbnail_url);
      expect(image).toHaveAttribute("alt", template.name);

      // Check name is displayed
      expect(container).toHaveTextContent(template.name);

      // Check Preview text exists
      expect(container).toHaveTextContent("Preview");
    });
  });

  it("renders nothing when coverTemplates is empty", () => {
    const { container } = render(<CoverTemplates coverTemplates={[]} />);

    // Heading should still be rendered
    expect(
      screen.getByText("Start off with one of our curated cover templates"),
    ).toBeInTheDocument();

    // But no template cards should be present
    const templateContainers = container.querySelectorAll(".w-\\[350px\\]");
    expect(templateContainers).toHaveLength(0);
  });

  it("renders nothing when coverTemplates is null or undefined", () => {
    const { container } = render(
      <CoverTemplates coverTemplates={null as any} />,
    );

    // Heading should still be rendered
    expect(
      screen.getByText("Start off with one of our curated cover templates"),
    ).toBeInTheDocument();

    // No template cards should be present
    const templateContainers = container.querySelectorAll(".w-\\[350px\\]");
    expect(templateContainers).toHaveLength(0);
  });
});

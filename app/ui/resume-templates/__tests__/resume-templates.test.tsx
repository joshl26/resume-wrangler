/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ResumeTemplates from "../resume-templates";
import type {
  ResumeTemplate,
  ResumeTemplates as ResumeTemplatesType,
} from "@/app/lib/definitions";

// Mock next/image to avoid issues with loading images in tests
jest.mock("next/image", () => {
  return ({ alt, src, width, height, ...props }: any) => (
    <img alt={alt} src={src} width={width} height={height} {...props} />
  );
});

// Use the real types from your codebase for the test data
const mockResumeTemplates: ResumeTemplatesType = [
  {
    id: "template-1",
    name: "Professional",
    thumbnail_url: "/thumbnails/professional.png",
  } as ResumeTemplate,
  {
    id: "template-2",
    name: "Creative",
    thumbnail_url: "/thumbnails/creative.png",
  } as ResumeTemplate,
  {
    id: "template-3",
    name: "Minimal",
    thumbnail_url: null, // filtered out by component
  } as unknown as ResumeTemplate,
  {
    id: "template-4",
    name: "Modern",
    thumbnail_url: "/thumbnails/modern.png",
  } as ResumeTemplate,
];

describe("ResumeTemplates", () => {
  it("renders the heading", () => {
    render(<ResumeTemplates resumeTemplates={mockResumeTemplates} />);

    expect(
      screen.getByText("Start off with one of our curated resume templates"),
    ).toBeInTheDocument();
  });

  it("renders templates with thumbnails and links to template pages (uses real types)", () => {
    render(<ResumeTemplates resumeTemplates={mockResumeTemplates} />);

    // Only templates with non-null thumbnail_url should render (3 items)
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);

    // For each visible template, assert the name, image and href are correct by locating the name and then its closest anchor
    const professionalName = screen.getByText("Professional");
    const professionalAnchor = professionalName.closest("a");
    expect(professionalAnchor).toBeInTheDocument();
    expect(professionalAnchor).toHaveAttribute(
      "href",
      "/dashboard/resume/template-1",
    );
    expect(screen.getByAltText("Professional")).toHaveAttribute(
      "src",
      "/thumbnails/professional.png",
    );

    const creativeName = screen.getByText("Creative");
    const creativeAnchor = creativeName.closest("a");
    expect(creativeAnchor).toBeInTheDocument();
    expect(creativeAnchor).toHaveAttribute(
      "href",
      "/dashboard/resume/template-2",
    );
    expect(screen.getByAltText("Creative")).toHaveAttribute(
      "src",
      "/thumbnails/creative.png",
    );

    const modernName = screen.getByText("Modern");
    const modernAnchor = modernName.closest("a");
    expect(modernAnchor).toBeInTheDocument();
    expect(modernAnchor).toHaveAttribute(
      "href",
      "/dashboard/resume/template-4",
    );
    expect(screen.getByAltText("Modern")).toHaveAttribute(
      "src",
      "/thumbnails/modern.png",
    );
  });

  it("filters out templates without thumbnails", () => {
    render(<ResumeTemplates resumeTemplates={mockResumeTemplates} />);

    // "Minimal" has null thumbnail_url and should not be rendered
    expect(screen.queryByAltText("Minimal")).not.toBeInTheDocument();
    expect(screen.queryByText("Minimal")).not.toBeInTheDocument();
  });

  it("renders correctly with an empty templates array", () => {
    render(<ResumeTemplates resumeTemplates={[]} />);

    expect(
      screen.getByText("Start off with one of our curated resume templates"),
    ).toBeInTheDocument();

    // No template links should be present
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});

/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobBoards from "../JobBoards"; // adjust path if needed

// Mock next/image to avoid issues with loading images in tests
jest.mock("next/image", () => {
  return ({ alt, src, width, height, ...props }: any) => (
    <img alt={alt} src={src} width={width} height={height} {...props} />
  );
});

describe("JobBoards", () => {
  const u = userEvent.setup();

  it("renders the component with initial state", () => {
    render(<JobBoards />);

    // Check heading
    expect(screen.getByText("What is your job title?")).toBeInTheDocument();

    // Check input field
    const input = screen.getByPlaceholderText(
      "e.g. Software Engineer",
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Software Engineer");

    // Check that all providers are rendered
    expect(screen.getAllByRole("img")).toHaveLength(11); // 11 logos
    expect(screen.getAllByRole("link")).toHaveLength(11); // 11 links
  });

  it("updates job title when user types", async () => {
    render(<JobBoards />);

    const input = screen.getByPlaceholderText(
      "e.g. Software Engineer",
    ) as HTMLInputElement;

    // Clear and type new value
    await u.clear(input);
    await u.type(input, "Frontend Developer");

    expect(input.value).toBe("Frontend Developer");
  });

  it("displays search links with job title when input is not empty", async () => {
    render(<JobBoards />);

    const input = screen.getByPlaceholderText(
      "e.g. Software Engineer",
    ) as HTMLInputElement;
    await u.clear(input);
    await u.type(input, "Product Manager");

    // Use role-based queries to get the anchor elements (not the inner h2)
    const indeedAnchor = screen.getByRole("link", {
      name: /Search indeed for Product Manager positions/i,
    });
    expect(indeedAnchor).toBeInTheDocument();
    expect(indeedAnchor).toHaveAttribute(
      "href",
      "https://ca.indeed.com/jobs?q=Product%20Manager",
    );

    const linkedinAnchor = screen.getByRole("link", {
      name: /Search LinkedIn for Product Manager positions/i,
    });
    expect(linkedinAnchor).toBeInTheDocument();
    expect(linkedinAnchor).toHaveAttribute(
      "href",
      "https://www.linkedin.com/jobs/search?keywords=Product%20Manager",
    );

    // Ensure there are still 11 links
    expect(screen.getAllByRole("link")).toHaveLength(11);
  });

  it("displays generic search links when input is empty", async () => {
    render(<JobBoards />);

    const input = screen.getByPlaceholderText(
      "e.g. Software Engineer",
    ) as HTMLInputElement;
    await u.clear(input); // make the input empty

    // Query anchors by their exact link text rendered when jobTitle is empty
    const indeedAnchor = screen.getByRole("link", { name: /Search indeed/i });
    expect(indeedAnchor).toBeInTheDocument();
    expect(indeedAnchor).toHaveAttribute("href", "https://ca.indeed.com/");

    const glassdoorAnchor = screen.getByRole("link", {
      name: /Search glassdoor/i,
    });
    expect(glassdoorAnchor).toBeInTheDocument();
    expect(glassdoorAnchor).toHaveAttribute(
      "href",
      "https://www.glassdoor.ca/",
    );

    // All providers still render
    expect(screen.getAllByRole("link")).toHaveLength(11);
  });

  it("displays provider logos with correct alt texts", () => {
    render(<JobBoards />);

    // Check a few specific logos (alt text comes from `${provider.name} logo`)
    expect(screen.getByAltText("indeed logo")).toBeInTheDocument();
    expect(screen.getByAltText("LinkedIn logo")).toBeInTheDocument();
    expect(screen.getByAltText("Google logo")).toBeInTheDocument();
  });

  it("opens links in new tab with noopener noreferrer", () => {
    render(<JobBoards />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});

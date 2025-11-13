/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/breadcrumbs.test.tsx
 *
 * Tests for the Breadcrumbs client component
 *
 * - Mocks usePathname to simulate different route contexts
 * - Verifies all links are rendered
 * - Checks that the active link gets larger text + bold styling
 * - Ensures inactive links are smaller
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// Mock Next.js navigation hooks
const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

// Import after mocks
import Breadcrumbs from "../Breadcrumbs";

describe("Breadcrumbs (client)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const breadcrumbLinks = [
    { href: "/dashboard/applications", label: "Applications" },
    { href: "/dashboard/companies", label: "Companies" },
    { href: "/dashboard/certifications", label: "Certifications" },
    { href: "/dashboard/education", label: "Education" },
    { href: "/dashboard/organizations", label: "Organizations" },
    { href: "/dashboard/skills", label: "Skills" },
  ];

  it("renders all breadcrumb links", () => {
    mockUsePathname.mockReturnValue("/dashboard/applications");
    render(<Breadcrumbs />);

    breadcrumbLinks.forEach(({ href, label }) => {
      const link = screen.getByRole("link", { name: label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });

  it("applies active styles to the current page link", () => {
    const activePath = "/dashboard/companies";
    mockUsePathname.mockReturnValue(activePath);
    render(<Breadcrumbs />);

    // Active link should have large text and bold
    const activeLink = screen.getByRole("link", { name: "Companies" });
    expect(activeLink).toHaveClass("text-[2rem]", "font-bold");

    // Inactive links should have small text
    const inactiveLabels = breadcrumbLinks
      .filter(({ href }) => href !== activePath)
      .map(({ label }) => label);

    inactiveLabels.forEach((label) => {
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveClass("text-[0.9rem]");
      expect(link).not.toHaveClass("text-[2rem]", "font-bold");
    });
  });

  it("applies inactive styles when no link is active", () => {
    mockUsePathname.mockReturnValue("/some-other-page");
    render(<Breadcrumbs />);

    breadcrumbLinks.forEach(({ label }) => {
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveClass("text-[0.9rem]");
      expect(link).not.toHaveClass("text-[2rem]", "font-bold");
    });
  });

  it("includes separator divs between links", () => {
    mockUsePathname.mockReturnValue("/");
    const { container } = render(<Breadcrumbs />);

    // Count separators (one less than number of links)
    const separators = container.querySelectorAll("div.px-1");
    expect(separators).toHaveLength(breadcrumbLinks.length - 1);

    separators.forEach((sep) => {
      expect(sep).toHaveTextContent("|");
    });
  });
});

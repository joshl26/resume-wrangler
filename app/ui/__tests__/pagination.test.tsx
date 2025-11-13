/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/pagination.test.tsx
 *
 * Unit tests for the Pagination component.
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// Mock next/link to a simple anchor so we can assert href/className easily
jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({ href, className, children }: any) => (
      <a href={href} className={className}>
        {children}
      </a>
    ),
  };
});

// Mock generatePagination so tests can control which pages are rendered
jest.mock("@/app/lib/utils", () => ({
  generatePagination: jest.fn(),
}));

// Mock next/navigation so tests can change pathname/search params per test
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Import after mocks
import Pagination from "../pagination";
import { generatePagination } from "@/app/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

const mockedGeneratePagination = generatePagination as jest.MockedFunction<
  typeof generatePagination
>;
const mockedUsePathname = usePathname as jest.Mock;
const mockedUseSearchParams = useSearchParams as jest.Mock;

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders page numbers and marks the active page as a non-link with active classes", () => {
    // currentPage = 2
    mockedUsePathname.mockReturnValue("/items");
    mockedUseSearchParams.mockReturnValue(new URLSearchParams("page=2"));
    // return pages 1..5
    mockedGeneratePagination.mockReturnValue([1, 2, 3, 4, 5]);

    render(<Pagination totalPages={5} totalCount={50} />);

    // Active page (2) should be a DIV and have the active classes (z-10 and text-white)
    const activeEl = screen.getByText("2");
    expect(activeEl.tagName).toBe("DIV");
    expect(activeEl).toHaveClass("z-10");
    expect(activeEl).toHaveClass("text-white");

    // A non-active page (3) should be rendered as a link with correct href
    const page3Link = screen.getByRole("link", { name: "3" });
    expect(page3Link).toBeInTheDocument();
    expect(page3Link).toHaveAttribute("href", "/items?page=3");

    // Verify previous and next arrow links exist by href
    // Previous arrow (link to page 1)
    expect(
      document.querySelector('a[href="/items?page=1"]'),
    ).toBeInTheDocument();
    // Next arrow (link to page 3)
    expect(
      document.querySelector('a[href="/items?page=3"]'),
    ).toBeInTheDocument();

    // Also assert the first and last page links exist
    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute(
      "href",
      "/items?page=1",
    );
    expect(screen.getByRole("link", { name: "5" })).toHaveAttribute(
      "href",
      "/items?page=5",
    );
  });

  it("disables left arrow when on first page and disables right arrow on last page", () => {
    // First page scenario: currentPage = 1
    mockedUsePathname.mockReturnValue("/list");
    mockedUseSearchParams.mockReturnValue(new URLSearchParams("page=1"));
    mockedGeneratePagination.mockReturnValue([1, 2, 3]);

    const { rerender } = render(<Pagination totalPages={3} totalCount={30} />);

    // Left arrow should be rendered as a non-link (div) and have disabled styling (pointer-events-none)
    const disabledArrows = document.querySelectorAll(".pointer-events-none");
    expect(disabledArrows.length).toBeGreaterThanOrEqual(1);

    // Right arrow (link to page 2) should exist
    expect(
      document.querySelector('a[href="/list?page=2"]') ||
        document.querySelector('a[href*="page=2"]'),
    ).toBeTruthy();

    // Now last page scenario: currentPage = totalPages
    mockedUseSearchParams.mockReturnValue(new URLSearchParams("page=3"));
    mockedGeneratePagination.mockReturnValue([1, 2, 3]);

    rerender(<Pagination totalPages={3} totalCount={30} />);

    // Now right arrow should be disabled (pointer-events-none)
    const disabledAfter = document.querySelectorAll(".pointer-events-none");
    expect(disabledAfter.length).toBeGreaterThanOrEqual(1);
  });

  it("renders ellipsis ('...') as a non-link with middle/disabled styling", () => {
    mockedUsePathname.mockReturnValue("/big-list");
    mockedUseSearchParams.mockReturnValue(new URLSearchParams("page=10"));
    // Return a pagination containing an ellipsis
    mockedGeneratePagination.mockReturnValue([1, "...", 10, 11, "...", 20]);

    render(<Pagination totalPages={20} totalCount={400} />);

    // Ellipsis elements should be present and rendered as DIV (non-links)
    const ellipsisEls = screen.getAllByText("...");
    expect(ellipsisEls.length).toBeGreaterThanOrEqual(1);
    for (const el of ellipsisEls) {
      expect(el.tagName).toBe("DIV");
      // middle position uses text-gray-300
      expect(el).toHaveClass("text-gray-300");
    }
  });

  it("preserves other query params when building page hrefs", () => {
    // pathname and search params include another query param
    mockedUsePathname.mockReturnValue("/search");
    mockedUseSearchParams.mockReturnValue(new URLSearchParams("q=term&page=4"));
    mockedGeneratePagination.mockReturnValue([3, 4, 5]);

    render(<Pagination totalPages={10} totalCount={100} />);

    // Page 5 link should preserve q=term and set page=5
    const page5Link = screen.getByRole("link", { name: "5" });
    expect(page5Link).toHaveAttribute("href", "/search?q=term&page=5");
  });
});

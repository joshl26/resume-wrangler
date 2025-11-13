/**
 * @jest-environment node
 *
 * app/blog/__tests__/page.test.tsx
 *
 * Tests for the server component app/blog/page.tsx
 *
 * - Mocks data fetching (getBlogPosts) so tests don't hit real data.
 * - Mocks next/link so server rendering produces predictable <a href> output.
 * - Mocks Landing, BackButton, ViewCounter and ViewsSkeleton to keep output deterministic.
 * - Calls the async page function, renders the returned element to static HTML,
 *   and asserts on the produced HTML string.
 */

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// --- Mocks ---
// Mock next/link to render a plain anchor for server-side rendering assertions
jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({
      href,
      children,
    }: {
      href: string;
      children: React.ReactNode;
    }) => React.createElement("a", { href }, children),
  };
});

// Mock Landing to render a wrapper with a test id so we can assert it's used
jest.mock("@/app/landing/page", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) =>
      React.createElement("div", { "data-testid": "mock-landing" }, children),
  };
});

// Mock BackButton to render its children inside a known element
jest.mock("@/app/ui/back-button", () => {
  return {
    __esModule: true,
    default: ({
      children,
      href,
    }: {
      children: React.ReactNode;
      href?: string;
    }) =>
      React.createElement("a", { "data-testid": "mock-back", href }, children),
  };
});

// Mock client ViewCounter to a simple span (we won't actually hydrate it in tests)
jest.mock("../view-counter", () => {
  return {
    __esModule: true,
    default: ({ allViews, slug }: { allViews?: number; slug?: string }) =>
      React.createElement(
        "span",
        { "data-testid": `mock-viewcounter-${slug}` },
        String(allViews ?? ""),
      ),
  };
});

// Mock the ViewsSkeleton used as Suspense fallback
jest.mock("@/app/ui/skeletons", () => {
  return {
    __esModule: true,
    ViewsSkeleton: () =>
      React.createElement(
        "div",
        { "data-testid": "views-skeleton" },
        "loading-views",
      ),
  };
});

// Mock the blog data fetcher
jest.mock("@/app/lib/blog/blog", () => ({
  __esModule: true,
  getBlogPosts: jest.fn(),
}));

// Also mock queries (Views' dynamic import) in case Views executes during render
jest.mock("@/app/lib/blog/queries", () => ({
  __esModule: true,
  getViewsCount: jest.fn().mockResolvedValue(123),
}));

// Now import the page (after mocks)
import BlogPage, { metadata } from "../page";
import { getBlogPosts } from "@/app/lib/blog/blog";

describe("BlogPage (server)", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("renders blog page with posts, BackButton and Landing wrapper", async () => {
    // Provide sample posts
    (getBlogPosts as jest.Mock).mockResolvedValueOnce([
      {
        slug: "post-one",
        metadata: { title: "First Post", publishedAt: "2023-01-02" },
      },
      {
        slug: "post-two",
        metadata: { title: "Second Post", publishedAt: "2023-01-01" },
      },
    ]);

    // Call the async server component to get the element tree
    const element = await BlogPage();
    const html = renderToStaticMarkup(element);

    // Ensure Landing wrapper was used (mock outputs a div with data-testid)
    expect(html).toContain('data-testid="mock-landing"');

    // Titles should be present
    expect(html).toContain("First Post");
    expect(html).toContain("Second Post");

    // Links should point to expected slugs
    expect(html).toContain('href="/blog/post-one"');
    expect(html).toContain('href="/blog/post-two"');

    // BackButton rendered
    expect(html).toContain('data-testid="mock-back"');

    // Suspense fallback for views should be present (we mocked ViewsSkeleton)
    expect(html).toContain('data-testid="views-skeleton"');

    // Metadata export should be present and have expected fields
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe("Blog");
    expect(metadata.description).toMatch(/Stay up to date/);
  });

  it("sorts posts by publishedAt descending", async () => {
    (getBlogPosts as jest.Mock).mockResolvedValueOnce([
      {
        slug: "older",
        metadata: { title: "Older Post", publishedAt: "2020-01-01" },
      },
      {
        slug: "newer",
        metadata: { title: "Newer Post", publishedAt: "2024-01-01" },
      },
      {
        slug: "middle",
        metadata: { title: "Middle Post", publishedAt: "2022-06-01" },
      },
    ]);

    const element = await BlogPage();
    const html = renderToStaticMarkup(element);

    // Check that "Newer Post" appears before "Middle Post" and "Older Post"
    const newerIndex = html.indexOf("Newer Post");
    const middleIndex = html.indexOf("Middle Post");
    const olderIndex = html.indexOf("Older Post");

    expect(newerIndex).toBeGreaterThan(-1);
    expect(middleIndex).toBeGreaterThan(-1);
    expect(olderIndex).toBeGreaterThan(-1);

    expect(newerIndex).toBeLessThan(middleIndex);
    expect(middleIndex).toBeLessThan(olderIndex);
  });

  it("handles empty posts gracefully", async () => {
    (getBlogPosts as jest.Mock).mockResolvedValueOnce([]);

    const element = await BlogPage();
    const html = renderToStaticMarkup(element);

    // Page still renders Landing and header text
    expect(html).toContain('data-testid="mock-landing"');
    expect(html).toContain("Resume Wrangler Blog");
  });
});

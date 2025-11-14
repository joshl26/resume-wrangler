/**
 * @jest-environment node
 *
 * app/blog/[slug]/__tests__/page.test.tsx
 *
 * Adjusted tests: do not expect async nested Views to resolve during a static render.
 */

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// --- Mocks ---
const mockNotFound = jest.fn();
jest.mock("next/navigation", () => ({
  notFound: mockNotFound,
}));

jest.mock("next/cache", () => ({
  unstable_noStore: jest.fn(),
}));

jest.mock("@/app/landing/page", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "mock-landing" }, children),
}));

jest.mock("@/app/ui/back-button", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href?: string }) =>
    React.createElement("a", { "data-testid": "mock-back", href }, children),
}));

jest.mock("../../view-counter", () => ({
  __esModule: true,
  default: ({
    allViews,
    slug,
    className,
  }: {
    allViews?: any[];
    slug?: string;
    className?: string;
  }) =>
    React.createElement(
      "span",
      { "data-testid": `mock-viewcounter-${slug}`, className },
      String(allViews?.find((v: any) => v.slug === slug)?.count ?? ""),
    ),
}));

jest.mock("@/app/ui/blog/mdx", () => ({
  __esModule: true,
  CustomMDX: ({ source }: { source: string }) =>
    React.createElement("div", { "data-testid": "mock-mdx" }, source),
}));

jest.mock("@/app/lib/blog/blog", () => ({
  __esModule: true,
  getBlogPosts: jest.fn(),
}));

jest.mock("@/app/lib/blog/queries", () => ({
  __esModule: true,
  getViewsCount: jest.fn(),
}));

jest.mock("@/app/lib/blog/actions", () => ({
  __esModule: true,
  increment: jest.fn(),
}));

// Imports after mocks
import BlogPage, { generateMetadata } from "../page";
import { getBlogPosts } from "@/app/lib/blog/blog";
import { getViewsCount } from "@/app/lib/blog/queries";
import { increment } from "@/app/lib/blog/actions";

describe("Blog Post Page (server)", () => {
  const originalEnv = process.env;
  const mockParams = { slug: "test-post" };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.APP_DEPLOYMENT_URL = "https://example.com";
    process.env.DEPLOYMENT_URL = "https://example.com";
    // Make notFound throw so we can assert it was called when needed
    mockNotFound.mockImplementation(() => {
      throw new Error("NOT_FOUND");
    });
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("renders blog post page with content, BackButton and Landing wrapper (Shows Views fallback)", async () => {
    (getBlogPosts as jest.Mock).mockReturnValue([
      {
        slug: "test-post",
        metadata: {
          title: "Test Post Title",
          publishedAt: "2023-01-01",
          summary: "Test summary",
          image: "/test-image.jpg",
        },
        content: "Test post content",
      },
    ]);

    (getViewsCount as jest.Mock).mockResolvedValue([
      { slug: "test-post", count: 42 },
    ]);

    const element = await BlogPage({ params: mockParams });
    const html = renderToStaticMarkup(element);

    expect(html).toContain('data-testid="mock-landing"');
    expect(html).toContain("Test Post Title");
    expect(html).toContain('data-testid="mock-back"');
    expect(html).toContain('href="/blog"');
    expect(html).toMatch(/January 1, 2023/);

    // Suspense fallback for Views present during static render
    expect(html).toContain('class="h-5"');

    expect(html).toContain('data-testid="mock-mdx"');
    expect(html).toContain("Test post content");

    // Views may suspend during static render so increment should not have been called here
    expect(increment).not.toHaveBeenCalled();
  });

  it("calls notFound when post is not found", () => {
    (getBlogPosts as jest.Mock).mockReturnValue([]);

    // Blog throws synchronously (not a Promise), so assert synchronous throw
    expect(() => BlogPage({ params: { slug: "non-existent" } })).toThrow(
      "NOT_FOUND",
    );
    expect(mockNotFound).toHaveBeenCalled();
  });

  it("generates correct metadata for post with image", async () => {
    (getBlogPosts as jest.Mock).mockReturnValue([
      {
        slug: "seo-post",
        metadata: {
          title: "SEO Test Post",
          publishedAt: "2023-06-15T10:00:00Z",
          summary: "SEO summary",
          image: "/seo-image.jpg",
        },
        content: "SEO content",
      },
    ]);

    const md = await generateMetadata({ params: { slug: "seo-post" } });

    expect(md).toEqual({
      title: "SEO Test Post",
      description: "SEO summary",
      openGraph: {
        title: "SEO Test Post",
        description: "SEO summary",
        type: "article",
        publishedTime: "2023-06-15T10:00:00Z",
        url: "https://example.com/blog/seo-post",
        images: [{ url: "https://example.com/seo-image.jpg" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "SEO Test Post",
        description: "SEO summary",
        images: ["https://example.com/seo-image.jpg"],
      },
    });
  });

  it("generates correct metadata for post without image (uses OG generator)", async () => {
    (getBlogPosts as jest.Mock).mockReturnValue([
      {
        slug: "seo-no-image-post",
        metadata: {
          title: "SEO No Image Post",
          publishedAt: "2023-06-15T10:00:00Z",
          summary: "SEO summary no image",
          image: undefined,
        },
        content: "SEO content no image",
      },
    ]);

    const md = await generateMetadata({
      params: { slug: "seo-no-image-post" },
    });

    expect(md).toEqual({
      title: "SEO No Image Post",
      description: "SEO summary no image",
      openGraph: {
        title: "SEO No Image Post",
        description: "SEO summary no image",
        type: "article",
        publishedTime: "2023-06-15T10:00:00Z",
        url: "https://example.com/blog/seo-no-image-post",
        images: [{ url: "https://example.com/og?title=SEO No Image Post" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "SEO No Image Post",
        description: "SEO summary no image",
        images: ["https://example.com/og?title=SEO No Image Post"],
      },
    });
  });

  it("returns undefined metadata when post is not found", async () => {
    (getBlogPosts as jest.Mock).mockReturnValue([]);

    const md = await generateMetadata({ params: { slug: "missing-post" } });

    expect(md).toBeUndefined();
  });
});

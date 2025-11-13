/**
 * @jest-environment node
 *
 * app/lib/__tests__/blog.test.ts
 *
 * Tests for blog post utilities: frontmatter parsing, MDX file handling, tweet extraction
 */

import fs from "fs";
import path from "path";
import {
  getBlogPosts,
  // Private functions we'll test indirectly through public API
} from "@/app/lib/blog/blog";

// Mock filesystem
jest.mock("fs");

// Fixed mock typing to resolve TypeScript errors
const mockFs: jest.Mocked<typeof fs> = fs as any;

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

// Sample MDX content for testing
const samplePost1 = `---
title: "My First Post"
publishedAt: "2023-01-01"
summary: "This is my first blog post"
image: "/images/first-post.jpg"
---

# Hello World

This is the content of my first post.

<StaticTweet id="123456789" />

More content here.
`;

const samplePost2 = `---
title: "Second Post"
publishedAt: "2023-02-01"
summary: "Another great post"
---

Just some content without an image.

<StaticTweet id="987654321" />
<StaticTweet id="456789123" />
`;

const postWithoutFrontmatter = `# No Frontmatter

Just content without any frontmatter section.

<StaticTweet id="111222333" />
`;

const postWithMalformedFrontmatter = `---
title: "Malformed
publishedAt: "2023-03-01"
summary: "This has broken frontmatter"
---

Content with malformed frontmatter.
`;

describe("Blog Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getBlogPosts", () => {
    it("should return blog posts with parsed metadata and tweet IDs", () => {
      // Mock filesystem
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue([
        "first-post.mdx",
        "second-post.mdx",
        "no-frontmatter.mdx",
        "not-mdx.txt", // Should be ignored
      ] as any);

      mockFs.readFileSync
        .mockReturnValueOnce(samplePost1)
        .mockReturnValueOnce(samplePost2)
        .mockReturnValueOnce(postWithoutFrontmatter);

      const posts = getBlogPosts();

      expect(posts).toHaveLength(3);

      // Check first post
      expect(posts[0]!).toEqual({
        metadata: {
          title: "My First Post",
          publishedAt: "2023-01-01",
          summary: "This is my first blog post",
          image: "/images/first-post.jpg",
        },
        slug: "first-post",
        tweetIds: ["123456789"],
        content: expect.stringContaining("# Hello World"),
      });

      // Check second post
      expect(posts[1]!).toEqual({
        metadata: {
          title: "Second Post",
          publishedAt: "2023-02-01",
          summary: "Another great post",
          image: undefined,
        },
        slug: "second-post",
        tweetIds: ["987654321", "456789123"],
        content: expect.stringContaining("Just some content"),
      });

      // Check post without frontmatter
      expect(posts[2]!).toEqual({
        metadata: {
          title: "",
          publishedAt: "",
          summary: "",
          image: undefined,
        },
        slug: "no-frontmatter",
        tweetIds: ["111222333"],
        content: expect.stringContaining("# No Frontmatter"),
      });
    });

    it("should handle directory that doesn't exist", () => {
      mockFs.existsSync.mockReturnValue(false);

      const posts = getBlogPosts();

      expect(posts).toEqual([]);
      expect(mockFs.readdirSync).not.toHaveBeenCalled();
    });

    it("should handle empty directory", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue([] as any);

      const posts = getBlogPosts();

      expect(posts).toEqual([]);
    });

    it("should only process .mdx/.md files (case-insensitive)", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue([
        "post1.mdx",
        "post2.md", // processed (.md is valid)
        "post3.txt", // ignored
        "post4.MDX", // processed (case-insensitive)
        "README.md", // processed
      ] as any);

      mockFs.readFileSync.mockReturnValue(samplePost1);

      const posts = getBlogPosts();

      // Should process 4 files (.mdx, .md, .MDX, README.md)
      expect(posts).toHaveLength(4);
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(4);
    });

    it("should handle malformed frontmatter gracefully", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(["malformed.mdx"] as any);
      mockFs.readFileSync.mockReturnValue(postWithMalformedFrontmatter);

      const posts = getBlogPosts();

      expect(posts).toHaveLength(1);
      // Should have default metadata for malformed frontmatter
      expect(posts[0]!.metadata).toEqual({
        title: "",
        publishedAt: "",
        summary: "",
        image: undefined,
      });
    });

    it("should extract tweet IDs correctly", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(["tweets.mdx"] as any);

      const contentWithTweets = `---
title: "Tweets Post"
publishedAt: "2023-01-01"
summary: "Post with tweets"
---

Content with various tweet formats:

<StaticTweet id="123456789" />
<StaticTweet id='987654321' />
<StaticTweet id="456789123"/>
<StaticTweet id="789456123" ></StaticTweet>

Not a tweet: <div id="123" />
`;

      mockFs.readFileSync.mockReturnValue(contentWithTweets);

      const posts = getBlogPosts();

      expect(posts).toHaveLength(1);
      expect(posts[0]!.tweetIds).toEqual([
        "123456789",
        "987654321",
        "456789123",
        "789456123",
      ]);
    });

    it("should handle posts with no tweets", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(["no-tweets.mdx"] as any);

      const contentWithoutTweets = `---
title: "No Tweets"
publishedAt: "2023-01-01"
summary: "Post without tweets"
---

Just regular content without any tweets.
`;

      mockFs.readFileSync.mockReturnValue(contentWithoutTweets);

      const posts = getBlogPosts();

      expect(posts).toHaveLength(1);
      expect(posts[0]!.tweetIds).toEqual([]);
    });

    it("should handle frontmatter with quoted values", () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(["quoted.mdx"] as any);

      const contentWithQuotes = `---
title: "Quoted Title"
publishedAt: '2023-01-01'
summary: "Summary with \\"quotes\\""
image: '/images/test.jpg'
---

Content here.
`;

      mockFs.readFileSync.mockReturnValue(contentWithQuotes);

      const posts = getBlogPosts();

      expect(posts).toHaveLength(1);
      expect(posts[0]!.metadata).toEqual({
        title: "Quoted Title",
        publishedAt: "2023-01-01",
        summary: 'Summary with "quotes"',
        image: "/images/test.jpg",
      });
    });
  });
});

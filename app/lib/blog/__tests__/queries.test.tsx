/**
 * @jest-environment node
 *
 * app/lib/blog/__tests__/queries.test.ts
 *
 * Tests for getBlogViews and getViewsCount
 */

import { jest } from "@jest/globals";

// For Jest < v29, cast the mock to give it a known function signature
const mockQuery = jest.fn() as jest.Mock<any>;

// Mock the database module (adjust path if your queries import a different module)
jest.mock("@/app/lib/database", () => ({
  conn: {
    query: mockQuery,
  },
}));

// Import after mock installation
import { getBlogViews, getViewsCount } from "@/app/lib/blog/queries";

const originalConsoleError = console.error;
const originalEnv = process.env;

describe("app/lib/blog/queries", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    console.error = jest.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    console.error = originalConsoleError;
  });

  describe("getBlogViews", () => {
    it("returns 0 when POSTGRES_DB_HOST is not set", async () => {
      delete process.env.POSTGRES_DB_HOST;
      const result = await getBlogViews();
      expect(result).toBe(0);
      expect(mockQuery).not.toHaveBeenCalled();
    });

    it("returns total view count from database (sums string counts)", async () => {
      process.env.POSTGRES_DB_HOST = "localhost";
      mockQuery.mockResolvedValueOnce({
        rows: [{ count: "10" }, { count: "25" }],
      });

      const result = await getBlogViews();
      expect(result).toBe(35); // 10 + 25
      expect(mockQuery).toHaveBeenCalledWith("SELECT count FROM views");
    });

    it("returns 0 and logs error when query fails", async () => {
      process.env.POSTGRES_DB_HOST = "localhost";
      const error = new Error("DB connection failed");
      mockQuery.mockRejectedValueOnce(error);

      const result = await getBlogViews();
      expect(result).toBe(0);
      expect(console.error).toHaveBeenCalledWith("Database Error:", error);
    });

    it("handles rows with null/undefined count gracefully", async () => {
      process.env.POSTGRES_DB_HOST = "localhost";
      mockQuery.mockResolvedValueOnce({
        rows: [{ count: "5" }, { count: null }, { count: undefined }],
      });

      const result = await getBlogViews();
      expect(result).toBe(5); // 5 + 0 + 0
    });
  });

  describe("getViewsCount", () => {
    it("returns empty array when POSTGRES_DB_HOST is not set", async () => {
      delete process.env.POSTGRES_DB_HOST;
      const result = await getViewsCount();
      expect(result).toEqual([]);
      expect(mockQuery).not.toHaveBeenCalled();
    });

    it("returns view counts by slug from database", async () => {
      process.env.POSTGRES_DB_HOST = "localhost";
      mockQuery.mockResolvedValueOnce({
        rows: [
          { slug: "post-1", count: "100" },
          { slug: "post-2", count: "250" },
        ],
      });

      const result = await getViewsCount();
      expect(result).toEqual([
        { slug: "post-1", count: 100 },
        { slug: "post-2", count: 250 },
      ]);
      expect(mockQuery).toHaveBeenCalledWith("SELECT slug, count FROM views");
    });

    it("returns empty array and logs error when query fails", async () => {
      process.env.POSTGRES_DB_HOST = "localhost";
      const error = new Error("DB query error");
      mockQuery.mockRejectedValueOnce(error);

      const result = await getViewsCount();
      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalledWith("Database Error:", error);
    });

    it("handles rows with null/undefined values gracefully", async () => {
      process.env.POSTGRES_DB_HOST = "localhost";
      mockQuery.mockResolvedValueOnce({
        rows: [
          { slug: "post-a", count: "50" },
          { slug: null, count: "100" },
          { slug: "post-c", count: null },
          { slug: undefined, count: undefined },
        ],
      });

      const result = await getViewsCount();
      expect(result).toEqual([
        { slug: "post-a", count: 50 },
        { slug: "null", count: 100 },
        { slug: "post-c", count: 0 },
        { slug: "undefined", count: 0 },
      ]);
    });
  });
});

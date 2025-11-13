/**
 * @jest-environment node
 *
 * app/lib/blog/__tests__/actions.test.tsx
 *
 * Tests for server actions: increment, saveGuestbookEntry, deleteGuestbookEntries
 */

import { increment, saveGuestbookEntry, deleteGuestbookEntries } from "@/app/lib/blog/actions";
import { auth } from "@/auth";
import { conn } from "@/app/lib/database";
import { revalidatePath } from "next/cache";

// Mock external dependencies
jest.mock("@/auth", () => ({
  auth: jest.fn()
}));

jest.mock("@/app/lib/database", () => ({
  conn: {
    query: jest.fn()
  }
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
  unstable_noStore: jest.fn()
}));

// Type assertions for mocks - fixed TypeScript errors
const mockAuth = auth as unknown as jest.Mock;
const mockQuery = conn.query as unknown as jest.Mock;
const mockRevalidatePath = revalidatePath as unknown as jest.Mock;

describe("increment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should insert new view count when slug doesn't exist", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [], rowCount: 1 } as any);

    await increment("test-slug");

    expect(mockQuery).toHaveBeenCalledWith(
      `INSERT INTO views (slug, count) VALUES ('test-slug', 1) ON CONFLICT (slug) DO UPDATE SET count = views.count + 1`
    );
  });

  it("should increment existing view count", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [], rowCount: 1 } as any);

    await increment("existing-slug");

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("ON CONFLICT (slug) DO UPDATE SET count = views.count + 1")
    );
  });

  it("should handle database errors gracefully", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Database error"));

    // Should not throw - function catches errors
    await expect(increment("error-slug")).resolves.toBeUndefined();
    expect(mockQuery).toHaveBeenCalled();
  });
});

describe("saveGuestbookEntry", () => {
  const mockFormData = new FormData();
  mockFormData.append("entry", "Test guestbook message");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save guestbook entry for authenticated user", async () => {
    mockAuth.mockResolvedValueOnce({
      user: {
        email: "user@example.com",
        name: "Test User"
      },
      expires: "2025-01-01"
    } as any);

    mockQuery.mockResolvedValueOnce({ rows: [], rowCount: 1 } as any);

    await saveGuestbookEntry(mockFormData);

    expect(mockAuth).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO guestbook")
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("user@example.com")
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("Test User")
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("Test guestbook message")
    );
    expect(mockRevalidatePath).toHaveBeenCalledWith("/guestbook");
  });

  it("should throw error when user is not authenticated", async () => {
    mockAuth.mockResolvedValueOnce(null);

    await expect(saveGuestbookEntry(mockFormData)).rejects.toThrow("Unauthorized");
  });

  it("should throw error when user data is missing", async () => {
    mockAuth.mockResolvedValueOnce({
      user: undefined,
      expires: "2025-01-01"
    } as any);

    await expect(saveGuestbookEntry(mockFormData)).rejects.toThrow("Unauthorized");
  });

  it("should truncate long messages to 500 characters", async () => {
    const longMessage = "a".repeat(600);
    const truncatedMessage = "a".repeat(500);
    
    mockFormData.set("entry", longMessage);
    
    mockAuth.mockResolvedValueOnce({
      user: {
        email: "user@example.com",
        name: "Test User"
      },
      expires: "2025-01-01"
    } as any);

    mockQuery.mockResolvedValueOnce({ rows: [], rowCount: 1 } as any);

    await saveGuestbookEntry(mockFormData);

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining(truncatedMessage)
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expect.not.stringContaining(longMessage)
    );
  });

  it("should handle database errors gracefully", async () => {
    mockAuth.mockResolvedValueOnce({
      user: {
        email: "user@example.com",
        name: "Test User"
      },
      expires: "2025-01-01"
    } as any);

    mockQuery.mockRejectedValueOnce(new Error("Database error"));

    // Should not throw - function catches errors
    await expect(saveGuestbookEntry(mockFormData)).resolves.toBeUndefined();
    expect(mockRevalidatePath).not.toHaveBeenCalled(); // Should not revalidate on error
  });
});

describe("deleteGuestbookEntries", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete entries for admin user", async () => {
    mockAuth.mockResolvedValueOnce({
      user: {
        email: "joshlehman.dev@gmail.com"
      },
      expires: "2025-01-01"
    } as any);

    mockQuery.mockResolvedValueOnce({ rows: [], rowCount: 2 } as any);

    await deleteGuestbookEntries(["1", "2"]);

    expect(mockAuth).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("DELETE FROM guestbook WHERE id = ANY")
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("{1,2}")
    );
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/guestbook");
  });

  it("should throw error when user is not admin", async () => {
    mockAuth.mockResolvedValueOnce({
      user: {
        email: "user@example.com"
      },
      expires: "2025-01-01"
    } as any);

    await expect(deleteGuestbookEntries(["1", "2"])).rejects.toThrow("Unauthorized");
  });

  it("should throw error when user is not authenticated", async () => {
    mockAuth.mockResolvedValueOnce(null);

    await expect(deleteGuestbookEntries(["1", "2"])).rejects.toThrow("Unauthorized");
  });

  it("should handle empty entry list", async () => {
    mockAuth.mockResolvedValueOnce({
      user: {
        email: "joshlehman.dev@gmail.com"
      },
      expires: "2025-01-01"
    } as any);

    mockQuery.mockResolvedValueOnce({ rows: [], rowCount: 0 } as any);

    await deleteGuestbookEntries([]);

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("DELETE FROM guestbook WHERE id = ANY('{}'::int[])")
    );
  });

  it("should handle database errors gracefully", async () => {
    mockAuth.mockResolvedValueOnce({
      user: {
        email: "joshlehman.dev@gmail.com"
      },
      expires: "2025-01-01"
    } as any);

    mockQuery.mockRejectedValueOnce(new Error("Database error"));

    // Should not throw - function catches errors
    await expect(deleteGuestbookEntries(["1", "2"])).resolves.toBeUndefined();
    expect(mockRevalidatePath).not.toHaveBeenCalled(); // Should not revalidate on error
  });
});
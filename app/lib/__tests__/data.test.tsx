/**
 * __tests__/data.test.ts
 *
 * Unit tests for app/lib/data.ts (server-side data helpers).
 *
 * Notes:
 * - Mocks conn.query to avoid hitting a real database.
 * - Mocks next/cache unstable_noStore so calls to noStore() are no-ops.
 * - Adjust import paths if your tsconfig path aliases differ.
 */

import { jest } from "@jest/globals";

// Mock next/cache noStore so functions invoking it won't error
jest.mock("next/cache", () => ({
  unstable_noStore: jest.fn(),
}));

// Mock the database connection used by the module
jest.mock("@/app/lib/database", () => ({
  conn: {
    query: jest.fn(),
  },
}));

// Import the thing under test after mocking
import * as data from "@/app/lib/data";
import { conn } from "@/app/lib/database";
import { ITEMS_PER_PAGE } from "@/app/lib/constants"; // adjust if constant path differs
import { ResumeTemplates } from "../definitions";

type QueryFn = (sql: string, params?: any[]) => Promise<any>;
const connQueryMock = conn.query as unknown as jest.MockedFunction<QueryFn>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("app/lib/data", () => {
  describe("getUser", () => {
    it("returns the first user row when found", async () => {
      connQueryMock.mockResolvedValueOnce({
        rows: [{ id: "user-1", email: "test@example.com", name: "Test" }],
      } as any);

      const user = await data.getUser("test@example.com");

      expect(user).toBeDefined();
      expect(user.email).toBe("test@example.com");
      expect(connQueryMock).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM users WHERE email = $1"),
        ["test@example.com"],
      );
    });

    it("throws when the query fails", async () => {
      connQueryMock.mockRejectedValueOnce(new Error("DB down"));

      await expect(data.getUser("someone@example.com")).rejects.toThrow(
        /Failed to fetch user/i,
      );
    });
  });

  describe("fetchResumeTemplates", () => {
    it("returns an array of templates", async () => {
      connQueryMock.mockResolvedValueOnce({
        rows: [{ id: "t1", name: "Simple", active: "true" }],
      } as any);

      const templates = (await data.fetchResumeTemplates()) ?? [];
      expect(Array.isArray(templates)).toBe(true);
      expect(templates).toHaveLength(1);
      expect(templates[0]!.id).toBe("t1");
      expect(connQueryMock).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM resume_templates WHERE active"),
      );
    });

    it("returns [] on DB error", async () => {
      connQueryMock.mockRejectedValueOnce(new Error("boom"));
      const templates = await data.fetchResumeTemplates();
      expect(templates).toEqual([]);
    });
  });

  describe("fetchApplicationById", () => {
    it("returns the application row when found", async () => {
      connQueryMock.mockResolvedValueOnce({
        rows: [{ id: "app-1", user_id: "user-1" }],
      } as any);

      const app = await data.fetchApplicationById("app-1");
      expect(app).toBeDefined();
      expect(app?.id).toBe("app-1");
      expect(connQueryMock).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM applications WHERE id = $1"),
        ["app-1"],
      );
    });

    it("returns undefined on DB error", async () => {
      connQueryMock.mockRejectedValueOnce(new Error("fail"));
      const app = await data.fetchApplicationById("app-999");
      expect(app).toBeUndefined();
    });
  });

  describe("fetchFilteredApplications", () => {
    it("calls conn.query with the right values and returns rows", async () => {
      const fakeRows = [
        { id: "app-1", job_position: "Engineer", name: "Acme" },
      ];
      connQueryMock.mockResolvedValueOnce({ rows: fakeRows } as any);

      const result = await data.fetchFilteredApplications(
        "acme",
        1,
        "user-1",
        "all",
      );

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      // Ensure query was invoked with values array containing userId and pattern
      expect(connQueryMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([
          "user-1",
          "%acme%",
          expect.any(Number),
          expect.any(Number),
        ]),
      );
    });

    it("returns [] on DB error", async () => {
      connQueryMock.mockRejectedValueOnce(new Error("bad"));
      const result = await data.fetchFilteredApplications("x", 1, "u", "");
      expect(result).toEqual([]);
    });
  });

  describe("fetchApplicationsPages", () => {
    it("computes pages from count and ITEMS_PER_PAGE", async () => {
      // Mock count as 25 (string or number) -> pages = ceil(25 / ITEMS_PER_PAGE)
      connQueryMock.mockResolvedValueOnce({
        rows: [{ application_count: "25" }],
      } as any);

      const pages = await data.fetchApplicationsPages("q", "user-1", "all");
      const expected = Math.ceil(Number(25) / (ITEMS_PER_PAGE || 10));
      expect(pages).toBe(expected);
      expect(connQueryMock).toHaveBeenCalledWith(expect.any(String), [
        "user-1",
        "%q%",
      ]);
    });

    it("throws on DB error", async () => {
      connQueryMock.mockRejectedValueOnce(new Error("boom"));
      await expect(
        data.fetchApplicationsPages("q", "user-1", ""),
      ).rejects.toThrow(/Failed to fetch total number of applications/i);
    });
  });

  describe("createUser", () => {
    it("inserts and returns the created user", async () => {
      const newUser = {
        id: "u-2",
        email: "new@example.com",
        name: "New",
      };
      connQueryMock.mockResolvedValueOnce({ rows: [newUser] } as any);

      const result = await data.createUser({
        email: "new@example.com",
        name: "New",
        first_name: "First",
        last_name: "Last",
        password: "pw",
      });

      expect(result).toEqual(newUser);
      expect(connQueryMock).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO users"),
        expect.any(Array),
      );
    });

    it("throws on DB error", async () => {
      connQueryMock.mockRejectedValueOnce(new Error("nope"));
      await expect(
        data.createUser({ email: "a@b.com", name: "A" }),
      ).rejects.toThrow(/Failed to create user/i);
    });
  });

  describe("upsertProviderAccount", () => {
    it("calls insert/upsert SQL and returns row", async () => {
      const mockRow = { id: "ua-1", user_id: "user-1", provider: "google" };
      connQueryMock.mockResolvedValueOnce({ rows: [mockRow] } as any);

      const res = await data.upsertProviderAccount({
        userId: "user-1",
        provider: "google",
        providerAccountId: "prov-1",
      });

      expect(res).toEqual(mockRow);
      expect(connQueryMock).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO public.user_accounts"),
        expect.any(Array),
      );
    });

    it("throws on DB error", async () => {
      connQueryMock.mockRejectedValueOnce(new Error("err"));
      await expect(
        data.upsertProviderAccount({
          userId: "u",
          provider: "p",
          providerAccountId: "pid",
        }),
      ).rejects.toThrow(/Failed to upsert provider account/i);
    });
  });
});

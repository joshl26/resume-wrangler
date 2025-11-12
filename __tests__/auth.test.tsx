/**
 * __tests__/auth.test.ts
 *
 * Tests for auth.ts — types fixed so mocked functions accept values (no `never`).
 */

/// <reference types="jest" />

import { jest } from "@jest/globals";

/**
 * Note:
 * - We `require()` the modules after registering mocks so Jest's module mock works.
 * - Mocked functions are explicitly typed as jest.MockedFunction<...> so .mockResolvedValue(...) accepts values.
 */

// 1) Register module mocks BEFORE requiring the module under test
jest.mock("@/app/lib/data", () => ({
  getUser: jest.fn(),
  getUserByEmail: jest.fn(),
  createUser: jest.fn(),
  upsertProviderAccount: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

jest.mock("next-auth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// 2) Now require the module under test
const authModule = require("../auth"); // adjust path if needed
const authOptions: any = authModule.authOptions;
const nextAuthHandler: any = authModule.default;

// 3) Import mocks and cast them to properly-typed jest.MockedFunction signatures
const data = require("@/app/lib/data") as {
  getUser: jest.MockedFunction<(email: string) => Promise<any | null>>;
  getUserByEmail: jest.MockedFunction<(email: string) => Promise<any | null>>;
  createUser: jest.MockedFunction<(payload: any) => Promise<any>>;
  upsertProviderAccount: jest.MockedFunction<(payload: any) => Promise<any>>;
};

const bcrypt = require("bcrypt") as {
  compare: jest.MockedFunction<
    (plain: string, hashed: string) => Promise<boolean>
  >;
};

const NextAuth = require("next-auth").default as jest.MockedFunction<
  (opts?: any) => (req?: any, res?: any) => any
>;

describe("auth.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Credentials provider - authorize", () => {
    const credentialsProvider = (authOptions.providers || []).find(
      (p: any) => p?.id === "credentials" || p?.name === "Credentials",
    ) as any;

    it("returns null when no credentials provided", async () => {
      const authorize = credentialsProvider.options.authorize;
      const res = await authorize(null);
      expect(res).toBeNull();
    });

    it("returns null when credentials fail zod validation (invalid email)", async () => {
      const authorize = credentialsProvider.options.authorize;
      const res = await authorize({ email: "not-an-email", password: "x" });
      expect(res).toBeNull();
    });

    it("returns null when user not found", async () => {
      data.getUser.mockResolvedValue(null);
      const authorize = credentialsProvider.options.authorize;
      const res = await authorize({
        email: "test@example.com",
        password: "pass",
      });
      expect(res).toBeNull();
      expect(data.getUser).toHaveBeenCalledWith("test@example.com");
    });

    it("returns null when password does not match", async () => {
      // typed mocked functions accept object values now
      const dbUser = {
        id: "u1",
        email: "test@example.com",
        password: "hashed",
      };
      data.getUser.mockResolvedValue(dbUser);
      bcrypt.compare.mockResolvedValue(false);

      const authorize = credentialsProvider.options.authorize;
      const res = await authorize({
        email: "test@example.com",
        password: "pass",
      });
      expect(res).toBeNull();
      expect(bcrypt.compare).toHaveBeenCalledWith("pass", "hashed");
    });

    it("returns safe user object when credentials valid", async () => {
      const dbUser = {
        id: "u1",
        email: "test@example.com",
        password: "hashed",
        name: "Tester",
      };
      data.getUser.mockResolvedValue(dbUser);
      bcrypt.compare.mockResolvedValue(true);

      const authorize = credentialsProvider.options.authorize;
      const res = await authorize({
        email: "test@example.com",
        password: "pass",
      });

      expect(res).toEqual({
        id: "u1",
        email: "test@example.com",
        name: "Tester",
      });
      expect(bcrypt.compare).toHaveBeenCalledWith("pass", "hashed");
    });
  });

  describe("Google provider config", () => {
    it("includes a google provider entry", () => {
      const googleProvider = (authOptions.providers || []).find(
        (p: any) => p?.id === "google" || p?.name === "Google",
      );
      expect(googleProvider).toBeDefined();
      const prov: any = googleProvider;
      expect(prov.id || prov.name).toBeDefined();
    });
  });

  describe("callbacks", () => {
    describe("signIn", () => {
      it("returns false when account.provider exists but user.email missing", async () => {
        const res = await authOptions.callbacks.signIn({
          user: {},
          account: { provider: "google" },
          profile: {},
        } as any);
        expect(res).toBe(false);
      });

      it("links existing user and calls upsertProviderAccount", async () => {
        const existing = {
          id: "existing-1",
          email: "ex@example.com",
          name: "Ex",
        };
        data.getUserByEmail.mockResolvedValue(existing);
        data.upsertProviderAccount.mockResolvedValue({});

        const res = await authOptions.callbacks.signIn({
          user: { email: "ex@example.com", name: "Ex" },
          account: {
            provider: "google",
            providerAccountId: "prov-1",
            access_token: "a",
            refresh_token: "r",
            expires_at: Math.floor(Date.now() / 1000) + 1000,
            scope: "s",
            token_type: "t",
            id_token: "id",
          },
          profile: { sub: "prov-1", email: "ex@example.com" },
        } as any);

        expect(res).toBe(true);
        expect(data.getUserByEmail).toHaveBeenCalledWith("ex@example.com");
        expect(data.upsertProviderAccount).toHaveBeenCalledWith(
          expect.objectContaining({
            userId: "existing-1",
            provider: "google",
            providerAccountId: "prov-1",
            profileEmail: "ex@example.com",
          }),
        );
      });

      it("creates new user when none exists and links via upsertProviderAccount", async () => {
        data.getUserByEmail.mockResolvedValue(null);
        data.createUser.mockResolvedValue({
          id: "new-1",
          email: "new@example.com",
        });
        data.upsertProviderAccount.mockResolvedValue({});

        const res = await authOptions.callbacks.signIn({
          user: { email: "new@example.com", name: "New" },
          account: { provider: "google", providerAccountId: "prov-2" },
          profile: { sub: "prov-2", email: "new@example.com" },
        } as any);

        expect(res).toBe(true);
        expect(data.createUser).toHaveBeenCalledWith(
          expect.objectContaining({ email: "new@example.com", name: "New" }),
        );
        expect(data.upsertProviderAccount).toHaveBeenCalledWith(
          expect.objectContaining({
            userId: "new-1",
            provider: "google",
            providerAccountId: "prov-2",
            profileEmail: "new@example.com",
          }),
        );
      });

      it("returns false if an exception occurs", async () => {
        data.getUserByEmail.mockRejectedValue(new Error("db err"));

        const res = await authOptions.callbacks.signIn({
          user: { email: "err@example.com" },
          account: { provider: "google" },
          profile: {},
        } as any);

        expect(res).toBe(false);
      });
    });

    describe("jwt", () => {
      it("attaches userId to token when user exists", async () => {
        data.getUserByEmail.mockResolvedValue({
          id: "uid-1",
          email: "u@example.com",
        });

        const token: any = {};
        const user: any = { email: "u@example.com" };

        const out = await authOptions.callbacks.jwt({ token, user } as any);
        expect((out as any).userId).toBe("uid-1");
        expect(data.getUserByEmail).toHaveBeenCalledWith("u@example.com");
      });

      it("leaves token untouched when no user", async () => {
        const token = { existing: "x" };
        const out = await authOptions.callbacks.jwt({ token } as any);
        expect(out).toEqual(token);
      });
    });

    describe("session", () => {
      it("adds token.userId to session.user.id", async () => {
        const session: any = { user: {} };
        const token: any = { userId: "uid-1" };
        const out = await authOptions.callbacks.session({
          session,
          token,
        } as any);
        expect((out.user as any).id).toBe("uid-1");
      });
    });
  });

  describe("nextAuthHandler", () => {
    it("calls NextAuth with authOptions and calls returned handler with req", () => {
      const inner = jest.fn();
      NextAuth.mockImplementation(() => inner);

      const req = { method: "GET" } as any;
      const result = nextAuthHandler(req);

      expect(NextAuth).toHaveBeenCalledWith(authOptions);
      expect(inner).toHaveBeenCalledWith(req);
      expect(result).toBeUndefined();
    });
  });
});

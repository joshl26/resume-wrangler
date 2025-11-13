/**
 * @jest-environment node
 *
 * app/api/auth/signup/__tests__/route.test.ts
 *
 * Tests for signup API route handler
 *
 * NOTE: Adjust the require path to the route if your test file lives elsewhere.
 * This file assumes the route file is at: app/api/auth/signup/route.ts
 */

// Make this file an ES module to avoid global-scope name collisions
export {};

type SignupMocks = {
  mockBcryptHash: jest.Mock;
  mockConnQuery: jest.Mock;
  mockWithRateLimit: jest.Mock;
  mockNextResponseJson: jest.Mock;
};

// Helper to create a mock Request-like object
const createMockRequest = (body: any) => ({
  json: jest.fn().mockResolvedValue(body),
});

const loadSignupRouteWithMocks = () => {
  // ensure we start fresh each load
  jest.resetModules();

  // per-load mocks
  const mockBcryptHash = jest.fn().mockResolvedValue("hashed_password");
  const mockBcrypt = {
    hash: mockBcryptHash,
  };

  // Mock database connection
  const mockConnQuery = jest.fn().mockResolvedValue({
    rows: [{ id: 1, name: "testuser", email: "test@example.com" }],
    rowCount: 1,
  });
  const mockConn = {
    query: mockConnQuery,
  };

  // withRateLimit should wrap handler; return the handler so POST is callable
  const mockWithRateLimit = jest.fn((handler: any) => handler);

  // Mock NextResponse.json to return a simple object with status and json payload
  const mockNextResponseJson = jest.fn((payload: any, opts?: any) => {
    return {
      json: payload,
      status: opts?.status ?? 200,
    };
  });

  // Install mocks BEFORE requiring the route
  jest.doMock("bcrypt", () => mockBcrypt);
  jest.doMock("@/app/lib/database", () => ({ conn: mockConn }));
  jest.doMock("@/app/lib/rateLimit", () => ({
    withRateLimit: mockWithRateLimit,
  }));
  jest.doMock("next/server", () => ({
    NextResponse: { json: mockNextResponseJson },
  }));

  // Now require the route module (relative path from this __tests__ folder)
  const route = require("../route"); // <-- update path if your test is at a different location

  return {
    route,
    mocks: {
      mockBcryptHash,
      mockConnQuery,
      mockWithRateLimit,
      mockNextResponseJson,
    } as SignupMocks,
  };
};

describe("Signup API Route (POST)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user with valid credentials", async () => {
    const { route, mocks } = loadSignupRouteWithMocks();

    const req = createMockRequest({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    // route.POST should be the handler function (returned by mockWithRateLimit)
    const res = await route.POST(req);
    expect(res.status).toBe(201);
    expect(res.json).toEqual({
      success: true,
      message: "Signup succeeded",
      user: { id: 1, name: "testuser", email: "test@example.com" },
    });

    // bcrypt called
    expect(mocks.mockBcryptHash).toHaveBeenCalledWith("password123", 10);

    // DB called with parameterized query
    expect(mocks.mockConnQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO users"),
      ["testuser", "test@example.com", "hashed_password"],
    );
  });

  it("should reject requests with missing fields", async () => {
    const { route } = loadSignupRouteWithMocks();

    const req = createMockRequest({ username: "testuser" }); // missing email/password

    const res = await route.POST(req);
    expect(res.status).toBe(400);
    expect(res.json).toEqual({
      success: false,
      message: "Missing required fields",
    });
  });

  it("should reject passwords shorter than 6 characters", async () => {
    const { route } = loadSignupRouteWithMocks();

    const req = createMockRequest({
      username: "test",
      email: "a@b.com",
      password: "12345",
    });

    const res = await route.POST(req);
    expect(res.status).toBe(400);
    expect(res.json).toEqual({
      success: false,
      message: "Password must be at least 6 characters",
    });
  });

  it("should handle duplicate email constraint violations", async () => {
    const { route, mocks } = loadSignupRouteWithMocks();

    // make DB throw duplicate-key with email detail
    mocks.mockConnQuery.mockRejectedValueOnce({
      code: "23505",
      detail: "Key (email)=(existing@example.com) already exists.",
    });

    const req = createMockRequest({
      username: "testuser",
      email: "existing@example.com",
      password: "password123",
    });

    const res = await route.POST(req);
    expect(res.status).toBe(409);
    expect(res.json).toEqual({
      success: false,
      message: "Email already exists",
    });
  });

  it("should handle duplicate username constraint violations", async () => {
    const { route, mocks } = loadSignupRouteWithMocks();

    mocks.mockConnQuery.mockRejectedValueOnce({
      code: "23505",
      detail: "Key (name)=(existinguser) already exists.",
    });

    const req = createMockRequest({
      username: "existinguser",
      email: "test@example.com",
      password: "password123",
    });

    const res = await route.POST(req);
    expect(res.status).toBe(409);
    expect(res.json).toEqual({
      success: false,
      message: "Username already exists",
    });
  });

  it("should handle generic database errors", async () => {
    const { route, mocks } = loadSignupRouteWithMocks();

    mocks.mockConnQuery.mockRejectedValueOnce(new Error("DB down"));

    const req = createMockRequest({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    const res = await route.POST(req);
    expect(res.status).toBe(500);
    expect(res.json).toEqual({
      success: false,
      message: "Signup failed. Please try again.",
    });
  });

  it("should hash passwords before storing", async () => {
    const { route, mocks } = loadSignupRouteWithMocks();

    const req = createMockRequest({
      username: "testuser",
      email: "test@example.com",
      password: "plaintext_password",
    });

    await route.POST(req);

    expect(mocks.mockBcryptHash).toHaveBeenCalledWith("plaintext_password", 10);
    expect(mocks.mockConnQuery).toHaveBeenCalledWith(
      expect.any(String),
      expect.arrayContaining(["hashed_password"]),
    );
  });

  it("should use parameterized queries to prevent SQL injection", async () => {
    const { route } = loadSignupRouteWithMocks();

    const maliciousUsername = "test'; DROP TABLE users; --";
    const maliciousEmail = "a@b.com'; DROP TABLE users; --";

    const req = createMockRequest({
      username: maliciousUsername,
      email: maliciousEmail,
      password: "password123",
    });

    await route.POST(req);

    expect(require("@/app/lib/database").conn.query).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO users"),
      [maliciousUsername, maliciousEmail, "hashed_password"],
    );
  });

  it("should apply rate limiting middleware", () => {
    const { route, mocks } = loadSignupRouteWithMocks();

    // the mockWithRateLimit in loadSignupRouteWithMocks is a jest.fn, verify it was called
    const mockWithRateLimit = require("@/app/lib/rateLimit")
      .withRateLimit as jest.Mock;
    expect(mockWithRateLimit).toHaveBeenCalledWith(
      expect.any(Function),
      5,
      3600,
    );

    // and ensure POST exists
    expect(typeof route.POST).toBe("function");
  });
});

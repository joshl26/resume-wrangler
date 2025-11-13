/**
 * app/lib/__tests__/rateLimit.test.tsx
 *
 * Tests for app/lib/rateLimit.ts with correct Jest mock typing.
 */

import { jest, beforeEach, afterEach, describe, it, expect } from "@jest/globals";
import type { NextRequest } from "next/server";
import type { RateLimiterRes } from "rate-limiter-flexible";

// --- Polyfills / Test environment helpers ---

// Minimal Response polyfill so tests can inspect status/headers when Node lacks it
if (typeof (globalThis as any).Response === "undefined") {
  (globalThis as any).Response = class {
    private _status: number;
    private _headers: Map<string, string>;
    constructor(_body?: any, init: any = {}) {
      this._status = init.status ?? 200;
      this._headers = new Map(Object.entries(init.headers ?? {}));
    }
    get status() {
      return this._status;
    }
    get headers() {
      return {
        get: (k: string) => this._headers.get(k),
      };
    }
  };
}

// --- Typed mocks ---

// typed mock for consume: accepts (key: string, points: number) and returns Promise<RateLimiterRes>
const mockConsume = jest.fn() as jest.Mock<(key: string, points: number) => Promise<RateLimiterRes>>;

// mocks for RateLimiter classes that return an object with consume
const mockRateLimiterRedis = jest.fn(() => ({ consume: mockConsume }));
const mockRateLimiterMemory = jest.fn(() => ({ consume: mockConsume }));

// Mock rate-limiter-flexible
jest.mock("rate-limiter-flexible", () => ({
  RateLimiterRedis: mockRateLimiterRedis,
  RateLimiterMemory: mockRateLimiterMemory,
}));

// Mock ioredis constructor & instance (typed)
const mockRedisOn = jest.fn();
const mockRedisInstance = {
  on: mockRedisOn,
};
const RedisMock = jest.fn(() => mockRedisInstance);
jest.mock("ioredis", () => RedisMock);

// --- Helpers ---

function createMockRequest(overrides: {
  headers?: Record<string, string>;
  cookies?: Record<string, string>;
} = {}): NextRequest {
  const headersMap = new Map<string, string>();
  if (overrides.headers) {
    for (const [k, v] of Object.entries(overrides.headers)) {
      headersMap.set(k.toLowerCase(), v);
    }
  }

  const cookiesMap = new Map<string, string>();
  if (overrides.cookies) {
    for (const [k, v] of Object.entries(overrides.cookies)) {
      cookiesMap.set(k, v);
    }
  }

  return {
    headers: {
      get: (key: string) => headersMap.get(key.toLowerCase()) ?? null,
    },
    cookies: {
      get: (key: string) => {
        const v = cookiesMap.get(key);
        return v ? { name: key, value: v } : undefined;
      },
    },
  } as unknown as NextRequest;
}

// --- Test lifecycle ---

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();

  // Clean env keys used by module
  //@ts-expect-error - readonly
  delete process.env.NODE_ENV;
  delete process.env.REDIS_URL;
  delete process.env.RATE_LIMIT_POINTS;
  delete process.env.RATE_LIMIT_DURATION;

  // Ensure NODE_ENV exists (satisfies project global types)
    //@ts-expect-error - readonly
  process.env.NODE_ENV = "test";

  // Clear any module-level singletons your app might set
  // @ts-ignore - custom global property
  delete (global as any).__RATE_LIMIT_REDIS_CLIENT__;
  // @ts-ignore
  delete (global as any).__DB_POOL__;
});

afterEach(() => {
  jest.restoreAllMocks();
});

// --- Tests ---

describe("rateLimit", () => {
  it("uses RateLimiterMemory in development", async () => {
      //@ts-expect-error - readonly

    process.env.NODE_ENV = "development";
    const { rateLimit } = await import("@/app/lib/rateLimit");

    mockConsume.mockResolvedValueOnce({ remainingPoints: 99 } as RateLimiterRes);

    const req = createMockRequest({});
    const result = await rateLimit(req);

    expect(result.success).toBe(true);
    expect(mockRateLimiterMemory).toHaveBeenCalled();
    expect(mockRateLimiterRedis).not.toHaveBeenCalled();
  });

  it("uses RateLimiterMemory if REDIS_URL is missing", async () => {
    delete process.env.REDIS_URL;
    const { rateLimit } = await import("@/app/lib/rateLimit");

    mockConsume.mockResolvedValueOnce({ remainingPoints: 99 } as RateLimiterRes);

    const req = createMockRequest({});
    const result = await rateLimit(req);

    expect(result.success).toBe(true);
    expect(mockRateLimiterMemory).toHaveBeenCalled();
  });

  it("uses RateLimiterRedis if REDIS_URL is present and not dev", async () => {
      //@ts-expect-error - readonly

    process.env.NODE_ENV = "production";
    process.env.REDIS_URL = "redis://localhost:6379";
    const { rateLimit } = await import("@/app/lib/rateLimit");

    mockConsume.mockResolvedValueOnce({ remainingPoints: 49 } as RateLimiterRes);

    const req = createMockRequest({});
    const result = await rateLimit(req);

    expect(result.success).toBe(true);

    // More robust assertions: RateLimiterRedis created and Redis instance attached an error handler
    expect(mockRateLimiterRedis).toHaveBeenCalled();
    expect(mockRedisOn).toHaveBeenCalledWith("error", expect.any(Function));
  });

  it("uses x-user-id header as key if present", async () => {
    const { rateLimit } = await import("@/app/lib/rateLimit");
    mockConsume.mockResolvedValueOnce({ remainingPoints: 99 } as RateLimiterRes);

    const req = createMockRequest({ headers: { "x-user-id": "user-123" } });
    await rateLimit(req);

    expect(mockConsume).toHaveBeenCalledWith("user:user-123", 1);
  });

  it("uses session token as key if present (token sliced to 32 chars)", async () => {
    const { rateLimit } = await import("@/app/lib/rateLimit");
    mockConsume.mockResolvedValueOnce({ remainingPoints: 99 } as RateLimiterRes);

    const longToken = "a".repeat(40); // >= 32 chars so slice produces 32 chars
    const req = createMockRequest({
      cookies: { "next-auth.session-token": longToken },
    });
    await rateLimit(req);

    expect(mockConsume).toHaveBeenCalledWith(expect.stringMatching(/^sess:[a]{32}$/), 1);
  });

  it("uses IP from x-forwarded-for as key", async () => {
    const { rateLimit } = await import("@/app/lib/rateLimit");
    mockConsume.mockResolvedValueOnce({ remainingPoints: 99 } as RateLimiterRes);

    const req = createMockRequest({
      headers: { "x-forwarded-for": "203.0.113.195, 198.51.100.10" },
    });
    await rateLimit(req);

    expect(mockConsume).toHaveBeenCalledWith("ip:203.0.113.195", 1);
  });

  it("returns failure and retry info on rate limit exceeded", async () => {
    const { rateLimit } = await import("@/app/lib/rateLimit");
    const msBeforeNext = 5000;
    mockConsume.mockRejectedValueOnce({
      msBeforeNext,
      remainingPoints: 0,
    } as RateLimiterRes);

    const req = createMockRequest({});
    const result = await rateLimit(req);

    expect(result.success).toBe(false);
    expect(result.rej?.msBeforeNext).toBe(msBeforeNext);
  });
});

describe("withRateLimit", () => {
  it("calls handler if rate limit passes", async () => {
    const { withRateLimit } = await import("@/app/lib/rateLimit");
    mockConsume.mockResolvedValueOnce({ remainingPoints: 99 } as RateLimiterRes);

    // Cast the mock to the correct function type to avoid TS errors
    const mockHandler = jest.fn().mockResolvedValue(
          //@ts-expect-error - readonly

      new Response("OK", { status: 200 })
    ) as unknown as (req: NextRequest) => Promise<Response>;
    
    const wrapped = withRateLimit(mockHandler);
    const req = createMockRequest({});

    const res = await wrapped(req);

    expect(res.status).toBe(200);
    expect(mockHandler).toHaveBeenCalledWith(req);
  });

  it("returns 429 if rate limit exceeded", async () => {
    const { withRateLimit } = await import("@/app/lib/rateLimit");
    mockConsume.mockRejectedValueOnce({
      msBeforeNext: 3000,
      remainingPoints: 0,
    } as RateLimiterRes);

    // Cast the mock to the correct function type to avoid TS errors
    const mockHandler = jest.fn() as unknown as (req: NextRequest) => Promise<Response>;
    const wrapped = withRateLimit(mockHandler);
    const req = createMockRequest({});

    const res = await wrapped(req);

    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("3");
    expect(mockHandler).not.toHaveBeenCalled();
  });
});
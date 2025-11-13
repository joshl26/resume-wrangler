/**
 * app/lib/__tests__/database.test.tsx
 *
 * Tests for /app/lib/database.ts with proper module/global resets.
 */

import { jest } from "@jest/globals";

// Mock the pg module to intercept Pool constructor
jest.mock("pg", () => {
  return {
    Pool: jest.fn().mockImplementation((options) => {
      return {
        options,
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
      };
    }),
  };
});

const PG = async () => await import("pg");

// List of environment keys your tests may override
const TEST_ENV_KEYS = [
  "POSTGRES_DB_USERNAME",
  "POSTGRES_DB_PASSWORD",
  "POSTGRES_DB_HOST",
  "POSTGRES_DB_PORT",
  "POSTGRES_DB_DATABASE",
  "PG_POOL_MAX",
  "PG_IDLE_MS",
  "PG_CONN_TIMEOUT_MS",
  "NODE_ENV",
];

beforeEach(() => {
    // Ensure a completely fresh module environment
    jest.resetModules();
  
    // Clear any global pool left from previous tests
    // @ts-ignore
    delete (global as any).__DB_POOL__;
  
    // Safely clear only the env keys used by tests
    const TEST_ENV_KEYS = [
      "POSTGRES_DB_USERNAME",
      "POSTGRES_DB_PASSWORD",
      "POSTGRES_DB_HOST",
      "POSTGRES_DB_PORT",
      "POSTGRES_DB_DATABASE",
      "PG_POOL_MAX",
      "PG_IDLE_MS",
      "PG_CONN_TIMEOUT_MS",
      "NODE_ENV",
    ];
  
    for (const key of TEST_ENV_KEYS) {
      delete process.env[key];
    }
  
    // Explicitly set NODE_ENV after deletion (bypasses readonly error)
    //@ts-ignore
    process.env.NODE_ENV = "test";
  });
afterEach(() => {
  jest.restoreAllMocks();
});

describe("PostgreSQL Connection Pool (/app/lib/database.ts)", () => {
  it("creates a pool with default options when env vars missing", async () => {
    //@ts-ignore
    process.env.NODE_ENV = "development";

    const { conn } = await import("@/app/lib/database");
    //@ts-ignore
    const PoolMock = (await PG()).Pool as jest.Mock;

    expect(PoolMock).toHaveBeenCalledWith({
      user: undefined,
      password: undefined,
      host: undefined,
      port: 5432,
      database: undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    expect((conn as any).options).toEqual({
      user: undefined,
      password: undefined,
      host: undefined,
      port: 5432,
      database: undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  });

  it("uses environment variables when present", async () => {
    process.env.POSTGRES_DB_USERNAME = "testuser";
    process.env.POSTGRES_DB_PASSWORD = "secret";
    process.env.POSTGRES_DB_HOST = "db.example.com";
    process.env.POSTGRES_DB_PORT = "5433";
    process.env.POSTGRES_DB_DATABASE = "mydb";
    process.env.PG_POOL_MAX = "20";
    process.env.PG_IDLE_MS = "60000";
    process.env.PG_CONN_TIMEOUT_MS = "5000";
    //@ts-ignore
    process.env.NODE_ENV = "development";

    const { conn } = await import("@/app/lib/database");
    //@ts-ignore
    const PoolMock = (await PG()).Pool as jest.Mock;

    expect(PoolMock).toHaveBeenCalledWith({
      user: "testuser",
      password: "secret",
      host: "db.example.com",
      port: 5433,
      database: "mydb",
      max: 20,
      idleTimeoutMillis: 60000,
      connectionTimeoutMillis: 5000,
    });

    expect((conn as any).options).toEqual({
      user: "testuser",
      password: "secret",
      host: "db.example.com",
      port: 5433,
      database: "mydb",
      max: 20,
      idleTimeoutMillis: 60000,
      connectionTimeoutMillis: 5000,
    });
  });

  it("reuses existing pool in development (NODE_ENV !== production)", async () => {
    //@ts-ignore
    process.env.NODE_ENV = "development";
    

    const { conn: conn1 } = await import("@/app/lib/database");
    const { conn: conn2 } = await import("@/app/lib/database");

    expect(conn1).toBe(conn2);
  });

  it("does not reuse pool in production", async () => {
    //@ts-ignore
    process.env.NODE_ENV = "production";
    const mod1 = await import("@/app/lib/database");
    const conn1 = mod1.conn;

    // Clear module registry so the module runs again
    jest.resetModules();

    // Restore test env keys and set production mode
    for (const key of TEST_ENV_KEYS) {
      delete process.env[key];
    }
    //@ts-ignore
    process.env.NODE_ENV = "production";

    const mod2 = await import("@/app/lib/database");
    const conn2 = mod2.conn;

    expect(conn1).not.toBe(conn2);
  });
});
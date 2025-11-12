// PostgreSQL database connection using pg Pool
// file: /app/lib/database.ts

import { Pool } from "pg";

// Define pool options with defaults
const poolOptions = {
  user: process.env.POSTGRES_DB_USERNAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  host: process.env.POSTGRES_DB_HOST,
  port: parseInt(process.env.POSTGRES_DB_PORT || "5432", 10),
  database: process.env.POSTGRES_DB_DATABASE,
  max: parseInt(process.env.PG_POOL_MAX || "10", 10), // Max clients in pool
  idleTimeoutMillis: parseInt(process.env.PG_IDLE_MS || "30000", 10), // Close idle clients
  connectionTimeoutMillis: parseInt(
    process.env.PG_CONN_TIMEOUT_MS || "2000",
    10,
  ),
};

// Prevent multiple pools in development due to hot reloading
declare global {
  var __DB_POOL__: Pool | undefined;
}

// Reuse existing pool in development or create new one
const conn: Pool = global.__DB_POOL__ ?? new Pool(poolOptions);

// Save pool in development to prevent duplicates
if (process.env.NODE_ENV !== "production") {
  global.__DB_POOL__ = conn;
}

export { conn };

// app/lib/rateLimit.ts
import { NextRequest } from 'next/server';
import {
  RateLimiterRedis,
  RateLimiterMemory,
  RateLimiterRes,
} from 'rate-limiter-flexible';
import Redis from 'ioredis';

type Limiter = RateLimiterRedis | RateLimiterMemory;

const DEFAULT_POINTS = parseInt(process.env.RATE_LIMIT_POINTS || '100', 10);
const DEFAULT_DURATION = parseInt(process.env.RATE_LIMIT_DURATION || '900', 10);

// Lazy singleton for limiter
let limiterSingleton: Limiter | null = null;
let redisClientSingleton: Redis | null = null;

// Create/return Redis client lazily. Do NOT connect at module load time.
function getRedisClient(): Redis | null {
  if (redisClientSingleton) return redisClientSingleton;

  const url = process.env.REDIS_URL;
  if (!url) return null;

  // lazyConnect avoids immediate connection attempt
  const client = new Redis(url, {
    lazyConnect: true,
    // reduce retry noise / avoid long hangs in case of issues
    maxRetriesPerRequest: 1,
    enableReadyCheck: false,
  });

  // Always attach an 'error' handler to prevent unhandled exceptions during build/runtime
  client.on('error', (err) => {
    // Use console.warn instead of throwing; prevents Node from exiting due to uncaught errors
    // You can route this to your logging system (Sentry/Datadog) in production.
    // Keep the message minimal to avoid leaking secrets in logs.
    console.warn('[rateLimit] ioredis error:', err && err.message ? err.message : err);
  });

  redisClientSingleton = client;
  return client;
}

function createLimiter(): Limiter {
  // If running in dev or REDIS_URL missing, use memory limiter
  const useMemory =
    process.env.NODE_ENV === 'development' || !process.env.REDIS_URL;

  const points = DEFAULT_POINTS;
  const duration = DEFAULT_DURATION;

  if (useMemory) {
    return new RateLimiterMemory({
      points,
      duration,
    });
  }

  const client = getRedisClient();
  if (!client) {
    // fallback
    return new RateLimiterMemory({ points, duration });
  }

  // Construct RateLimiterRedis with the ioredis client (lazy connect)
  return new RateLimiterRedis({
    storeClient: client,
    points,
    duration,
    keyPrefix: 'rl:api:',
  });
}

function getLimiter(): Limiter {
  if (!limiterSingleton) {
    limiterSingleton = createLimiter();
  }
  return limiterSingleton;
}

// --- helper to parse IPs safely ---
function firstIpFromHeader(xff: string | null | undefined): string | null {
  if (!xff) return null;
  const parts: string[] = xff.split(',').map((s) => s.trim()).filter(Boolean);
  const first = parts[0];
  return first ?? null;
}

function getKey(req: NextRequest): string {
  // Prefer explicit user id header if present (set by your auth layer)
  const userIdHeader = req.headers.get('x-user-id');
  if (userIdHeader) return `user:${userIdHeader}`;

  // Try to extract user from session cookie (basic detection)
  try {
    const sessionToken =
      req.cookies.get('next-auth.session-token')?.value ||
      req.cookies.get('__Secure-next-auth.session-token')?.value;
    if (sessionToken) {
      // Prefer resolving actual user id from session if you can; this is a best-effort fallback.
      return `sess:${sessionToken.slice(0, 32)}`;
    }
  } catch (_) {
    // Ignore cookie parsing errors
  }

  // Proxy headers (Vercel, Cloudflare, nginx, etc.)
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return `ip:${cfConnectingIp}`;

  const xff = req.headers.get('x-forwarded-for');
  const xRealIp = req.headers.get('x-real-ip');

  const ip =
    firstIpFromHeader(xff) ||
    xRealIp ||
    req.headers.get('x-vercel-forwarded-for') ||
    'unknown';

  const cleanIp = ip.includes(':') ? ip.split(':')[0] : ip;
  return `ip:${cleanIp}`;
}

// Rate-limiting function
export async function rateLimit(
  req: NextRequest,
  points = DEFAULT_POINTS,
  duration = DEFAULT_DURATION
) {
  const limiter = getLimiter();
  const key = getKey(req);

  try {
    const res = await limiter.consume(key, 1);
    return { success: true, res };
  } catch (rej) {
    return { success: false, rej: rej as RateLimiterRes };
  }
}

// Wrapper for App Router handlers
export function withRateLimit(
  handler: (req: NextRequest) => Promise<Response>,
  points?: number,
  duration?: number
) {
  return async (req: NextRequest): Promise<Response> => {
    const { success, rej } = await rateLimit(req, points, duration);

    if (!success) {
      const msBeforeNext = rej?.msBeforeNext || 0;
      const retryAfter = Math.ceil(msBeforeNext / 1000);

      return new Response(
        JSON.stringify({
          error: 'Too Many Requests',
          message: `Rate limit exceeded. Retry after ${retryAfter} seconds.`,
        }),
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return handler(req);
  };
}
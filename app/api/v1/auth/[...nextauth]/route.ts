// app/api/auth/[...nextauth]/route.ts
import { GET, POST } from "../../../../../auth";
import { withRateLimit } from "../../../../lib/rateLimit";

// Wrap both handlers with rate limiting
export const GET_RATE_LIMITED = withRateLimit(GET);
export const POST_RATE_LIMITED = withRateLimit(POST);

// Export wrapped handlers
export { GET_RATE_LIMITED as GET, POST_RATE_LIMITED as POST };

// Optional: runtime config
export const runtime = "nodejs";
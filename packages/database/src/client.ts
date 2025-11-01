import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";

// eslint-disable-next-line turbo/no-undeclared-env-vars
let connectionString = process.env.DATABASE_URL;

// Configure Neon for local development only (not in CI/CD)
// eslint-disable-next-line turbo/no-undeclared-env-vars
const isLocalDev = process.env.NODE_ENV === "development" && !process.env.CI;

if (isLocalDev) {
  connectionString = connectionString || "postgres://postgres:postgres@db.localtest.me:5432/main";

  // Route local requests through the Neon proxy
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] = host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
    return `${protocol}://${host}:${port}/sql`;
  };

  // Use secure WebSocket only for cloud connections
  const connectionStringUrl = new URL(connectionString);
  neonConfig.useSecureWebSocket = connectionStringUrl.hostname !== "db.localtest.me";

  // Configure WebSocket proxy routing
  neonConfig.wsProxy = (host) => (host === "db.localtest.me" ? `${host}:4444/v2` : `${host}/v2`);
}

// Set WebSocket constructor only for Node.js environments
// Serverless environments (Vercel, Cloudflare Workers) have native WebSocket support
// eslint-disable-next-line turbo/no-undeclared-env-vars
if (typeof process !== "undefined" && process.versions?.node) {
  // Only import ws in Node.js runtime, not in serverless/edge environments
  // This prevents "Cannot find module 'ws'" errors in Vercel deployments
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  neonConfig.webSocketConstructor = require("ws");
}

/**
 * Creates and configures the Neon serverless database client.
 * Works in both local development (via Neon proxy) and production (Neon cloud).
 *
 * During build time, DATABASE_URL might not be available. The client creation
 * is deferred to runtime to allow builds to complete successfully.
 *
 * @throws {Error} If DATABASE_URL is not configured at runtime in production
 * @returns Drizzle database client instance with Neon serverless driver
 */
const createDatabaseClient = () => {
  // During build time (when bundling code), allow missing DATABASE_URL
  // The client will only be accessed at runtime when the env var should be present
  if (!connectionString) {
    // In production runtime, this is an error
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    if (process.env.VERCEL && process.env.NODE_ENV === "production") {
      throw new Error(
        "DATABASE_URL environment variable is not set. Please configure your database connection."
      );
    }
    // During build, return null (typed as db for compatibility)
    // This will never be used during build, only at runtime
    return null as unknown as ReturnType<typeof drizzle<typeof schema>>;
  }

  // Use Pool for long-running connections (better for Next.js app routes and servers)
  const pool = new Pool({ connectionString });
  const db = drizzle(pool, { schema });
  return db;
};

export const db = createDatabaseClient();
export type Database = typeof db;

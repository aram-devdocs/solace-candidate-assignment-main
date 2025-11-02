import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { resolve } from "path";

// Set WebSocket constructor only for Node.js environments
// Serverless environments (Vercel, Cloudflare Workers) have native WebSocket support
// eslint-disable-next-line turbo/no-undeclared-env-vars
const isVercel = process.env.VERCEL === "1";
// eslint-disable-next-line turbo/no-undeclared-env-vars
const isServerless = process.env.AWS_LAMBDA_FUNCTION_NAME || isVercel;

if (typeof process !== "undefined" && process.versions?.node && !isServerless) {
  // Only import ws in Node.js runtime, not in serverless/edge environments
  // This prevents "Cannot find module 'ws'" errors in Vercel deployments
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  neonConfig.webSocketConstructor = require("ws");
}

// Configure Neon for local development only (not in CI/CD)
// eslint-disable-next-line turbo/no-undeclared-env-vars
const isLocalDev = process.env.NODE_ENV === "development" && !process.env.CI;
const connectionString = process.env.DATABASE_URL || "";
const isLocalDatabase = connectionString.includes("db.localtest.me");

if (isLocalDev && isLocalDatabase) {
  // Route local requests through the Neon proxy
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] = host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
    return `${protocol}://${host}:${port}/sql`;
  };

  // Use secure WebSocket only for cloud connections
  if (connectionString) {
    const connectionStringUrl = new URL(connectionString);
    neonConfig.useSecureWebSocket = connectionStringUrl.hostname !== "db.localtest.me";
    neonConfig.wsProxy = (host) => (host === "db.localtest.me" ? `${host}:4444/v2` : `${host}/v2`);
  }
}

/**
 * Programmatic migration runner for CI/CD and production environments.
 * Uses Drizzle's built-in migrate() function with Neon serverless driver.
 *
 * @throws {Error} If DATABASE_URL is not set or migration fails
 */
async function runMigrations(): Promise<void> {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error(
      "DATABASE_URL environment variable is not set. Cannot run migrations without database connection."
    );
  }

  console.log("Starting database migrations...");

  // Create connection pool for migrations
  const pool = new Pool({ connectionString: DATABASE_URL });

  try {
    const db = drizzle(pool);

    // Run migrations from the migrations folder
    const migrationsFolder = resolve(__dirname, "../migrations");

    await migrate(db, { migrationsFolder });

    console.log("✓ Migrations completed successfully");
  } catch (error) {
    console.error("✗ Migration failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log("Migration process completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration process failed:", error);
      process.exit(1);
    });
}

export { runMigrations };

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const DATABASE_URL = process.env.DATABASE_URL || "";

/**
 * Creates and configures the Drizzle database client.
 * Falls back to mock client if DATABASE_URL is not configured.
 *
 * @returns Drizzle database client instance
 */
const createDatabaseClient = () => {
  if (!DATABASE_URL) {
    console.error("DATABASE_URL is not set - using mock client");
    return {
      select: () => ({
        from: () => [],
      }),
      insert: () => ({
        values: () => ({
          returning: () => Promise.resolve([]),
        }),
      }),
    } as any;
  }

  const queryClient = postgres(DATABASE_URL);
  const db = drizzle(queryClient, { schema });
  return db;
};

export const db = createDatabaseClient();
export type Database = typeof db;

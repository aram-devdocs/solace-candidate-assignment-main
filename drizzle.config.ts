import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./packages/database/src/schema.ts",
  out: "./packages/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgres://postgres:postgres@db.localtest.me:5432/main",
  },
  verbose: true,
  strict: true,
});

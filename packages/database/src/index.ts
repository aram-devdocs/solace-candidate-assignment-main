export * from "./schema";
export { db, type Database } from "./client";
export { advocateData } from "./seed/advocates";
export { runMigrations } from "./migrate";
export { seedDatabase } from "./scripts/seed";

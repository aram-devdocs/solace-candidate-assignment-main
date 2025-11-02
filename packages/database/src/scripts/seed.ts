#!/usr/bin/env tsx

import { db } from "../client";
import { advocates, cities, degrees, specialties, advocateSpecialties } from "../schema";
import { asc, sql } from "drizzle-orm";
import {
  generateAdvocates,
  CITY_DATA,
  DEGREE_DATA,
  SPECIALTY_DATA,
  type GeneratedAdvocate,
} from "../generators";

/**
 * Default number of advocates to seed if SEED_COUNT is not specified
 */
const DEFAULT_SEED_COUNT = 100;

/**
 * Get the target seed count from environment variable
 */
function getTargetSeedCount(): number {
  const seedCountEnv = process.env.SEED_COUNT;

  if (!seedCountEnv) {
    return DEFAULT_SEED_COUNT;
  }

  const seedCount = parseInt(seedCountEnv, 10);

  if (isNaN(seedCount) || seedCount < 0) {
    console.warn(`Invalid SEED_COUNT value: ${seedCountEnv}. Using default: ${DEFAULT_SEED_COUNT}`);
    return DEFAULT_SEED_COUNT;
  }

  return seedCount;
}

/**
 * Seed lookup tables with expanded data from generators
 */
async function seedLookupTables(): Promise<{
  citiesMap: Map<string, number>;
  degreesMap: Map<string, number>;
  specialtiesMap: Map<string, number>;
}> {
  // Seed degrees lookup table
  console.log("Seeding degrees...");
  for (const degree of DEGREE_DATA) {
    await db
      .insert(degrees)
      .values(degree)
      .onConflictDoUpdate({
        target: degrees.code,
        set: { name: degree.name },
      });
  }
  console.log(`✓ Seeded ${DEGREE_DATA.length} degrees`);

  // Seed cities lookup table
  console.log("Seeding cities...");
  for (const city of CITY_DATA) {
    await db
      .insert(cities)
      .values(city)
      .onConflictDoUpdate({
        target: cities.name,
        set: { stateCode: city.stateCode },
      });
  }
  console.log(`✓ Seeded ${CITY_DATA.length} cities`);

  // Seed specialties lookup table
  console.log("Seeding specialties...");
  for (const specialty of SPECIALTY_DATA) {
    await db
      .insert(specialties)
      .values({ name: specialty.name, category: specialty.category })
      .onConflictDoUpdate({
        target: specialties.name,
        set: {
          category: specialty.category,
        },
      });
  }
  console.log(`✓ Seeded ${SPECIALTY_DATA.length} specialties`);

  // Build lookup maps for foreign keys
  const citiesMap = new Map<string, number>();
  const allCities = await db.select().from(cities);
  for (const city of allCities) {
    citiesMap.set(city.name, city.id);
  }

  const degreesMap = new Map<string, number>();
  const allDegrees = await db.select().from(degrees);
  for (const degree of allDegrees) {
    degreesMap.set(degree.code, degree.id);
  }

  const specialtiesMap = new Map<string, number>();
  const allSpecialties = await db.select().from(specialties);
  for (const specialty of allSpecialties) {
    specialtiesMap.set(specialty.name, specialty.id);
  }

  return { citiesMap, degreesMap, specialtiesMap };
}

/**
 * Insert a single advocate and their specialty relationships
 */
async function insertAdvocate(
  advocateData: GeneratedAdvocate,
  citiesMap: Map<string, number>,
  degreesMap: Map<string, number>,
  specialtiesMap: Map<string, number>
): Promise<void> {
  const cityId = citiesMap.get(advocateData.city);
  const degreeId = degreesMap.get(advocateData.degree);

  if (!cityId || !degreeId) {
    console.error(
      `Missing lookup data for advocate: ${advocateData.firstName} ${advocateData.lastName}`
    );
    return;
  }

  // Insert advocate
  const result = await db
    .insert(advocates)
    .values({
      firstName: advocateData.firstName,
      lastName: advocateData.lastName,
      cityId,
      degreeId,
      yearsOfExperience: advocateData.yearsOfExperience,
      phoneNumber: advocateData.phoneNumber,
    })
    .returning({ id: advocates.id });

  const advocateId = result[0].id;

  // Insert advocate-specialty relationships
  for (const specialtyName of advocateData.specialties) {
    const specialtyId = specialtiesMap.get(specialtyName);
    if (specialtyId) {
      await db
        .insert(advocateSpecialties)
        .values({
          advocateId,
          specialtyId,
        })
        .onConflictDoNothing();
    }
  }
}

/**
 * Delete advocates and their relationships (cascade handled by DB)
 */
async function deleteAdvocates(advocateIds: number[]): Promise<void> {
  if (advocateIds.length === 0) return;

  await db.delete(advocates).where(sql`${advocates.id} IN (${sql.raw(advocateIds.join(","))})`);
}

/**
 * Smart reconciliation: adjusts database to match target count
 * - If current < target: generates and adds new advocates
 * - If current > target: removes oldest advocates by createdAt
 * - If current = target: no changes made
 */
async function reconcileAdvocates(
  targetCount: number,
  citiesMap: Map<string, number>,
  degreesMap: Map<string, number>,
  specialtiesMap: Map<string, number>
): Promise<void> {
  // Get current advocate count (excluding soft-deleted)
  const currentAdvocates = await db
    .select({ id: advocates.id, createdAt: advocates.createdAt })
    .from(advocates)
    .where(sql`${advocates.deletedAt} IS NULL`)
    .orderBy(asc(advocates.createdAt));

  const currentCount = currentAdvocates.length;

  console.log(`Current advocate count: ${currentCount}`);
  console.log(`Target advocate count: ${targetCount}`);

  if (currentCount === targetCount) {
    console.log("✓ Database already matches target count. No changes needed.");
    return;
  }

  if (currentCount < targetCount) {
    // Need to add advocates
    const countToAdd = targetCount - currentCount;
    console.log(`Adding ${countToAdd} new advocates...`);

    const newAdvocates = generateAdvocates(countToAdd);

    for (const advocateData of newAdvocates) {
      await insertAdvocate(advocateData, citiesMap, degreesMap, specialtiesMap);
    }

    console.log(`✓ Successfully added ${countToAdd} advocates`);
  } else {
    // Need to remove advocates (remove oldest first)
    const countToRemove = currentCount - targetCount;
    console.log(`Removing ${countToRemove} oldest advocates...`);

    const advocatesToRemove = currentAdvocates.slice(0, countToRemove);
    const idsToRemove = advocatesToRemove.map((a) => a.id);

    await deleteAdvocates(idsToRemove);

    console.log(`✓ Successfully removed ${countToRemove} advocates`);
  }
}

/**
 * Seeds the database with advocate data using smart reconciliation.
 * Reads SEED_COUNT from environment variable (default: 100).
 *
 * Reconciliation behavior:
 * - Adds advocates if current count < SEED_COUNT
 * - Removes oldest advocates if current count > SEED_COUNT
 * - Does nothing if current count = SEED_COUNT
 *
 * @throws {Error} If DATABASE_URL is not set or seeding fails
 */
async function seedDatabase(): Promise<void> {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error(
      "DATABASE_URL environment variable is not set. Cannot seed database without connection."
    );
  }

  const targetCount = getTargetSeedCount();

  console.log("========================================");
  console.log("Starting database seeding...");
  console.log(`Target advocate count: ${targetCount}`);
  console.log("========================================\n");

  try {
    // Step 1: Seed lookup tables and get ID maps
    const { citiesMap, degreesMap, specialtiesMap } = await seedLookupTables();

    console.log();

    // Step 2: Reconcile advocates to match target count
    console.log("Reconciling advocates...");
    await reconcileAdvocates(targetCount, citiesMap, degreesMap, specialtiesMap);

    console.log();
    console.log("========================================");
    console.log("✓ Database seeding completed successfully");
    console.log("========================================");
  } catch (error) {
    console.error("\n========================================");
    console.error("✗ Seeding failed:");
    console.error(error);
    console.error("========================================");
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("\nSeeding process completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\nSeeding process failed:", error);
      process.exit(1);
    });
}

export { seedDatabase };

#!/usr/bin/env tsx

import { db } from "../client";
import { advocates, cities, degrees, specialties, advocateSpecialties } from "../schema";
import { eq } from "drizzle-orm";

/**
 * Seed data for advocates with denormalized format for easy definition.
 * Will be normalized during seeding process.
 */
const advocateSeedData = [
  {
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    specialties: ["Bipolar disorder counseling", "PTSD"],
    yearsOfExperience: 10,
    phoneNumber: "5551234567",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    city: "Los Angeles",
    degree: "PhD",
    specialties: ["LGBTQ Counseling", "Anxiety/Depression"],
    yearsOfExperience: 8,
    phoneNumber: "5559876543",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    city: "Chicago",
    degree: "MSW",
    specialties: ["Relationship issues", "Family therapy"],
    yearsOfExperience: 5,
    phoneNumber: "5554567890",
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    city: "Houston",
    degree: "MD",
    specialties: ["Chronic pain management", "ADHD"],
    yearsOfExperience: 12,
    phoneNumber: "5556543210",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    city: "Phoenix",
    degree: "PhD",
    specialties: ["Weight loss coaching", "Diabetic nutrition counseling"],
    yearsOfExperience: 7,
    phoneNumber: "5553210987",
  },
  {
    firstName: "Chris",
    lastName: "Martinez",
    city: "Philadelphia",
    degree: "MSW",
    specialties: ["Life coaching", "Career coaching"],
    yearsOfExperience: 9,
    phoneNumber: "5557890123",
  },
  {
    firstName: "Jessica",
    lastName: "Taylor",
    city: "San Antonio",
    degree: "MD",
    specialties: ["OCD", "Eating disorders"],
    yearsOfExperience: 11,
    phoneNumber: "5554561234",
  },
  {
    firstName: "David",
    lastName: "Harris",
    city: "San Diego",
    degree: "PhD",
    specialties: ["Sleep issues", "Stress management"],
    yearsOfExperience: 6,
    phoneNumber: "5557896543",
  },
  {
    firstName: "Laura",
    lastName: "Clark",
    city: "Dallas",
    degree: "MSW",
    specialties: ["Grief counseling", "Trauma counseling"],
    yearsOfExperience: 4,
    phoneNumber: "5550123456",
  },
  {
    firstName: "Daniel",
    lastName: "Lewis",
    city: "San Jose",
    degree: "MD",
    specialties: ["Addiction counseling", "Cognitive behavioral therapy"],
    yearsOfExperience: 14,
    phoneNumber: "5556549876",
  },
  {
    firstName: "Sarah",
    lastName: "Walker",
    city: "Austin",
    degree: "PhD",
    specialties: ["Dialectical behavior therapy", "Mindfulness training"],
    yearsOfExperience: 3,
    phoneNumber: "5551239870",
  },
  {
    firstName: "James",
    lastName: "Hall",
    city: "Jacksonville",
    degree: "MSW",
    specialties: ["Autism spectrum support", "Learning disabilities"],
    yearsOfExperience: 13,
    phoneNumber: "5559873210",
  },
  {
    firstName: "Linda",
    lastName: "Allen",
    city: "Fort Worth",
    degree: "MD",
    specialties: ["Geriatric care", "Pediatric care"],
    yearsOfExperience: 10,
    phoneNumber: "5556781234",
  },
  {
    firstName: "Robert",
    lastName: "Young",
    city: "Columbus",
    degree: "PhD",
    specialties: ["Women's health", "Men's health"],
    yearsOfExperience: 8,
    phoneNumber: "5553456789",
  },
  {
    firstName: "Patricia",
    lastName: "King",
    city: "Charlotte",
    degree: "MSW",
    specialties: ["Psychological evaluations", "Neuropsychological testing"],
    yearsOfExperience: 6,
    phoneNumber: "5557654321",
  },
];

/**
 * Degree definitions with full names
 */
const degreeSeedData = [
  { code: "MD", name: "Medical Doctor" },
  { code: "PhD", name: "Doctor of Philosophy" },
  { code: "MSW", name: "Master of Social Work" },
];

/**
 * Seeds the database with advocate data using proper normalization.
 * Handles lookup tables and junction tables correctly.
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

  console.log("Starting database seeding...");

  try {
    // Step 1: Seed degrees lookup table
    console.log("Seeding degrees...");
    for (const degree of degreeSeedData) {
      await db
        .insert(degrees)
        .values(degree)
        .onConflictDoUpdate({
          target: degrees.code,
          set: { name: degree.name },
        });
    }
    console.log(`✓ Seeded ${degreeSeedData.length} degrees`);

    // Step 2: Seed cities lookup table
    console.log("Seeding cities...");
    const uniqueCities = Array.from(new Set(advocateSeedData.map((a) => a.city)));
    for (const cityName of uniqueCities) {
      await db.insert(cities).values({ name: cityName }).onConflictDoNothing();
    }
    console.log(`✓ Seeded ${uniqueCities.length} cities`);

    // Step 3: Seed specialties lookup table
    console.log("Seeding specialties...");
    const uniqueSpecialties = Array.from(new Set(advocateSeedData.flatMap((a) => a.specialties)));
    for (const specialtyName of uniqueSpecialties) {
      await db.insert(specialties).values({ name: specialtyName }).onConflictDoNothing();
    }
    console.log(`✓ Seeded ${uniqueSpecialties.length} specialties`);

    // Step 4: Get lookup IDs for foreign keys
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

    // Step 5: Seed advocates with proper foreign keys
    console.log("Seeding advocates...");
    for (const advocateData of advocateSeedData) {
      const cityId = citiesMap.get(advocateData.city);
      const degreeId = degreesMap.get(advocateData.degree);

      if (!cityId || !degreeId) {
        console.error(
          `Missing lookup data for advocate: ${advocateData.firstName} ${advocateData.lastName}`
        );
        continue;
      }

      // Insert or update advocate
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
        .onConflictDoUpdate({
          target: advocates.phoneNumber,
          set: {
            firstName: advocateData.firstName,
            lastName: advocateData.lastName,
            cityId,
            degreeId,
            yearsOfExperience: advocateData.yearsOfExperience,
          },
        })
        .returning({ id: advocates.id });

      const advocateId = result[0].id;

      // Step 6: Handle advocate-specialty relationships
      // First, remove existing relationships for this advocate
      await db.delete(advocateSpecialties).where(eq(advocateSpecialties.advocateId, advocateId));

      // Then insert new relationships
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

    console.log(`✓ Successfully seeded ${advocateSeedData.length} advocates`);
    console.log("✓ Database seeding completed successfully");
  } catch (error) {
    console.error("✗ Seeding failed:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("Seeding process completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding process failed:", error);
      process.exit(1);
    });
}

export { seedDatabase, advocateSeedData };

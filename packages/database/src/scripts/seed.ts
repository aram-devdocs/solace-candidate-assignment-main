#!/usr/bin/env tsx

import type { InferInsertModel } from "drizzle-orm";
import { db } from "../client";
import { advocates } from "../schema";

type NewAdvocate = InferInsertModel<typeof advocates>;

/**
 * Seed data for advocates table.
 * Uses proper types from schema to ensure type safety.
 */
const advocateSeedData: Omit<NewAdvocate, "id" | "createdAt">[] = [
  {
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    specialties: ["Bipolar disorder counseling", "PTSD"],
    yearsOfExperience: 10,
    phoneNumber: 5551234567,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    city: "Los Angeles",
    degree: "PhD",
    specialties: ["LGBTQ Counseling", "Anxiety/Depression"],
    yearsOfExperience: 8,
    phoneNumber: 5559876543,
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    city: "Chicago",
    degree: "MSW",
    specialties: ["Relationship issues", "Family therapy"],
    yearsOfExperience: 5,
    phoneNumber: 5554567890,
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    city: "Houston",
    degree: "MD",
    specialties: ["Chronic pain management", "ADHD"],
    yearsOfExperience: 12,
    phoneNumber: 5556543210,
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    city: "Phoenix",
    degree: "PhD",
    specialties: ["Weight loss coaching", "Diabetic nutrition counseling"],
    yearsOfExperience: 7,
    phoneNumber: 5553210987,
  },
  {
    firstName: "Chris",
    lastName: "Martinez",
    city: "Philadelphia",
    degree: "MSW",
    specialties: ["Life coaching", "Career coaching"],
    yearsOfExperience: 9,
    phoneNumber: 5557890123,
  },
  {
    firstName: "Jessica",
    lastName: "Taylor",
    city: "San Antonio",
    degree: "MD",
    specialties: ["OCD", "Eating disorders"],
    yearsOfExperience: 11,
    phoneNumber: 5554561234,
  },
  {
    firstName: "David",
    lastName: "Harris",
    city: "San Diego",
    degree: "PhD",
    specialties: ["Sleep issues", "Stress management"],
    yearsOfExperience: 6,
    phoneNumber: 5557896543,
  },
  {
    firstName: "Laura",
    lastName: "Clark",
    city: "Dallas",
    degree: "MSW",
    specialties: ["Grief counseling", "Trauma counseling"],
    yearsOfExperience: 4,
    phoneNumber: 5550123456,
  },
  {
    firstName: "Daniel",
    lastName: "Lewis",
    city: "San Jose",
    degree: "MD",
    specialties: ["Addiction counseling", "Cognitive behavioral therapy"],
    yearsOfExperience: 13,
    phoneNumber: 5553217654,
  },
  {
    firstName: "Sarah",
    lastName: "Lee",
    city: "Austin",
    degree: "PhD",
    specialties: ["Dialectical behavior therapy", "Mindfulness training"],
    yearsOfExperience: 10,
    phoneNumber: 5551238765,
  },
  {
    firstName: "James",
    lastName: "King",
    city: "Jacksonville",
    degree: "MSW",
    specialties: ["Autism spectrum support", "Learning disabilities"],
    yearsOfExperience: 5,
    phoneNumber: 5556540987,
  },
  {
    firstName: "Megan",
    lastName: "Green",
    city: "San Francisco",
    degree: "MD",
    specialties: ["Geriatric care", "Pediatric care"],
    yearsOfExperience: 14,
    phoneNumber: 5559873456,
  },
  {
    firstName: "Joshua",
    lastName: "Walker",
    city: "Columbus",
    degree: "PhD",
    specialties: ["Women's health", "Men's health"],
    yearsOfExperience: 9,
    phoneNumber: 5556781234,
  },
  {
    firstName: "Amanda",
    lastName: "Hall",
    city: "Fort Worth",
    degree: "MSW",
    specialties: ["Psychological evaluations", "Neuropsychological testing"],
    yearsOfExperience: 3,
    phoneNumber: 5559872345,
  },
];

/**
 * Seeds the database with advocate data using upsert logic.
 * Uses phone number as the unique constraint for conflict resolution.
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
    // Use upsert logic with onConflictDoUpdate
    // Phone number is used as the unique identifier
    for (const advocate of advocateSeedData) {
      await db
        .insert(advocates)
        .values(advocate)
        .onConflictDoUpdate({
          target: advocates.phoneNumber,
          set: {
            firstName: advocate.firstName,
            lastName: advocate.lastName,
            city: advocate.city,
            degree: advocate.degree,
            specialties: advocate.specialties,
            yearsOfExperience: advocate.yearsOfExperience,
          },
        });
    }

    console.log(`✓ Successfully seeded ${advocateSeedData.length} advocates`);
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

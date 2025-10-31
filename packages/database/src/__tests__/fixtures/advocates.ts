import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { advocates } from "../../schema";

type Advocate = InferSelectModel<typeof advocates>;
type NewAdvocate = InferInsertModel<typeof advocates>;

/**
 * Creates a mock Advocate with default values.
 * All fields can be overridden via the overrides parameter.
 *
 * @param overrides - Partial Advocate object to override defaults
 * @returns Complete Advocate object with type safety
 *
 * @example
 * const advocate = createMockAdvocate({ firstName: "Test" });
 */
export function createMockAdvocate(overrides?: Partial<Advocate>): Advocate {
  return {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    specialties: ["Anxiety/Depression", "PTSD"],
    yearsOfExperience: 10,
    phoneNumber: 5551234567,
    createdAt: new Date("2024-01-01"),
    ...overrides,
  };
}

/**
 * Creates a mock NewAdvocate (for inserts) with default values.
 * All fields can be overridden via the overrides parameter.
 *
 * @param overrides - Partial NewAdvocate object to override defaults
 * @returns Complete NewAdvocate object for database inserts
 *
 * @example
 * const newAdvocate = createMockNewAdvocate({ lastName: "Smith" });
 */
export function createMockNewAdvocate(overrides?: Partial<NewAdvocate>): NewAdvocate {
  return {
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    specialties: ["Anxiety/Depression", "PTSD"],
    yearsOfExperience: 10,
    phoneNumber: 5551234567,
    ...overrides,
  };
}

/**
 * Creates an array of mock Advocates for testing list operations.
 *
 * @param count - Number of mock advocates to generate (default: 5)
 * @returns Array of Advocate objects with varied data
 *
 * @example
 * const advocates = createMockAdvocates(10);
 */
export function createMockAdvocates(count: number = 5): Advocate[] {
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
  const degrees: Array<"MD" | "PhD" | "MSW"> = ["MD", "PhD", "MSW"];
  const firstNames = ["John", "Jane", "Alice", "Michael", "Emily", "Chris", "Sarah", "David"];
  const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Davis", "Martinez", "Lee", "Wilson"];
  const specialtySets = [
    ["Anxiety/Depression", "PTSD"],
    ["LGBTQ Counseling", "Family therapy"],
    ["Chronic pain management", "ADHD"],
    ["Career coaching", "Life coaching"],
    ["Trauma counseling", "Grief counseling"],
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: firstNames[i % firstNames.length],
    lastName: lastNames[i % lastNames.length],
    city: cities[i % cities.length],
    degree: degrees[i % degrees.length],
    specialties: specialtySets[i % specialtySets.length],
    yearsOfExperience: 5 + (i % 15),
    phoneNumber: 5551234567 + i,
    createdAt: new Date(`2024-01-${(i % 28) + 1}`),
  }));
}

/**
 * Pre-generated mock advocates array for quick testing.
 * Use this for tests that don't need custom data.
 * Data is aligned with existing test expectations for backward compatibility.
 */
export const mockAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    specialties: ["Cardiology", "Internal Medicine"],
    yearsOfExperience: 15,
    phoneNumber: 5551234567,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    city: "Los Angeles",
    degree: "PhD",
    specialties: ["Pediatrics"],
    yearsOfExperience: 8,
    phoneNumber: 5559876543,
    createdAt: new Date("2024-01-02"),
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    city: "Chicago",
    degree: "MD",
    specialties: ["Surgery", "Trauma"],
    yearsOfExperience: 20,
    phoneNumber: 5555555555,
    createdAt: new Date("2024-01-03"),
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Williams",
    city: "Houston",
    degree: "PhD",
    specialties: ["Psychology", "Counseling"],
    yearsOfExperience: 12,
    phoneNumber: 5551112222,
    createdAt: new Date("2024-01-04"),
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Brown",
    city: "Phoenix",
    degree: "MSW",
    specialties: ["Dentistry", "Orthodontics"],
    yearsOfExperience: 10,
    phoneNumber: 5553334444,
    createdAt: new Date("2024-01-05"),
  },
];

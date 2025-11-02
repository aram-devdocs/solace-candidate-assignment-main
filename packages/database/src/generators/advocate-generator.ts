import { faker } from "@faker-js/faker";
import { generatePhoneNumber } from "./phone-generator";
import { getAllCityNames } from "./city-generator";
import { getAllDegreeCodes } from "./degree-generator";
import { getAllSpecialtyNames } from "./specialty-generator";

/**
 * Denormalized advocate data structure for seeding
 */
export interface GeneratedAdvocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

/**
 * Generate a single advocate with realistic data
 */
export function generateAdvocate(existingPhoneNumbers: Set<string> = new Set()): GeneratedAdvocate {
  const cityNames = getAllCityNames();
  const degreeCodes = getAllDegreeCodes();
  const specialtyNames = getAllSpecialtyNames();

  // Select a random city
  const city = faker.helpers.arrayElement(cityNames);

  // Generate unique phone number for this city
  let phoneNumber: string;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    phoneNumber = generatePhoneNumber(city);
    attempts++;
  } while (existingPhoneNumbers.has(phoneNumber) && attempts < maxAttempts);

  // If we couldn't generate a unique number after max attempts, append random digits
  if (existingPhoneNumbers.has(phoneNumber)) {
    phoneNumber = generatePhoneNumber(city) + faker.string.numeric(2);
  }

  // Select 1-4 specialties (weighted towards 2-3)
  const specialtyCount = faker.helpers.weightedArrayElement([
    { weight: 1, value: 1 },
    { weight: 3, value: 2 },
    { weight: 3, value: 3 },
    { weight: 1, value: 4 },
  ]);

  const specialties = faker.helpers.arrayElements(specialtyNames, specialtyCount);

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    city,
    degree: faker.helpers.arrayElement(degreeCodes),
    specialties,
    yearsOfExperience: faker.number.int({ min: 0, max: 40 }),
    phoneNumber,
  };
}

/**
 * Generate multiple advocates with unique phone numbers
 */
export function generateAdvocates(count: number): GeneratedAdvocate[] {
  const advocates: GeneratedAdvocate[] = [];
  const phoneNumbers = new Set<string>();

  for (let i = 0; i < count; i++) {
    const advocate = generateAdvocate(phoneNumbers);
    phoneNumbers.add(advocate.phoneNumber);
    advocates.push(advocate);
  }

  return advocates;
}

/**
 * Generate advocates with deterministic seeding for testing
 */
export function generateAdvocatesWithSeed(count: number, seed: number): GeneratedAdvocate[] {
  faker.seed(seed);
  return generateAdvocates(count);
}

import { faker } from "@faker-js/faker";

/**
 * US area codes mapped to their respective cities/regions
 */
const AREA_CODE_MAP = {
  "212": ["New York", "Manhattan"],
  "646": ["New York", "Manhattan"],
  "917": ["New York"],
  "718": ["Brooklyn", "Queens", "Bronx"],
  "310": ["Los Angeles", "Santa Monica"],
  "213": ["Los Angeles"],
  "424": ["Los Angeles"],
  "323": ["Los Angeles"],
  "312": ["Chicago"],
  "773": ["Chicago"],
  "872": ["Chicago"],
  "713": ["Houston"],
  "281": ["Houston"],
  "832": ["Houston"],
  "602": ["Phoenix"],
  "480": ["Phoenix", "Scottsdale"],
  "623": ["Phoenix"],
  "215": ["Philadelphia"],
  "267": ["Philadelphia"],
  "445": ["Philadelphia"],
  "210": ["San Antonio"],
  "619": ["San Diego"],
  "858": ["San Diego"],
  "760": ["San Diego"],
  "214": ["Dallas"],
  "469": ["Dallas"],
  "972": ["Dallas"],
  "408": ["San Jose"],
  "669": ["San Jose"],
  "512": ["Austin"],
  "737": ["Austin"],
  "904": ["Jacksonville"],
  "817": ["Fort Worth"],
  "682": ["Fort Worth"],
  "614": ["Columbus"],
  "380": ["Columbus"],
  "704": ["Charlotte"],
  "980": ["Charlotte"],
  "617": ["Boston"],
  "857": ["Boston"],
  "206": ["Seattle"],
  "425": ["Seattle"],
  "503": ["Portland"],
  "971": ["Portland"],
  "303": ["Denver"],
  "720": ["Denver"],
  "415": ["San Francisco"],
  "628": ["San Francisco"],
  "702": ["Las Vegas"],
  "305": ["Miami"],
  "786": ["Miami"],
  "404": ["Atlanta"],
  "678": ["Atlanta"],
  "470": ["Atlanta"],
};

/**
 * Get all valid area codes
 */
export function getAllAreaCodes(): string[] {
  return Object.keys(AREA_CODE_MAP);
}

/**
 * Get area codes for a specific city
 */
export function getAreaCodesForCity(cityName: string): string[] {
  return Object.entries(AREA_CODE_MAP)
    .filter(([_, cities]) => cities.some((city) => city.toLowerCase() === cityName.toLowerCase()))
    .map(([areaCode]) => areaCode);
}

/**
 * Generate a random US phone number with optional city-specific area code
 */
export function generatePhoneNumber(cityName?: string): string {
  let areaCode: string;

  if (cityName) {
    const cityAreaCodes = getAreaCodesForCity(cityName);
    if (cityAreaCodes.length > 0) {
      areaCode = faker.helpers.arrayElement(cityAreaCodes);
    } else {
      // Fallback to random area code if city not found
      areaCode = faker.helpers.arrayElement(getAllAreaCodes());
    }
  } else {
    areaCode = faker.helpers.arrayElement(getAllAreaCodes());
  }

  const exchangeCode = faker.string.numeric(3);
  const lineNumber = faker.string.numeric(4);

  return `${areaCode}${exchangeCode}${lineNumber}`;
}

/**
 * Generate a unique phone number set to avoid duplicates
 */
export function generateUniquePhoneNumbers(count: number, cityName?: string): string[] {
  const phoneNumbers = new Set<string>();

  while (phoneNumbers.size < count) {
    phoneNumbers.add(generatePhoneNumber(cityName));
  }

  return Array.from(phoneNumbers);
}

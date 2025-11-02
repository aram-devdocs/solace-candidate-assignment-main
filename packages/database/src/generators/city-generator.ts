/**
 * Comprehensive list of US cities with their state codes
 */
export const CITY_DATA = [
  // Major metros
  { name: "New York", stateCode: "NY" },
  { name: "Los Angeles", stateCode: "CA" },
  { name: "Chicago", stateCode: "IL" },
  { name: "Houston", stateCode: "TX" },
  { name: "Phoenix", stateCode: "AZ" },
  { name: "Philadelphia", stateCode: "PA" },
  { name: "San Antonio", stateCode: "TX" },
  { name: "San Diego", stateCode: "CA" },
  { name: "Dallas", stateCode: "TX" },
  { name: "San Jose", stateCode: "CA" },
  { name: "Austin", stateCode: "TX" },
  { name: "Jacksonville", stateCode: "FL" },
  { name: "Fort Worth", stateCode: "TX" },
  { name: "Columbus", stateCode: "OH" },
  { name: "Charlotte", stateCode: "NC" },

  // Additional major cities
  { name: "San Francisco", stateCode: "CA" },
  { name: "Indianapolis", stateCode: "IN" },
  { name: "Seattle", stateCode: "WA" },
  { name: "Denver", stateCode: "CO" },
  { name: "Boston", stateCode: "MA" },
  { name: "El Paso", stateCode: "TX" },
  { name: "Nashville", stateCode: "TN" },
  { name: "Detroit", stateCode: "MI" },
  { name: "Portland", stateCode: "OR" },
  { name: "Las Vegas", stateCode: "NV" },
  { name: "Memphis", stateCode: "TN" },
  { name: "Louisville", stateCode: "KY" },
  { name: "Baltimore", stateCode: "MD" },
  { name: "Milwaukee", stateCode: "WI" },
  { name: "Albuquerque", stateCode: "NM" },
  { name: "Tucson", stateCode: "AZ" },
  { name: "Fresno", stateCode: "CA" },
  { name: "Mesa", stateCode: "AZ" },
  { name: "Sacramento", stateCode: "CA" },
  { name: "Atlanta", stateCode: "GA" },
  { name: "Kansas City", stateCode: "MO" },
  { name: "Colorado Springs", stateCode: "CO" },
  { name: "Raleigh", stateCode: "NC" },
  { name: "Miami", stateCode: "FL" },
  { name: "Long Beach", stateCode: "CA" },
  { name: "Virginia Beach", stateCode: "VA" },
  { name: "Omaha", stateCode: "NE" },
  { name: "Oakland", stateCode: "CA" },
  { name: "Minneapolis", stateCode: "MN" },
  { name: "Tulsa", stateCode: "OK" },
  { name: "Tampa", stateCode: "FL" },
  { name: "Arlington", stateCode: "TX" },
  { name: "New Orleans", stateCode: "LA" },
  { name: "Wichita", stateCode: "KS" },
  { name: "Cleveland", stateCode: "OH" },
  { name: "Bakersfield", stateCode: "CA" },
  { name: "Aurora", stateCode: "CO" },
  { name: "Anaheim", stateCode: "CA" },
  { name: "Honolulu", stateCode: "HI" },
  { name: "Santa Ana", stateCode: "CA" },
  { name: "Riverside", stateCode: "CA" },
  { name: "Corpus Christi", stateCode: "TX" },
  { name: "Lexington", stateCode: "KY" },
  { name: "Stockton", stateCode: "CA" },
  { name: "Henderson", stateCode: "NV" },
  { name: "Saint Paul", stateCode: "MN" },
  { name: "Cincinnati", stateCode: "OH" },
  { name: "Pittsburgh", stateCode: "PA" },
  { name: "Greensboro", stateCode: "NC" },
  { name: "Anchorage", stateCode: "AK" },
  { name: "Plano", stateCode: "TX" },
  { name: "Lincoln", stateCode: "NE" },
  { name: "Orlando", stateCode: "FL" },
  { name: "Irvine", stateCode: "CA" },
  { name: "Newark", stateCode: "NJ" },
  { name: "Durham", stateCode: "NC" },
  { name: "Chula Vista", stateCode: "CA" },
  { name: "Toledo", stateCode: "OH" },
  { name: "Fort Wayne", stateCode: "IN" },
  { name: "St. Petersburg", stateCode: "FL" },
  { name: "Laredo", stateCode: "TX" },
  { name: "Jersey City", stateCode: "NJ" },
  { name: "Chandler", stateCode: "AZ" },
  { name: "Madison", stateCode: "WI" },
  { name: "Lubbock", stateCode: "TX" },
  { name: "Scottsdale", stateCode: "AZ" },
  { name: "Reno", stateCode: "NV" },
  { name: "Buffalo", stateCode: "NY" },
  { name: "Gilbert", stateCode: "AZ" },
  { name: "Glendale", stateCode: "AZ" },
  { name: "North Las Vegas", stateCode: "NV" },
  { name: "Winston-Salem", stateCode: "NC" },
  { name: "Chesapeake", stateCode: "VA" },
  { name: "Norfolk", stateCode: "VA" },
  { name: "Fremont", stateCode: "CA" },
  { name: "Garland", stateCode: "TX" },
  { name: "Irving", stateCode: "TX" },
  { name: "Hialeah", stateCode: "FL" },
  { name: "Richmond", stateCode: "VA" },
  { name: "Boise", stateCode: "ID" },
  { name: "Spokane", stateCode: "WA" },
  { name: "Baton Rouge", stateCode: "LA" },
];

/**
 * Get all city names
 */
export function getAllCityNames(): string[] {
  return CITY_DATA.map((city) => city.name);
}

/**
 * Get city data by name
 */
export function getCityByName(name: string): { name: string; stateCode: string } | undefined {
  return CITY_DATA.find((city) => city.name.toLowerCase() === name.toLowerCase());
}

/**
 * Get cities by state code
 */
export function getCitiesByState(stateCode: string): { name: string; stateCode: string }[] {
  return CITY_DATA.filter((city) => city.stateCode === stateCode.toUpperCase());
}

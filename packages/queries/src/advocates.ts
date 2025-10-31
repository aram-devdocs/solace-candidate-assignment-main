import type { Advocate } from "@repo/types";

/**
 * API response structure for advocates endpoint.
 */
interface AdvocatesResponse {
  data: Advocate[];
}

/**
 * Fetches all advocates from the API.
 *
 * Makes a request to the /api/advocates endpoint and returns
 * the advocate data in a type-safe manner.
 *
 * @returns Promise resolving to array of advocates
 * @throws Error if the fetch fails or returns invalid data
 *
 * @example
 * const advocates = await fetchAdvocates();
 * advocates.forEach(advocate => console.log(advocate.firstName));
 */
export async function fetchAdvocates(): Promise<Advocate[]> {
  const response = await fetch("/api/advocates");

  if (!response.ok) {
    throw new Error(`Failed to fetch advocates: ${response.statusText}`);
  }

  const jsonResponse: AdvocatesResponse = await response.json();

  return jsonResponse.data;
}

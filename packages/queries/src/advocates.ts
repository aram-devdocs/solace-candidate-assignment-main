import type { Advocate } from "@repo/types";
import { apiClient, type ApiResponse } from "./client";

/**
 * Fetches all advocates from the API.
 *
 * Makes a request to the /api/advocates endpoint using the centralized
 * API client and returns the full API response structure.
 *
 * @returns Promise resolving to API response with advocates data or error
 * @throws Error if the network request fails or response cannot be parsed
 *
 * @example
 * const response = await fetchAdvocates();
 * if (response.success) {
 *   response.data.forEach(advocate => console.log(advocate.firstName));
 * } else {
 *   console.error(response.error.message);
 * }
 */
export async function fetchAdvocates(): Promise<ApiResponse<Advocate[]>> {
  return apiClient<Advocate[]>("/api/advocates");
}

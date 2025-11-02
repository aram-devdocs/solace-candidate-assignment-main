/**
 * Type definition for successful API responses.
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * Type definition for API error responses.
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string;
  };
}

/**
 * Union type for all possible API responses.
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Configuration options for API requests.
 */
// eslint-disable-next-line no-undef
interface ApiClientConfig extends RequestInit {
  baseUrl?: string;
}

const DEFAULT_BASE_URL = "";

/**
 * Centralized API client for making HTTP requests.
 *
 * Provides a single source of truth for API configuration, error handling,
 * and response parsing. All query functions should use this client to
 * ensure consistent behavior across the application.
 *
 * @param endpoint - The API endpoint path (e.g., "/api/advocates")
 * @param config - Optional request configuration
 * @returns Promise resolving to the full API response structure
 * @throws Error if network request fails or response cannot be parsed
 *
 * @example
 * const response = await apiClient<Advocate[]>("/api/advocates");
 * if (response.success) {
 *   console.log(response.data);
 * } else {
 *   console.error(response.error.message);
 * }
 */
export async function apiClient<T>(
  endpoint: string,
  config?: ApiClientConfig
): Promise<ApiResponse<T>> {
  const { baseUrl = DEFAULT_BASE_URL, headers, ...fetchConfig } = config || {};
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    ...fetchConfig,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const jsonResponse: ApiResponse<T> = await response.json();

  return jsonResponse;
}

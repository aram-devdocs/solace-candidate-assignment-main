import { readdir } from "fs/promises";
import { join, relative } from "path";
import type { HttpMethod, RouteMetadata } from "./types";

/**
 * HTTP methods supported by Next.js App Router
 */
const SUPPORTED_METHODS: HttpMethod[] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
];

/**
 * Scans a directory recursively for Next.js App Router route files
 *
 * @param rootDir - The root directory to scan (e.g., /path/to/apps/web/src/app/api)
 * @returns Array of route metadata for all discovered routes
 */
export async function scanRoutes(rootDir: string): Promise<RouteMetadata[]> {
  const routes: RouteMetadata[] = [];

  async function scanDirectory(dir: string): Promise<void> {
    try {
      const entries = await readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
          // Recursively scan subdirectories
          await scanDirectory(fullPath);
        } else if (entry.isFile() && entry.name === "route.ts") {
          // Found a route file
          const route = await extractRouteMetadata(fullPath, rootDir);
          if (route) {
            routes.push(route);
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }

  await scanDirectory(rootDir);
  return routes;
}

/**
 * Extracts metadata from a route file
 *
 * @param filePath - Full path to the route.ts file
 * @param rootDir - Root directory for calculating relative paths
 * @returns Route metadata or null if the file couldn't be processed
 */
async function extractRouteMetadata(
  filePath: string,
  rootDir: string
): Promise<RouteMetadata | null> {
  try {
    // Calculate the API path from the file path
    // e.g., /path/to/app/api/advocates/route.ts -> /api/advocates
    const relativePath = relative(rootDir, filePath);
    const pathSegments = relativePath.split("/").slice(0, -1); // Remove "route.ts"
    const apiPath = "/api/" + pathSegments.join("/");

    // Dynamically import the route file to detect exported methods
    // Note: This only works at runtime, not during build
    const methods = await detectExportedMethods(filePath);

    return {
      path: apiPath,
      methods,
      filePath,
    };
  } catch (error) {
    console.error(`Error extracting metadata from ${filePath}:`, error);
    return null;
  }
}

/**
 * Detects which HTTP methods are exported from a route file
 *
 * @param filePath - Path to the route file
 * @returns Array of HTTP methods exported by the route
 */
async function detectExportedMethods(filePath: string): Promise<HttpMethod[]> {
  try {
    // Dynamically import the route module
    const module = await import(filePath);
    const exportedMethods: HttpMethod[] = [];

    // Check which HTTP methods are exported
    for (const method of SUPPORTED_METHODS) {
      if (typeof module[method] === "function") {
        exportedMethods.push(method);
      }
    }

    return exportedMethods;
  } catch (error) {
    console.error(`Error detecting methods in ${filePath}:`, error);
    // Fallback: assume GET if we can't detect
    return ["GET"];
  }
}

/**
 * Groups routes by their first path segment (tag)
 *
 * @param routes - Array of route metadata
 * @returns Map of tag name to routes
 *
 * @example
 * Input: [{ path: "/api/advocates" }, { path: "/api/advocates/filter-options" }]
 * Output: { "advocates": [...] }
 */
export function groupRoutesByTag(routes: RouteMetadata[]): Map<string, RouteMetadata[]> {
  const grouped = new Map<string, RouteMetadata[]>();

  for (const route of routes) {
    // Extract tag from path: /api/advocates/filter-options -> advocates
    const segments = route.path.split("/").filter(Boolean);
    const tag = segments[1] || "default"; // segments[0] is "api", segments[1] is the resource

    if (!grouped.has(tag)) {
      grouped.set(tag, []);
    }
    grouped.get(tag)!.push(route);
  }

  return grouped;
}

/**
 * Filters out routes that should not be included in public documentation
 *
 * @param routes - Array of route metadata
 * @returns Filtered array excluding internal/development routes
 */
export function filterPublicRoutes(routes: RouteMetadata[]): RouteMetadata[] {
  return routes.filter((route) => {
    // Exclude certain paths from public docs
    const excludePatterns = [
      /\/api\/openapi\.json/, // Don't document the OpenAPI endpoint itself
      /\/api\/internal\//, // Exclude any internal endpoints
    ];

    return !excludePatterns.some((pattern) => pattern.test(route.path));
  });
}

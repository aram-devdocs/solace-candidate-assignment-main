import type { OpenAPIObject, PathItemObject } from "openapi3-ts/oas31";
import type { HttpMethod, OpenAPIConfig } from "./types";
import { scanRoutes, filterPublicRoutes, groupRoutesByTag } from "./scanner";
import { getRouteDocumentation } from "./documentation";

/**
 * Generates a complete OpenAPI specification by scanning routes
 *
 * @param config - Configuration for the OpenAPI spec
 * @returns Complete OpenAPI 3.1 specification object
 */
export async function generateOpenAPISpec(config: OpenAPIConfig): Promise<OpenAPIObject> {
  const { title, description, version, baseUrl = "", routesDir } = config;

  // Scan for all routes in the specified directory
  const allRoutes = await scanRoutes(routesDir || "");
  const publicRoutes = filterPublicRoutes(allRoutes);

  // Build the paths object
  const paths: OpenAPIObject["paths"] = {};

  for (const route of publicRoutes) {
    const pathItem: PathItemObject = {};

    // Add documentation for each HTTP method
    for (const method of route.methods) {
      const documentation = getRouteDocumentation(route.path, method);
      const methodKey = method.toLowerCase() as Lowercase<HttpMethod>;
      pathItem[methodKey] = documentation;
    }

    paths[route.path] = pathItem;
  }

  // Extract unique tags from routes for organization
  const routesByTag = groupRoutesByTag(publicRoutes);
  const tags = Array.from(routesByTag.keys()).map((tag) => ({
    name: tag,
    description: `Operations related to ${tag}`,
  }));

  // Build the complete OpenAPI spec
  const spec: OpenAPIObject = {
    openapi: "3.1.0",
    info: {
      title,
      description,
      version,
    },
    servers: baseUrl
      ? [
          {
            url: baseUrl,
            description: "API Server",
          },
        ]
      : [],
    tags,
    paths,
  };

  return spec;
}

/**
 * Creates a basic OpenAPI spec without scanning (for static generation)
 *
 * @param config - Configuration for the OpenAPI spec
 * @param paths - Pre-defined paths object
 * @returns OpenAPI specification object
 */
export function createOpenAPISpec(
  config: OpenAPIConfig,
  paths: OpenAPIObject["paths"]
): OpenAPIObject {
  const { title, description, version, baseUrl = "" } = config;

  return {
    openapi: "3.1.0",
    info: {
      title,
      description,
      version,
    },
    servers: baseUrl
      ? [
          {
            url: baseUrl,
            description: "API Server",
          },
        ]
      : [],
    paths,
  };
}

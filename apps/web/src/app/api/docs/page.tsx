"use client";

/**
 * API Documentation Page
 *
 * Renders the Scalar API reference UI for the Goud Network Advocates API.
 * The OpenAPI specification is fetched from /api/openapi.json.
 *
 * This page is publicly accessible and provides interactive API documentation
 * with a "Try it out" feature for testing endpoints.
 */
export default function APIDocsPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <iframe
        src="/api/reference"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="API Documentation"
      />
    </div>
  );
}

import { getAllAdvocates } from "@repo/services";

/**
 * GET /api/advocates
 * Returns all advocates from the database.
 */
export async function GET() {
  try {
    const data = await getAllAdvocates();
    return Response.json({ data });
  } catch (error) {
    console.error("Failed to fetch advocates:", error);
    return Response.json({ error: "Failed to fetch advocates" }, { status: 500 });
  }
}

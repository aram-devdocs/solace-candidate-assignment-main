import { advocateData } from "@repo/database";

export async function GET() {
  // To use database instead of hardcoded data:
  // import { db, advocates } from "@repo/database";
  // const data = await db.select().from(advocates);

  const data = advocateData;

  return Response.json({ data });
}

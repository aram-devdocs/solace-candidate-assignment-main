import { db, advocates, advocateData } from "@repo/database";

export async function POST() {
  const records = await db.insert(advocates).values(advocateData).returning();

  return Response.json({ advocates: records });
}

import { db, advocates } from "@repo/database";
import { eq } from "drizzle-orm";
import type { Advocate } from "@repo/types";

/**
 * Retrieves all advocates from the database.
 *
 * @returns Promise resolving to array of all advocates
 * @throws Error if database query fails
 *
 * @example
 * const advocates = await getAllAdvocates();
 */
export async function getAllAdvocates(): Promise<Advocate[]> {
  try {
    return await db.select().from(advocates);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to retrieve advocates: ${errorMessage}`);
  }
}

/**
 * Retrieves a single advocate by ID.
 *
 * @param id - Advocate ID
 * @returns Promise resolving to advocate or null if not found
 * @throws Error if database query fails
 *
 * @example
 * const advocate = await getAdvocateById(123);
 * if (advocate) {
 *   console.log(advocate.firstName);
 * }
 */
export async function getAdvocateById(id: number): Promise<Advocate | null> {
  try {
    const results = await db.select().from(advocates).where(eq(advocates.id, id));
    return results[0] || null;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to retrieve advocate ${id}: ${errorMessage}`);
  }
}

import { db, advocates } from "@repo/database";
import { eq } from "drizzle-orm";
import type { Advocate, Result } from "@repo/types";
import { success, failure, DatabaseError, NotFoundError, toAppError } from "@repo/types";

/**
 * Retrieves all advocates from the database.
 *
 * @returns Promise resolving to Result containing array of advocates or error
 *
 * @example
 * const result = await getAllAdvocates();
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   console.error(result.error.message);
 * }
 */
export async function getAllAdvocates(): Promise<Result<Advocate[], DatabaseError>> {
  try {
    const data = await db.select().from(advocates);
    return success(data);
  } catch (error) {
    const appError = toAppError(error);
    return failure(new DatabaseError("Failed to retrieve advocates", appError.message));
  }
}

/**
 * Retrieves a single advocate by ID.
 *
 * @param id - Advocate ID
 * @returns Promise resolving to Result containing advocate or error
 *
 * @example
 * const result = await getAdvocateById(123);
 * if (result.success) {
 *   console.log(result.data.firstName);
 * } else {
 *   console.error(result.error.message);
 * }
 */
export async function getAdvocateById(
  id: number
): Promise<Result<Advocate, DatabaseError | NotFoundError>> {
  try {
    const results = await db.select().from(advocates).where(eq(advocates.id, id));

    if (!results[0]) {
      return failure(new NotFoundError("Advocate", id));
    }

    return success(results[0]);
  } catch (error) {
    const appError = toAppError(error);
    return failure(new DatabaseError(`Failed to retrieve advocate ${id}`, appError.message));
  }
}

/**
 * Client-side sorting utilities for advocates
 * Used when data is already cached to provide instant sorting without API calls
 */

import type { AdvocateWithRelations } from "@repo/types";
import type { SortableColumn, SortDirection } from "./sort-types";

/**
 * Sorts advocates by the specified column and direction
 */
export function sortAdvocates(
  advocates: AdvocateWithRelations[],
  column: SortableColumn,
  direction: SortDirection
): AdvocateWithRelations[] {
  if (!column) return advocates;

  const sorted = [...advocates].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (column) {
      case "firstName":
        aValue = a.firstName.toLowerCase();
        bValue = b.firstName.toLowerCase();
        break;
      case "lastName":
        aValue = a.lastName.toLowerCase();
        bValue = b.lastName.toLowerCase();
        break;
      case "city":
        aValue = a.city.name.toLowerCase();
        bValue = b.city.name.toLowerCase();
        break;
      case "degree":
        aValue = a.degree.code.toLowerCase();
        bValue = b.degree.code.toLowerCase();
        break;
      case "yearsOfExperience":
        aValue = a.yearsOfExperience;
        bValue = b.yearsOfExperience;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
}

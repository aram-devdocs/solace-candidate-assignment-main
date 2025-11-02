import { db, advocates, cities, degrees, specialties, advocateSpecialties } from "@repo/database";
import { eq, and, or, gte, lte, ilike, sql, desc, asc, inArray, SQL } from "drizzle-orm";
import type {
  Advocate,
  AdvocateWithRelations,
  AdvocateFilters,
  AdvocateSortConfig,
  PaginatedResponse,
  PaginationMetadata,
  AdvocateFilterOptions,
  Result,
} from "@repo/types";
import { success, failure, DatabaseError, NotFoundError, toAppError } from "@repo/types";
import {
  getCached,
  setCache,
  invalidatePattern,
  CacheTTL,
  filterOptionsKey,
  paginatedResultsKey,
  searchResultsKey,
  totalCountKey,
  advocateDetailKey,
  allAdvocatesPattern,
} from "@repo/cache";

/**
 * Retrieves all advocates from the database.
 * DEPRECATED: Use getAdvocatesPaginated for better performance at scale.
 *
 * @returns Promise resolving to Result containing array of advocates or error
 */
export async function getAllAdvocates(): Promise<Result<Advocate[], DatabaseError>> {
  try {
    const data = await db.select().from(advocates).where(eq(advocates.isActive, true));
    return success(data);
  } catch (error) {
    const appError = toAppError(error);
    return failure(new DatabaseError("Failed to retrieve advocates", appError.message));
  }
}

/**
 * Retrieves a single advocate by ID with full relations (city, degree, specialties).
 * Uses Redis caching for faster subsequent requests.
 *
 * @param id - Advocate ID
 * @returns Promise resolving to Result containing advocate with relations or error
 */
export async function getAdvocateById(
  id: number
): Promise<Result<AdvocateWithRelations, DatabaseError | NotFoundError>> {
  try {
    // Try cache first
    const cacheKey = advocateDetailKey(id);
    const cached = await getCached<AdvocateWithRelations>(cacheKey);
    if (cached) {
      return success(cached);
    }

    // Query database with relations
    const results = await db
      .select({
        advocate: advocates,
        city: cities,
        degree: degrees,
      })
      .from(advocates)
      .leftJoin(cities, eq(advocates.cityId, cities.id))
      .leftJoin(degrees, eq(advocates.degreeId, degrees.id))
      .where(and(eq(advocates.id, id), eq(advocates.isActive, true)))
      .limit(1);

    if (!results[0] || !results[0].city || !results[0].degree) {
      return failure(new NotFoundError("Advocate", id));
    }

    // Get specialties
    const advocateSpecialtyRecords = await db
      .select({
        specialty: specialties,
      })
      .from(advocateSpecialties)
      .leftJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id))
      .where(eq(advocateSpecialties.advocateId, id));

    const advocateWithRelations: AdvocateWithRelations = {
      ...results[0].advocate,
      city: results[0].city,
      degree: results[0].degree,
      advocateSpecialties: advocateSpecialtyRecords.map((record) => ({
        specialty: record.specialty!,
      })),
    };

    // Cache for 10 minutes
    await setCache(cacheKey, advocateWithRelations, CacheTTL.ADVOCATE_DETAIL);

    return success(advocateWithRelations);
  } catch (error) {
    const appError = toAppError(error);
    return failure(new DatabaseError(`Failed to retrieve advocate ${id}`, appError.message));
  }
}

/**
 * Builds WHERE clause conditions from filter criteria.
 */
function buildFilterConditions(filters?: AdvocateFilters): SQL<unknown> | undefined {
  const conditions: SQL<unknown>[] = [eq(advocates.isActive, true)];

  if (!filters) {
    return and(...conditions);
  }

  // City filter
  if (filters.cityIds && filters.cityIds.length > 0) {
    conditions.push(inArray(advocates.cityId, filters.cityIds));
  }

  // Degree filter
  if (filters.degreeIds && filters.degreeIds.length > 0) {
    conditions.push(inArray(advocates.degreeId, filters.degreeIds));
  }

  // Experience range filter
  if (filters.minExperience !== undefined) {
    conditions.push(gte(advocates.yearsOfExperience, filters.minExperience));
  }
  if (filters.maxExperience !== undefined) {
    conditions.push(lte(advocates.yearsOfExperience, filters.maxExperience));
  }

  // Text search filter (searches first name and last name)
  if (filters.search && filters.search.trim()) {
    const searchTerm = `%${filters.search.trim()}%`;
    conditions.push(
      or(ilike(advocates.firstName, searchTerm), ilike(advocates.lastName, searchTerm))!
    );
  }

  return and(...conditions);
}

/**
 * Builds ORDER BY clause from sort configuration.
 */
function buildOrderBy(sortConfig?: AdvocateSortConfig): SQL<unknown> {
  if (!sortConfig) {
    return desc(advocates.createdAt);
  }

  const column = {
    firstName: advocates.firstName,
    lastName: advocates.lastName,
    city: advocates.cityId,
    degree: advocates.degreeId,
    yearsOfExperience: advocates.yearsOfExperience,
    createdAt: advocates.createdAt,
  }[sortConfig.column];

  return sortConfig.direction === "asc" ? asc(column) : desc(column);
}

/**
 * Retrieves paginated advocates with filtering, sorting, and caching.
 * This is the primary method for fetching advocates at scale.
 *
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of items per page
 * @param filters - Optional filter criteria
 * @param sort - Optional sort configuration
 * @returns Promise resolving to paginated results with metadata
 */
export async function getAdvocatesPaginated(
  page: number = 1,
  pageSize: number = 25,
  filters?: AdvocateFilters,
  sort?: AdvocateSortConfig
): Promise<Result<PaginatedResponse<AdvocateWithRelations>, DatabaseError>> {
  try {
    // Generate cache key
    const cacheKey = paginatedResultsKey({ page, pageSize, filters, sort });

    // Try cache first
    const cached = await getCached<PaginatedResponse<AdvocateWithRelations>>(cacheKey);
    if (cached) {
      return success(cached);
    }

    // Build query conditions
    const whereConditions = buildFilterConditions(filters);
    const orderBy = buildOrderBy(sort);

    // Get total count (with caching)
    const countCacheKey = totalCountKey({ filters });
    let totalRecords = await getCached<number>(countCacheKey);

    if (totalRecords === null) {
      const countResult = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(advocates)
        .where(whereConditions);
      totalRecords = countResult[0]?.count ?? 0;
      await setCache(countCacheKey, totalRecords, CacheTTL.TOTAL_COUNT);
    }

    // Calculate pagination
    const offset = (page - 1) * pageSize;
    const totalPages = Math.ceil(totalRecords / pageSize);

    // Fetch advocates with basic relations
    const advocateResults = await db
      .select({
        advocate: advocates,
        city: cities,
        degree: degrees,
      })
      .from(advocates)
      .leftJoin(cities, eq(advocates.cityId, cities.id))
      .leftJoin(degrees, eq(advocates.degreeId, degrees.id))
      .where(whereConditions)
      .orderBy(orderBy)
      .limit(pageSize)
      .offset(offset);

    // Get advocate IDs for specialty lookup
    const advocateIds = advocateResults.map((r) => r.advocate.id);

    // Fetch all specialties for these advocates in one query
    const specialtyRecords =
      advocateIds.length > 0
        ? await db
            .select({
              advocateId: advocateSpecialties.advocateId,
              specialty: specialties,
            })
            .from(advocateSpecialties)
            .leftJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id))
            .where(inArray(advocateSpecialties.advocateId, advocateIds))
        : [];

    // Group specialties by advocate ID
    const specialtiesByAdvocate = specialtyRecords.reduce(
      (acc, record) => {
        if (!acc[record.advocateId]) {
          acc[record.advocateId] = [];
        }
        if (record.specialty) {
          acc[record.advocateId].push({ specialty: record.specialty });
        }
        return acc;
      },
      {} as Record<number, Array<{ specialty: typeof specialties.$inferSelect }>>
    );

    // Combine data
    const advocatesWithRelations: AdvocateWithRelations[] = advocateResults.map((result) => ({
      ...result.advocate,
      city: result.city!,
      degree: result.degree!,
      advocateSpecialties: specialtiesByAdvocate[result.advocate.id] || [],
    }));

    // Build pagination metadata
    const pagination: PaginationMetadata = {
      currentPage: page,
      pageSize,
      totalRecords,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };

    const response: PaginatedResponse<AdvocateWithRelations> = {
      data: advocatesWithRelations,
      pagination,
    };

    // Cache for 5 minutes
    await setCache(cacheKey, response, CacheTTL.PAGINATED_RESULTS);

    return success(response);
  } catch (error) {
    const appError = toAppError(error);
    return failure(new DatabaseError("Failed to retrieve paginated advocates", appError.message));
  }
}

/**
 * Performs full-text search on advocates using PostgreSQL's full-text search.
 * Searches first name, last name, and ranks results by relevance.
 *
 * @param searchTerm - Text to search for
 * @param page - Page number
 * @param pageSize - Items per page
 * @returns Promise resolving to paginated search results
 */
export async function searchAdvocates(
  searchTerm: string,
  page: number = 1,
  pageSize: number = 25
): Promise<Result<PaginatedResponse<AdvocateWithRelations>, DatabaseError>> {
  if (!searchTerm.trim()) {
    return getAdvocatesPaginated(page, pageSize);
  }

  try {
    // Generate cache key
    const cacheKey = searchResultsKey(searchTerm, page, pageSize);

    // Try cache first
    const cached = await getCached<PaginatedResponse<AdvocateWithRelations>>(cacheKey);
    if (cached) {
      return success(cached);
    }

    const offset = (page - 1) * pageSize;

    // Use PostgreSQL full-text search with ranking
    const searchQuery = sql`to_tsquery('english', ${searchTerm.trim().replace(/\s+/g, " & ")})`;
    const rankExpression = sql`ts_rank(to_tsvector('english', ${advocates.firstName} || ' ' || ${advocates.lastName}), ${searchQuery})`;

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(advocates)
      .where(
        and(
          eq(advocates.isActive, true),
          sql`to_tsvector('english', ${advocates.firstName} || ' ' || ${advocates.lastName}) @@ ${searchQuery}`
        )
      );

    const totalRecords = countResult[0]?.count ?? 0;
    const totalPages = Math.ceil(totalRecords / pageSize);

    // Fetch results ordered by rank
    const advocateResults = await db
      .select({
        advocate: advocates,
        city: cities,
        degree: degrees,
        rank: rankExpression,
      })
      .from(advocates)
      .leftJoin(cities, eq(advocates.cityId, cities.id))
      .leftJoin(degrees, eq(advocates.degreeId, degrees.id))
      .where(
        and(
          eq(advocates.isActive, true),
          sql`to_tsvector('english', ${advocates.firstName} || ' ' || ${advocates.lastName}) @@ ${searchQuery}`
        )
      )
      .orderBy(desc(rankExpression))
      .limit(pageSize)
      .offset(offset);

    // Get specialties
    const advocateIds = advocateResults.map((r) => r.advocate.id);
    const specialtyRecords =
      advocateIds.length > 0
        ? await db
            .select({
              advocateId: advocateSpecialties.advocateId,
              specialty: specialties,
            })
            .from(advocateSpecialties)
            .leftJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id))
            .where(inArray(advocateSpecialties.advocateId, advocateIds))
        : [];

    const specialtiesByAdvocate = specialtyRecords.reduce(
      (acc, record) => {
        if (!acc[record.advocateId]) {
          acc[record.advocateId] = [];
        }
        if (record.specialty) {
          acc[record.advocateId].push({ specialty: record.specialty });
        }
        return acc;
      },
      {} as Record<number, Array<{ specialty: typeof specialties.$inferSelect }>>
    );

    const advocatesWithRelations: AdvocateWithRelations[] = advocateResults.map((result) => ({
      ...result.advocate,
      city: result.city!,
      degree: result.degree!,
      advocateSpecialties: specialtiesByAdvocate[result.advocate.id] || [],
    }));

    const pagination: PaginationMetadata = {
      currentPage: page,
      pageSize,
      totalRecords,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };

    const response: PaginatedResponse<AdvocateWithRelations> = {
      data: advocatesWithRelations,
      pagination,
    };

    // Cache for 3 minutes
    await setCache(cacheKey, response, CacheTTL.SEARCH_RESULTS);

    return success(response);
  } catch (error) {
    const appError = toAppError(error);
    return failure(new DatabaseError("Failed to search advocates", appError.message));
  }
}

/**
 * Gets available filter options with counts for each option.
 * Used to populate filter dropdowns in the UI.
 * Heavily cached (1 hour) as this data changes infrequently.
 *
 * @returns Promise resolving to filter options with counts
 */
export async function getAdvocateFilterOptions(): Promise<
  Result<AdvocateFilterOptions, DatabaseError>
> {
  try {
    // Try cache first
    const cacheKey = filterOptionsKey();
    const cached = await getCached<AdvocateFilterOptions>(cacheKey);
    if (cached) {
      return success(cached);
    }

    // Get cities with counts
    const citiesWithCounts = await db
      .select({
        id: cities.id,
        name: cities.name,
        count: sql<number>`count(${advocates.id})::int`,
      })
      .from(cities)
      .leftJoin(advocates, and(eq(cities.id, advocates.cityId), eq(advocates.isActive, true)))
      .groupBy(cities.id, cities.name)
      .having(sql`count(${advocates.id}) > 0`)
      .orderBy(cities.name);

    // Get degrees with counts
    const degreesWithCounts = await db
      .select({
        id: degrees.id,
        code: degrees.code,
        name: degrees.name,
        count: sql<number>`count(${advocates.id})::int`,
      })
      .from(degrees)
      .leftJoin(advocates, and(eq(degrees.id, advocates.degreeId), eq(advocates.isActive, true)))
      .groupBy(degrees.id, degrees.code, degrees.name)
      .having(sql`count(${advocates.id}) > 0`)
      .orderBy(degrees.code);

    // Get specialties with counts
    const specialtiesWithCounts = await db
      .select({
        id: specialties.id,
        name: specialties.name,
        count: sql<number>`count(distinct ${advocateSpecialties.advocateId})::int`,
      })
      .from(specialties)
      .leftJoin(advocateSpecialties, eq(specialties.id, advocateSpecialties.specialtyId))
      .leftJoin(
        advocates,
        and(eq(advocateSpecialties.advocateId, advocates.id), eq(advocates.isActive, true))
      )
      .groupBy(specialties.id, specialties.name)
      .having(sql`count(distinct ${advocateSpecialties.advocateId}) > 0`)
      .orderBy(specialties.name);

    const filterOptions: AdvocateFilterOptions = {
      cities: citiesWithCounts,
      degrees: degreesWithCounts,
      specialties: specialtiesWithCounts,
    };

    // Cache for 1 hour
    await setCache(cacheKey, filterOptions, CacheTTL.FILTER_OPTIONS);

    return success(filterOptions);
  } catch (error) {
    const appError = toAppError(error);
    return failure(new DatabaseError("Failed to retrieve filter options", appError.message));
  }
}

/**
 * Invalidates all advocate-related caches.
 * Should be called after any advocate create/update/delete operations.
 *
 * @returns Promise resolving to number of cache keys invalidated
 */
export async function invalidateAdvocateCaches(): Promise<number> {
  try {
    return await invalidatePattern(allAdvocatesPattern());
  } catch (error) {
    console.error("Failed to invalidate advocate caches:", error);
    return 0;
  }
}

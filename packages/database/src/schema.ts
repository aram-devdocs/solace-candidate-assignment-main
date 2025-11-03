import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  timestamp,
  boolean,
  check,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * Lookup table for degrees (MD, PhD, MSW, etc.)
 */
export const degrees = pgTable("degrees", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

/**
 * Lookup table for cities
 */
export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  stateCode: text("state_code"),
  countryCode: text("country_code").default("US").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

/**
 * Lookup table for specialties
 */
export const specialties = pgTable("specialties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  category: text("category"),
  description: text("description"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

/**
 * Main advocates table with normalized relationships
 */
export const advocates = pgTable(
  "advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    cityId: integer("city_id")
      .references(() => cities.id)
      .notNull(),
    degreeId: integer("degree_id")
      .references(() => degrees.id)
      .notNull(),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: text("phone_number").notNull().unique(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    // Check constraint for non-negative experience
    experienceCheck: check("experience_check", sql`${table.yearsOfExperience} >= 0`),
    // Single column indexes
    cityIdx: index("idx_advocates_city").on(table.cityId),
    degreeIdx: index("idx_advocates_degree").on(table.degreeId),
    experienceIdx: index("idx_advocates_experience").on(table.yearsOfExperience),
    // Composite indexes for common filter combinations
    cityDegreeIdx: index("idx_advocates_city_degree").on(table.cityId, table.degreeId),
    cityDegreeExpIdx: index("idx_advocates_city_degree_exp").on(
      table.cityId,
      table.degreeId,
      table.yearsOfExperience
    ),
    // Partial index for active non-deleted records (common query pattern)
    activePaginationIdx: index("idx_advocates_active_pagination")
      .on(table.isActive, table.createdAt)
      .where(sql`${table.deletedAt} IS NULL`),
    // Full-text search index on names
    nameSearchIdx: index("idx_advocates_name_search").using(
      "gin",
      sql`to_tsvector('english', ${table.firstName} || ' ' || ${table.lastName})`
    ),
    // Trigram indexes for fast partial name search (ILIKE queries)
    firstNameTrgmIdx: index("idx_advocates_first_name_trgm").using(
      "gin",
      sql`${table.firstName} gin_trgm_ops`
    ),
    lastNameTrgmIdx: index("idx_advocates_last_name_trgm").using(
      "gin",
      sql`${table.lastName} gin_trgm_ops`
    ),
    // Sorting indexes for name-based pagination (ASC direction)
    firstNameSortIdx: index("idx_advocates_first_name_sort")
      .on(table.isActive, table.firstName, table.id)
      .where(sql`${table.deletedAt} IS NULL`),
    lastNameSortIdx: index("idx_advocates_last_name_sort")
      .on(table.isActive, table.lastName, table.id)
      .where(sql`${table.deletedAt} IS NULL`),
    // Sorting indexes for DESC direction (performance optimization)
    firstNameSortDescIdx: index("idx_advocates_first_name_sort_desc")
      .on(table.isActive, sql`${table.firstName} DESC`, sql`${table.id} DESC`)
      .where(sql`${table.deletedAt} IS NULL`),
    lastNameSortDescIdx: index("idx_advocates_last_name_sort_desc")
      .on(table.isActive, sql`${table.lastName} DESC`, sql`${table.id} DESC`)
      .where(sql`${table.deletedAt} IS NULL`),
    // Covering index for default pagination query (includes frequently joined columns)
    defaultPaginationIdx: index("idx_advocates_default_pagination")
      .on(table.isActive, table.firstName, table.cityId, table.degreeId)
      .where(sql`${table.deletedAt} IS NULL`),
  })
);

/**
 * Junction table for many-to-many relationship between advocates and specialties
 */
export const advocateSpecialties = pgTable(
  "advocate_specialties",
  {
    advocateId: integer("advocate_id")
      .references(() => advocates.id, { onDelete: "cascade" })
      .notNull(),
    specialtyId: integer("specialty_id")
      .references(() => specialties.id, { onDelete: "restrict" })
      .notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    // Composite primary key
    pk: primaryKey({ columns: [table.advocateId, table.specialtyId] }),
    // Index for filtering by specialty
    specialtyIdx: index("idx_advocate_specialties_specialty").on(table.specialtyId),
  })
);

/**
 * Relations for Drizzle ORM query builder
 */
export const degreesRelations = relations(degrees, ({ many }) => ({
  advocates: many(advocates),
}));

export const citiesRelations = relations(cities, ({ many }) => ({
  advocates: many(advocates),
}));

export const specialtiesRelations = relations(specialties, ({ many }) => ({
  advocateSpecialties: many(advocateSpecialties),
}));

export const advocatesRelations = relations(advocates, ({ one, many }) => ({
  city: one(cities, {
    fields: [advocates.cityId],
    references: [cities.id],
  }),
  degree: one(degrees, {
    fields: [advocates.degreeId],
    references: [degrees.id],
  }),
  advocateSpecialties: many(advocateSpecialties),
}));

export const advocateSpecialtiesRelations = relations(advocateSpecialties, ({ one }) => ({
  advocate: one(advocates, {
    fields: [advocateSpecialties.advocateId],
    references: [advocates.id],
  }),
  specialty: one(specialties, {
    fields: [advocateSpecialties.specialtyId],
    references: [specialties.id],
  }),
}));

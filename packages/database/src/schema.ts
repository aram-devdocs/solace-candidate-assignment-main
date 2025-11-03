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
    // Covering index for default query (no filters, firstName sort)
    // Includes commonly accessed columns to enable index-only scans
    defaultQueryIdx: index("idx_advocates_default_query")
      .on(table.firstName, table.id, table.lastName, table.phoneNumber, table.yearsOfExperience)
      .where(sql`${table.isActive} = true AND ${table.deletedAt} IS NULL`),
    // Partial index for active non-deleted records (common query pattern)
    activePaginationIdx: index("idx_advocates_active_pagination")
      .on(table.isActive, table.createdAt)
      .where(sql`${table.deletedAt} IS NULL`),
    // Partial index for active records only (optimized for filtering)
    activeOnlyIdx: index("idx_advocates_active_only")
      .on(table.id)
      .where(sql`${table.isActive} = true AND ${table.deletedAt} IS NULL`),
    // Functional index for area code filtering (first 3 chars of phone)
    areaCodeIdx: index("idx_advocates_area_code").on(sql`SUBSTRING(${table.phoneNumber}, 1, 3)`),
    // Full-text search index on names
    nameSearchIdx: index("idx_advocates_name_search").using(
      "gin",
      sql`to_tsvector('english', ${table.firstName} || ' ' || ${table.lastName})`
    ),
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

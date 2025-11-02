-- Migration: Normalize advocates schema with lookup tables
-- This migration transforms the advocates table to use normalized relationships

-- Step 1: Create lookup tables
CREATE TABLE IF NOT EXISTS "degrees" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "degrees_code_unique" UNIQUE("code")
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"state_code" text,
	"country_code" text DEFAULT 'US' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "cities_name_unique" UNIQUE("name")
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "specialties" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text,
	"description" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "specialties_name_unique" UNIQUE("name")
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "advocate_specialties" (
	"advocate_id" integer NOT NULL,
	"specialty_id" integer NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "advocate_specialties_advocate_id_specialty_id_pk" PRIMARY KEY("advocate_id","specialty_id")
);
--> statement-breakpoint

-- Step 2: Populate degrees lookup table from existing data
INSERT INTO "degrees" ("code", "name")
SELECT DISTINCT
	"degree" as "code",
	CASE
		WHEN "degree" = 'MD' THEN 'Medical Doctor'
		WHEN "degree" = 'PhD' THEN 'Doctor of Philosophy'
		WHEN "degree" = 'MSW' THEN 'Master of Social Work'
		ELSE "degree"
	END as "name"
FROM "advocates"
WHERE "degree" IS NOT NULL
ON CONFLICT ("code") DO NOTHING;
--> statement-breakpoint

-- Step 3: Populate cities lookup table from existing data
INSERT INTO "cities" ("name", "state_code", "country_code")
SELECT DISTINCT
	"city" as "name",
	NULL as "state_code",
	'US' as "country_code"
FROM "advocates"
WHERE "city" IS NOT NULL
ON CONFLICT ("name") DO NOTHING;
--> statement-breakpoint

-- Step 4: Populate specialties lookup table from JSONB array
INSERT INTO "specialties" ("name", "category")
SELECT DISTINCT
	jsonb_array_elements_text("specialties") as "name",
	NULL as "category"
FROM "advocates"
WHERE "specialties" IS NOT NULL
	AND jsonb_array_length("specialties") > 0
ON CONFLICT ("name") DO NOTHING;
--> statement-breakpoint

-- Step 5: Add temporary columns to advocates table for migration
ALTER TABLE "advocates" ADD COLUMN IF NOT EXISTS "temp_city_id" integer;
--> statement-breakpoint
ALTER TABLE "advocates" ADD COLUMN IF NOT EXISTS "temp_degree_id" integer;
--> statement-breakpoint

-- Step 6: Populate temporary foreign key columns
UPDATE "advocates" a
SET "temp_city_id" = c."id"
FROM "cities" c
WHERE a."city" = c."name";
--> statement-breakpoint

UPDATE "advocates" a
SET "temp_degree_id" = d."id"
FROM "degrees" d
WHERE a."degree" = d."code";
--> statement-breakpoint

-- Step 7: Add new columns before dropping old ones
ALTER TABLE "advocates" ADD COLUMN IF NOT EXISTS "is_active" boolean DEFAULT true NOT NULL;
--> statement-breakpoint
ALTER TABLE "advocates" ADD COLUMN IF NOT EXISTS "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
--> statement-breakpoint
ALTER TABLE "advocates" ADD COLUMN IF NOT EXISTS "deleted_at" timestamp;
--> statement-breakpoint

-- Step 8: Change phone_number to text
ALTER TABLE "advocates" ALTER COLUMN "phone_number" SET DATA TYPE text USING "phone_number"::text;
--> statement-breakpoint
ALTER TABLE "advocates" ALTER COLUMN "created_at" SET NOT NULL;
--> statement-breakpoint

-- Step 9: Drop old text columns and rename temp columns
ALTER TABLE "advocates" DROP COLUMN IF EXISTS "city";
--> statement-breakpoint
ALTER TABLE "advocates" DROP COLUMN IF EXISTS "degree";
--> statement-breakpoint
ALTER TABLE "advocates" RENAME COLUMN "temp_city_id" TO "city_id";
--> statement-breakpoint
ALTER TABLE "advocates" RENAME COLUMN "temp_degree_id" TO "degree_id";
--> statement-breakpoint

-- Step 10: Set NOT NULL constraints on foreign key columns
ALTER TABLE "advocates" ALTER COLUMN "city_id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "advocates" ALTER COLUMN "degree_id" SET NOT NULL;
--> statement-breakpoint

-- Step 11: Populate advocate_specialties junction table from JSONB
INSERT INTO "advocate_specialties" ("advocate_id", "specialty_id")
SELECT DISTINCT
	a."id" as "advocate_id",
	s."id" as "specialty_id"
FROM "advocates" a
CROSS JOIN LATERAL jsonb_array_elements_text(a."specialties") as specialty_name
JOIN "specialties" s ON s."name" = specialty_name
WHERE a."specialties" IS NOT NULL
	AND jsonb_array_length(a."specialties") > 0
ON CONFLICT DO NOTHING;
--> statement-breakpoint

-- Step 12: Drop the JSONB specialties column
ALTER TABLE "advocates" DROP COLUMN IF EXISTS "specialties";
--> statement-breakpoint

-- Step 13: Add foreign key constraints
DO $$ BEGIN
 ALTER TABLE "advocates" ADD CONSTRAINT "advocates_city_id_cities_id_fk"
 FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
 ALTER TABLE "advocates" ADD CONSTRAINT "advocates_degree_id_degrees_id_fk"
 FOREIGN KEY ("degree_id") REFERENCES "public"."degrees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
 ALTER TABLE "advocate_specialties" ADD CONSTRAINT "advocate_specialties_advocate_id_advocates_id_fk"
 FOREIGN KEY ("advocate_id") REFERENCES "public"."advocates"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
 ALTER TABLE "advocate_specialties" ADD CONSTRAINT "advocate_specialties_specialty_id_specialties_id_fk"
 FOREIGN KEY ("specialty_id") REFERENCES "public"."specialties"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

-- Step 14: Add CHECK constraint for non-negative experience
ALTER TABLE "advocates" ADD CONSTRAINT "experience_check" CHECK ("years_of_experience" >= 0);
--> statement-breakpoint

-- Step 15: Create indexes for performance
CREATE INDEX IF NOT EXISTS "idx_advocates_city" ON "advocates" USING btree ("city_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_degree" ON "advocates" USING btree ("degree_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_experience" ON "advocates" USING btree ("years_of_experience");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_city_degree" ON "advocates" USING btree ("city_id","degree_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_active" ON "advocates" USING btree ("is_active") WHERE "advocates"."deleted_at" IS NULL;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_name_search" ON "advocates" USING gin (to_tsvector('english', "first_name" || ' ' || "last_name"));
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocate_specialties_specialty" ON "advocate_specialties" USING btree ("specialty_id");
--> statement-breakpoint

-- Step 16: Create trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';
--> statement-breakpoint

CREATE TRIGGER update_advocates_updated_at
BEFORE UPDATE ON "advocates"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable pg_trgm extension for trigram-based text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;--> statement-breakpoint
-- Trigram indexes for fast ILIKE searches on names
CREATE INDEX IF NOT EXISTS "idx_advocates_first_name_trgm" ON "advocates" USING gin ("first_name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_last_name_trgm" ON "advocates" USING gin ("last_name" gin_trgm_ops);--> statement-breakpoint
-- DESC sort indexes for optimized descending name sorts
CREATE INDEX IF NOT EXISTS "idx_advocates_first_name_sort_desc" ON "advocates" USING btree ("is_active","first_name" DESC,"id" DESC) WHERE "advocates"."deleted_at" IS NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_last_name_sort_desc" ON "advocates" USING btree ("is_active","last_name" DESC,"id" DESC) WHERE "advocates"."deleted_at" IS NULL;
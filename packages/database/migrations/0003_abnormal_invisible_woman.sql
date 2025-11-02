DROP INDEX IF EXISTS "idx_advocates_active";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_city_degree_exp" ON "advocates" USING btree ("city_id","degree_id","years_of_experience");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_active_pagination" ON "advocates" USING btree ("is_active","created_at") WHERE "advocates"."deleted_at" IS NULL;
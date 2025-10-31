import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { advocates } from "@repo/database";

/**
 * Type representing a complete Advocate record from the database.
 * Auto-generated from Drizzle schema for type safety.
 */
export type Advocate = InferSelectModel<typeof advocates>;

/**
 * Type representing data required to insert a new Advocate record.
 * Auto-generated from Drizzle schema for type safety.
 */
export type NewAdvocate = InferInsertModel<typeof advocates>;

/**
 * Valid degree types for healthcare advocates.
 */
export type Degree = "MD" | "PhD" | "MSW";

/**
 * Available specialty areas for healthcare advocates.
 */
export type Specialty =
  | "Bipolar disorder counseling"
  | "LGBTQ Counseling"
  | "PTSD"
  | "Anxiety/Depression"
  | "Chronic pain management"
  | "Weight loss coaching"
  | "Diabetic nutrition counseling"
  | "Relationship issues"
  | "Life coaching"
  | "Career coaching"
  | "ADHD"
  | "OCD"
  | "Eating disorders"
  | "Sleep issues"
  | "Stress management"
  | "Grief counseling"
  | "Addiction counseling"
  | "Family therapy"
  | "Cognitive behavioral therapy"
  | "Dialectical behavior therapy"
  | "Mindfulness training"
  | "Trauma counseling"
  | "Autism spectrum support"
  | "Learning disabilities"
  | "Geriatric care"
  | "Pediatric care"
  | "Women's health"
  | "Men's health"
  | "Psychological evaluations"
  | "Neuropsychological testing";

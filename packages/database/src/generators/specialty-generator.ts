/**
 * Comprehensive list of healthcare specialties across mental health, nutrition, and coaching
 */
export const SPECIALTY_DATA = [
  // Mental Health - Anxiety & Mood Disorders
  { name: "Anxiety/Depression", category: "Mental Health" },
  { name: "Bipolar disorder counseling", category: "Mental Health" },
  { name: "PTSD", category: "Mental Health" },
  { name: "OCD", category: "Mental Health" },
  { name: "Panic disorder", category: "Mental Health" },
  { name: "Phobias and fears", category: "Mental Health" },
  { name: "Seasonal affective disorder", category: "Mental Health" },

  // Mental Health - Therapy Modalities
  { name: "Cognitive behavioral therapy", category: "Mental Health" },
  { name: "Dialectical behavior therapy", category: "Mental Health" },
  { name: "EMDR therapy", category: "Mental Health" },
  { name: "Psychodynamic therapy", category: "Mental Health" },
  { name: "Mindfulness training", category: "Mental Health" },
  { name: "Acceptance and commitment therapy", category: "Mental Health" },

  // Mental Health - Relationships & Family
  { name: "Relationship issues", category: "Mental Health" },
  { name: "Family therapy", category: "Mental Health" },
  { name: "Couples counseling", category: "Mental Health" },
  { name: "Divorce counseling", category: "Mental Health" },
  { name: "Premarital counseling", category: "Mental Health" },
  { name: "Parenting support", category: "Mental Health" },

  // Mental Health - Trauma & Grief
  { name: "Grief counseling", category: "Mental Health" },
  { name: "Trauma counseling", category: "Mental Health" },
  { name: "Childhood trauma", category: "Mental Health" },
  { name: "Sexual abuse recovery", category: "Mental Health" },
  { name: "Domestic violence support", category: "Mental Health" },

  // Mental Health - Specialized Populations
  { name: "LGBTQ Counseling", category: "Mental Health" },
  { name: "Veterans counseling", category: "Mental Health" },
  { name: "Geriatric care", category: "Mental Health" },
  { name: "Pediatric care", category: "Mental Health" },
  { name: "Adolescent counseling", category: "Mental Health" },
  { name: "Women's health", category: "Mental Health" },
  { name: "Men's health", category: "Mental Health" },

  // Mental Health - Behavioral & Developmental
  { name: "ADHD", category: "Mental Health" },
  { name: "Autism spectrum support", category: "Mental Health" },
  { name: "Learning disabilities", category: "Mental Health" },
  { name: "Eating disorders", category: "Mental Health" },
  { name: "Addiction counseling", category: "Mental Health" },
  { name: "Substance abuse treatment", category: "Mental Health" },
  { name: "Anger management", category: "Mental Health" },

  // Mental Health - Assessment & Testing
  { name: "Psychological evaluations", category: "Mental Health" },
  { name: "Neuropsychological testing", category: "Mental Health" },
  { name: "ADHD assessment", category: "Mental Health" },

  // Wellness & Lifestyle
  { name: "Sleep issues", category: "Wellness" },
  { name: "Stress management", category: "Wellness" },
  { name: "Work-life balance", category: "Wellness" },
  { name: "Burnout prevention", category: "Wellness" },
  { name: "Self-esteem building", category: "Wellness" },

  // Nutrition & Diet
  { name: "Weight loss coaching", category: "Nutrition" },
  { name: "Diabetic nutrition counseling", category: "Nutrition" },
  { name: "Sports nutrition", category: "Nutrition" },
  { name: "Eating disorder nutrition", category: "Nutrition" },
  { name: "Pediatric nutrition", category: "Nutrition" },
  { name: "Vegan/vegetarian nutrition", category: "Nutrition" },
  { name: "Food allergies and intolerances", category: "Nutrition" },
  { name: "Prenatal nutrition", category: "Nutrition" },
  { name: "Heart-healthy nutrition", category: "Nutrition" },

  // Coaching & Development
  { name: "Life coaching", category: "Coaching" },
  { name: "Career coaching", category: "Coaching" },
  { name: "Executive coaching", category: "Coaching" },
  { name: "Leadership development", category: "Coaching" },
  { name: "Personal development", category: "Coaching" },
  { name: "Goal setting and achievement", category: "Coaching" },
  { name: "Time management coaching", category: "Coaching" },

  // Pain & Physical Health
  { name: "Chronic pain management", category: "Physical Health" },
  { name: "Chronic illness support", category: "Physical Health" },
  { name: "Cancer support", category: "Physical Health" },
  { name: "Rehabilitation counseling", category: "Physical Health" },
  { name: "Disability support", category: "Physical Health" },
] as const;

/**
 * Get all specialty names
 */
export function getAllSpecialtyNames(): string[] {
  return SPECIALTY_DATA.map((specialty) => specialty.name);
}

/**
 * Get specialties by category
 */
export function getSpecialtiesByCategory(category: string): { name: string; category: string }[] {
  return SPECIALTY_DATA.filter(
    (specialty) => specialty.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get specialty by name
 */
export function getSpecialtyByName(name: string): { name: string; category: string } | undefined {
  return SPECIALTY_DATA.find((specialty) => specialty.name.toLowerCase() === name.toLowerCase());
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
  return Array.from(new Set(SPECIALTY_DATA.map((specialty) => specialty.category)));
}

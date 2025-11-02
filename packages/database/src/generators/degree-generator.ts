/**
 * Healthcare and counseling degree definitions
 */
export const DEGREE_DATA = [
  { code: "MD", name: "Medical Doctor" },
  { code: "DO", name: "Doctor of Osteopathic Medicine" },
  { code: "PhD", name: "Doctor of Philosophy" },
  { code: "PsyD", name: "Doctor of Psychology" },
  { code: "MSW", name: "Master of Social Work" },
  { code: "LCSW", name: "Licensed Clinical Social Worker" },
  { code: "MFT", name: "Marriage and Family Therapist" },
  { code: "LPC", name: "Licensed Professional Counselor" },
  { code: "LMHC", name: "Licensed Mental Health Counselor" },
  { code: "RN", name: "Registered Nurse" },
  { code: "NP", name: "Nurse Practitioner" },
  { code: "CNS", name: "Clinical Nurse Specialist" },
  { code: "RD", name: "Registered Dietitian" },
  { code: "RDN", name: "Registered Dietitian Nutritionist" },
  { code: "BCBA", name: "Board Certified Behavior Analyst" },
  { code: "MA", name: "Master of Arts in Counseling" },
  { code: "MS", name: "Master of Science in Psychology" },
  { code: "EdD", name: "Doctor of Education" },
];

/**
 * Get all degree codes
 */
export function getAllDegreeCodes(): string[] {
  return DEGREE_DATA.map((degree) => degree.code);
}

/**
 * Get degree by code
 */
export function getDegreeByCode(code: string): { code: string; name: string } | undefined {
  return DEGREE_DATA.find((degree) => degree.code.toLowerCase() === code.toLowerCase());
}

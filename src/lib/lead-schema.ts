import { z } from "zod";
import { destinations, courseCategories } from "@/lib/site";

export const educationLevels = [
  "Class 12 / equivalent",
  "Undergraduate (in progress)",
  "Bachelor's degree",
  "Master's degree",
  "Working professional",
] as const;

export const ieltsStatuses = [
  "Not yet taken",
  "Preparing",
  "Score 6.0 – 6.5",
  "Score 7.0+",
  "PTE / other",
] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number")
    .regex(/^[\d+\-\s()]+$/, "Phone can only contain digits and + - ( )"),
  email: z.string().trim().email("Please enter a valid email"),
  country: z.enum(destinations.map((d) => d.country) as [string, ...string[]]),
  course: z.enum(courseCategories as unknown as [string, ...string[]]),
  educationLevel: z.enum(educationLevels),
  ieltsStatus: z.enum(ieltsStatuses),
  consent: z.boolean().refine((v) => v === true, {
    message: "Please confirm to be contacted",
  }),
});

export type LeadInput = z.infer<typeof leadSchema>;

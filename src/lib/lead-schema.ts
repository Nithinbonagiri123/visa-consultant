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

// Max-length bounds defend against memory / payload-bomb attacks: an
// unbounded `.min()` lets a 10 MB string pass validation and end up in our
// Apps Script POST body. RFC 5321 caps email at 254 chars.
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number")
    .max(20, "Phone is too long")
    .regex(/^[\d+\-\s()]+$/, "Phone can only contain digits and + - ( )"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(254, "Email is too long"),
  country: z.enum(destinations.map((d) => d.country) as [string, ...string[]]),
  course: z.enum(courseCategories as unknown as [string, ...string[]]),
  educationLevel: z.enum(educationLevels),
  ieltsStatus: z.enum(ieltsStatuses),
  consent: z.boolean().refine((v) => v === true, {
    message: "Please confirm to be contacted",
  }),
});

export type LeadInput = z.infer<typeof leadSchema>;

import { z } from "zod";

// ✅ Define Enums for Tags
const levelEnum = z.enum([
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
  "Secondary 1",
  "Secondary 2",
  "Secondary 3",
  "Secondary 4",
  "Secondary 5",
  "Junior College 1",
  "Junior College 2",
]);

const subjectEnum = z.enum([
  "Math",
  "English",
  "Additional Math",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "General Paper",
]);

const streamEnum = z.enum(["G1", "G2", "G3", "Express", "NA", "NT"]);

const classSizeEnum = z.enum(["Small Group", "Big Group", "1-to-1"]);

const deliveryModeEnum = z.enum(["Onsite", "Online", "Hybrid"]);

// ✅ Define Schema for Tags (Categorized)
const tagsSchema = z.object({
  level: levelEnum,
  subject: subjectEnum,
  stream: streamEnum.optional(), // Stream is optional for some subjects
  classSize: classSizeEnum,
  deliveryMode: deliveryModeEnum,
});

// ✅ Define Schema for Service Pricing
const pricingSchema = z.object({
  price: z.number().positive("Price must be a positive number"),
  currency: z.string(),
  pricingUnit: z.string(),
  variantName: z.string(),
});

// ✅ Define Schema for Service Offerings
export const serviceOfferingsSchema = z.object({
  serviceName: z.string().min(3, "Service name must be at least 3 characters"),
  serviceDescription: z
    .string()
    .min(5, "Service description must be at least 5 characters"),
  tags: z.array(tagsSchema).min(1, "Each service must have at least one tag"),
  pricing: pricingSchema, // Nested Pricing Schema
});

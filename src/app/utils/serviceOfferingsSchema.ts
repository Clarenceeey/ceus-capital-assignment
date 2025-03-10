import { z } from "zod";

export const serviceOfferingsSchema = z.object({
  serviceName: z.string().min(1, "Service name is required"),
  serviceDescription: z.string().min(1, "Service description is required"),
  pricing: z.object({
    price: z.number().min(0, "Price must be at least 0"),
    currency: z.string().default("SGD"),
    pricingUnit: z.string().default("hour"),
    variantName: z.string().default("Standard Rate"),
  }),
  tags: z.object({
    level: z.enum(
      [
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Secondary 1",
        "Secondary 2",
        "Secondary 3",
        "Junior College 1",
        "Junior College 2",
      ],
      {
        required_error: "Level tag is required",
      },
    ),
    subject: z.enum(
      [
        "Math",
        "English",
        "Additional Math",
        "Science",
        "Physics",
        "Chemistry",
        "Biology",
        "General Paper",
      ],
      {
        required_error: "Subject tag is required",
      },
    ),
    stream: z.enum(["G1", "G2", "G3", "Express", "NA", "NT"], {
      required_error: "Stream tag is required",
    }),
    classSize: z.enum(["Small Group", "Big Group", "1-to-1"], {
      required_error: "Class size tag is required",
    }),
    modeOfDelivery: z.enum(["Onsite", "Online", "Hybrid"], {
      required_error: "Mode of delivery tag is required",
    }),
  }),
});

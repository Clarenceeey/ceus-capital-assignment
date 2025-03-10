import { z } from "zod";
import {
  classSizeCategories,
  levelCategories,
  modeOfDeliveryCategories,
  streamCategories,
  subjectCategories,
} from "./categories";

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
    level: z.enum(levelCategories, {
      required_error: "Level tag is required",
    }),
    subject: z.enum(subjectCategories, {
      required_error: "Subject tag is required",
    }),
    stream: z.enum(streamCategories, {
      required_error: "Stream tag is required",
    }),
    classSize: z.enum(classSizeCategories, {
      required_error: "Class size tag is required",
    }),
    modeOfDelivery: z.enum(modeOfDeliveryCategories, {
      required_error: "Mode of delivery tag is required",
    }),
  }),
});

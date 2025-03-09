import { z } from "zod";

export const businessAddressSchema = z.object({
  buildingNumber: z.string().min(1, "Building name/number is required"),
  streetName: z.string().min(1, "Street name is required"),
  unitNumber: z.string().optional(),
  postalCode: z.coerce
    .number()
    .int("Postal code must be a whole number") // Ensure it's an integer
    .min(10000, "Postal code must be at least 5 digits") // Adjust min length (e.g., 10000)
    .max(9999999999, "Postal code must be at most 10 digits"), // Adjust max length (e.g., 9999999999)
  fullAddress: z.string().optional(),
  latitude: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});

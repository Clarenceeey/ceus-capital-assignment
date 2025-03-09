import { z } from "zod";

// ✅ Define Schema for Business Hours
export const businessHoursSchema = z.object({
  timeSlots: z
    .array(
      z.object({
        openingTime: z
          .string()
          .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
        closingTime: z
          .string()
          .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
        days: z
          .array(
            z.enum([
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ]),
          )
          .min(1, "Select at least one day"),
      }),
    )
    .min(1, "At least one time slot is required"),
});

import { z } from "zod";

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) throw new Error("Invalid time format: time string is missing");
  const [hh, mm] = timeStr.split(":");
  return parseInt(hh ?? "", 10) * 60 + parseInt(mm ?? "", 10);
}

// ✅ Define Schema for Business Hours
export const businessHoursSchema = z.object({
  timeSlots: z
    .array(
      z
        .object({
          openingTime: z
            .string()
            .min(1, "Opening time is required") // Prevents empty string
            .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
          closingTime: z
            .string()
            .min(1, "Closing time is required") // Prevents empty string
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
        })
        .refine(
          ({ openingTime, closingTime }) =>
            openingTime !== "" &&
            closingTime !== "" && // Ensure values exist
            parseTimeToMinutes(closingTime) > parseTimeToMinutes(openingTime),
          {
            message: "Closing time must be after opening time",
            path: ["closingTime"], // Display error on `closingTime`
          },
        ),
    )
    .min(1, "At least one time slot is required"),
});

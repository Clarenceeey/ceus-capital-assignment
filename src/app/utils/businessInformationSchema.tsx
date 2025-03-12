import { z } from "zod";

export const businessInformationSchema = z.object({
  businessName: z.string().min(1, "Please provide a business name!"),
  businessDescription: z
    .string()
    .min(1, "Please provide a business description!")
    .max(500, "Message must be at most 500 words"),
  contactEmail: z.string().email("Please provide a valid email"),
  googlePlaceId: z
    .string()
    .regex(
      /^ChIJ[a-zA-Z0-9_-]{23,251}$/,
      "Please provide a valid Google Place ID",
    ),
  facebookPageLink: z
    .string()
    .regex(
      /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{3,}$/,
      "Please provide a valid Facebook Page Link",
    ),
  facebookPageId: z
    .string()
    .regex(/^\d{8,20}$/, "Please provide a valid Facebook Page ID"),
  instagramPageLink: z
    .string()
    .regex(
      /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]{1,30}\/?$/,
      "Please provide a valid Instagram Page Link",
    ),
  whatsappLink: z
    .string()
    .regex(
      /^https?:\/\/api\.whatsapp\.com\/send\?phone=\d{7,15}(&text=.*)?$/,
      "Please provide a valid WhatsApp Link",
    ),
  rating: z.coerce
    .number()
    .min(0.0, "Rating must be between 0.0 and 5.0!")
    .max(5.0, "Rating must be between 0.0 and 5.0!"),
});

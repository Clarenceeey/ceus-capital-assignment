import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";
import { getFacebookPageId } from "~/app/utils/getFacebookLink";

// 🛠 Define Zod validation schema
const formSchema = z.object({
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
  facebookPageId: z
    .string()
    .regex(/^\d{8,20}$/, "Please provide a valid Facebook Page ID"),
  facebookPageLink: z
    .string()
    .regex(
      /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{3,}$/,
      "Please provide a valid Facebook Page Link",
    ),
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

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse JSON body

    // ✅ Validate input using Zod
    const validationResult = formSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors },
        { status: 400 },
      );
    }

    const data = validationResult.data; // Validated form data
    data.facebookPageId = (await getFacebookPageId(data.facebookPageLink))!;

    // ✅ Save to database (if using Prisma)
    const newEntry = await db.business.create({
      data: {
        name: data.businessName,
        description: data.businessDescription,
        contact_email: data.contactEmail,
        google_place_id: data.googlePlaceId,
        facebook_page_id: data.facebookPageId,
        facebook_page_link: data.facebookPageLink,
        instagram_page_link: data.instagramPageLink,
        whatsapp_link: data.whatsappLink,
        average_rating: data.rating,
      },
    });

    return NextResponse.json(
      { success: true, data: newEntry },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

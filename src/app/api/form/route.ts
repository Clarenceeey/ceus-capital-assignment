import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { businessInformationSchema } from "~/app/utils/businessInformationSchema";
import { businessAddressSchema } from "~/app/utils/businessAddressSchema";
import { businessHoursSchema } from "~/app/utils/businessHoursSchema";
import { serviceOfferingsSchema } from "~/app/utils/serviceOfferingsSchema";
import { tagCategories } from "~/app/utils/categories";

const formSchema = businessInformationSchema
  .merge(businessAddressSchema)
  .merge(businessHoursSchema)
  .merge(serviceOfferingsSchema);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validationResult = formSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors },
        { status: 400 },
      );
    }

    const data = validationResult.data;

    const newBusiness = await db.$transaction(async (tx) => {
      const [address] = await tx.$queryRaw<{ id: number }[]>`
        INSERT INTO "address" (
          "country_iso",
          "administrative_division_id",
          "building_number",
          "street_name",
          "unit_number",
          "postal_code",
          "full_address",
          "geolocation",
          "created_at",
          "updated_at"
        ) VALUES (
          'SG',
          ${null}, 
          ${data.buildingNumber},
          ${data.streetName},
          ${data.unitNumber ?? null},
          ${data.postalCode.toString()},
          ${data.fullAddress},
          ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326)::geography,
          NOW(),
          NOW()
        ) RETURNING "id";
      `;

      const business = await tx.business.create({
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
          // might not be safe to assume that the first address is the one we just created
          address_id: address?.id ?? 1,
        },
      });

      await Promise.all(
        data.timeSlots.map((slot) =>
          tx.business_hours.create({
            data: {
              business_id: business.id,
              day_name: slot.days.join(","),
              open_time: new Date(`1970-01-01T${slot.openingTime}:00Z`),
              close_time: new Date(`1970-01-01T${slot.closingTime}:00Z`),
            },
          }),
        ),
      );

      const service = await tx.service.create({
        data: {
          business_id: business.id,
          name: data.serviceName,
          description: data.serviceDescription,
        },
      });

      await tx.service_pricing.create({
        data: {
          service_id: service.id,
          price: data.pricing.price,
          currency: data.pricing.currency,
          pricing_unit: data.pricing.pricingUnit,
          variant_name: data.pricing.variantName,
        },
      });

      for (const category of tagCategories) {
        if (category in data.tags == false) {
          throw Error("Missing tag category: " + category);
        }
        const tagName = data.tags[category as keyof typeof data.tags];
        if (tagName) {
          let tag = await tx.tag.findUnique({
            where: { name: tagName },
          });

          if (!tag) {
            tag = await tx.tag.create({
              data: { name: tagName },
            });
          }

          await tx.service_tag.create({
            data: {
              service_id: service.id,
              tag_id: tag.id,
            },
          });
        }
      }

      return business;
    });

    return NextResponse.json(
      { success: true, data: newBusiness },
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

"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "~/components/ui/pagination";
import BusinessInformationSection from "./formSections/businessInformation";

// ✅ Define Form Schema Using Zod
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

export default function ContactForm({
  submitForm,
}: {
  submitForm: () => void;
}) {
  const [step, setStep] = useState(1); // ✅ Track current step
  const totalSteps = 4; // ✅ Total number of form pages

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessDescription: "",
      contactEmail: "",
      googlePlaceId: "",
      facebookPageLink: "",
      instagramPageLink: "",
      whatsappLink: "",
      rating: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form Data:", data);
    submitForm();
  };

  return (
    <div className="mx-auto w-7/12 rounded-lg border p-6 shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* ✅ Step 1: Business Information */}
          {step === 1 && (
            <>
              <BusinessInformationSection control={form.control} />
            </>
          )}

          {/* ✅ Step 2: Contact Information */}
          {step === 2 && (
            <>
              <p className="mb-4 text-xl font-bold">Business Address</p>
            </>
          )}

          {/* ✅ Step 3: Social Media */}
          {step === 3 && <></>}

          {/* ✅ Step 4: Final Step */}
          {step === 4 && <></>}

          <Separator />

          <Pagination>
            <PaginationContent className="gap-10">
              <PaginationItem>
                <PaginationPrevious
                  className={`select-none ${step == 1 ? "pointer-events-none opacity-50" : undefined}`}
                  onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="pointer-events-none select-none"
                  aria-disabled
                >
                  {step} of {totalSteps}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={`select-none ${step == totalSteps ? "pointer-events-none opacity-50" : undefined}`}
                  onClick={() =>
                    setStep((prev) => Math.min(prev + 1, totalSteps))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          {step === totalSteps && (
            <Button type="submit" className="select-none">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

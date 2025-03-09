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
import BusinessAddressSection from "./formSections/businessAddress";
import { businessAddressSchema } from "~/app/utils/businessAddressSchema";
import { businessHoursSchema } from "~/app/utils/businessHoursSchema";
import { businessInformationSchema } from "~/app/utils/businessInformationSchema";
import BusinessHoursSection from "./formSections/businessHours";

const formSchema = businessInformationSchema.merge(
  businessAddressSchema.merge(businessHoursSchema),
);

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
      buildingNumber: "",
      streetName: "",
      unitNumber: "",
      postalCode: 0,
      fullAddress: "",
      latitude: 0,
      longitude: 0,
      timeSlots: [{ openingTime: "", closingTime: "", days: [] }],
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
              <BusinessAddressSection control={form.control} />
            </>
          )}

          {/* ✅ Step 3: Social Media */}
          {step === 3 && (
            <>
              <BusinessHoursSection
                control={form.control}
                setValue={form.setValue}
                watch={form.watch}
              />
            </>
          )}

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

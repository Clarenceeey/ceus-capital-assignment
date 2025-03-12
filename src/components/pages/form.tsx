"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
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
import ServiceOfferingsSection from "./formSections/serviceOfferings";
import { serviceOfferingsSchema } from "~/app/utils/serviceOfferingsSchema";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

const formSchema = businessInformationSchema.merge(
  businessAddressSchema.merge(
    businessHoursSchema.merge(serviceOfferingsSchema),
  ),
);

export default function ContactForm({
  submitForm,
}: {
  submitForm: () => void;
}) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting Form Data:", data);

      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error submitting form:", result.error ?? "");
        setShowAlert(() => true);
        setAlertMessage(() => "Form submission failed: " + result.error);
        return;
      }

      console.log("Form submitted successfully:", result);
      submitForm();
    } catch (error) {
      setShowAlert(() => true);
      setAlertMessage(() => "An error occurred while submitting the form.");
      console.error("Network error:", error);
    }
  };

  const onError = (errors: unknown) => {
    console.log("Validation Errors:", errors);
  };

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessDescription: "",
      contactEmail: "",
      googlePlaceId: "",
      facebookPageLink: "",
      facebookPageId: "",
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
      serviceName: "",
      serviceDescription: "",
      pricing: {
        price: 0,
        currency: "SGD",
        pricingUnit: "hour",
        variantName: "Standard Rate",
      },
      tags: {
        level: undefined,
        subject: undefined,
        stream: undefined,
        classSize: undefined,
        modeOfDelivery: undefined,
      },
    },
  });

  return (
    <div className="w-full">
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error Submitting Form</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="destructive" onClick={() => setShowAlert(false)}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="mx-auto w-7/12 rounded-lg border p-6 shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-4"
          >
            {/* Business Information */}
            {step === 1 && (
              <>
                <BusinessInformationSection control={form.control} />
              </>
            )}

            {/* Business Address */}
            {step === 2 && (
              <>
                <BusinessAddressSection control={form.control} />
              </>
            )}

            {/* Business Hours */}
            {step === 3 && (
              <>
                <BusinessHoursSection
                  control={form.control}
                  setValue={form.setValue}
                  watch={form.watch}
                />
              </>
            )}

            {/* Service Offerings */}
            {step === 4 && (
              <>
                <ServiceOfferingsSection
                  control={form.control}
                  setValue={form.setValue}
                  watch={form.watch}
                />
              </>
            )}

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
    </div>
  );
}

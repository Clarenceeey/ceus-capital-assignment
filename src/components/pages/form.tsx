/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

// ✅ Define Form Schema Using Zod
const formSchema = z.object({
  businessName: z
    .string()
    .min(3, "Business name must be at least 3 characters"),
  businessDescription: z
    .string()
    .max(500, "Message must be at most 500 characters"),
  contactEmail: z.string().email("Invalid email"),
  googlePlaceId: z
    .string()
    .regex(/^ChIJ[a-zA-Z0-9_-]{23,251}$/, "Invalid Google Place ID")
    .optional(),
  facebookPageId: z
    .string()
    .regex(/^\d{8,20}$/, "Invalid Facebook Page ID")
    .optional(),
  facebookPageLink: z
    .string()
    .regex(
      /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{3,}$/,
      "Invalid Facebook Page Link",
    )
    .optional(),
  instagramPageLink: z
    .string()
    .regex(
      /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]{1,30}\/?$/,
      "Invalid Instagram Page Link",
    )
    .optional(),
  whatsappLink: z
    .string()
    .regex(
      /^https?:\/\/api\.whatsapp\.com\/send\?phone=\d{7,15}(&text=.*)?$/,
      "Invalid WhatsApp Link",
    )
    .optional(),
  rating: z.coerce
    .number()
    .min(0.0, "Rating must be at least 0.0")
    .max(5.0, "Rating must be at most 5.0")
    .optional(),
});

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const form = useForm<z.infer<typeof formSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessDescription: "",
      contactEmail: "",
      googlePlaceId: "",
      facebookPageId: "",
      facebookPageLink: "",
      instagramPageLink: "",
      whatsappLink: "",
      rating: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form Data:", data);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border p-4 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Contact Us</h2>
      {submitted ? (
        <p className="text-green-500">Form submitted successfully!</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div className="flex flex-row gap-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Email Field */}
            {/* Message Field */}
            <FormField
              control={form.control}
              name="businessDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="googlePlaceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>googlePlaceId</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebookPageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>facebookPageId</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebookPageLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>facebookPageLink</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagramPageLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>instagramPageLink</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsappLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>whatsappLink</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>rating</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

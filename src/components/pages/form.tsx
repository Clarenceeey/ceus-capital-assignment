/* eslint-disable @typescript-eslint/no-unsafe-call */

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
import { Textarea } from "~/components/ui/textarea";

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

export default function ContactForm({
  submitForm,
}: {
  submitForm: () => void;
}) {
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
    submitForm();
  };

  return (
    <div className="mx-auto w-7/12 rounded-lg border p-4 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Contact Us</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="off"
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
                  <Textarea
                    autoComplete="off"
                    placeholder="Tell us a more about your business!"
                    {...field}
                  />
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
                <FormLabel>Google Place ID</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="facebookPageId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Facebook Page ID</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebookPageLink"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Facebook Page Link</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="instagramPageLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram Page Link</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
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
                <FormLabel>Whatsapp Link</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
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
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    autoComplete="off"
                    {...field}
                  />
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
    </div>
  );
}

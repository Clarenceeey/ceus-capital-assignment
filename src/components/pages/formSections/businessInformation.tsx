import { Input } from "~/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { Control } from "react-hook-form";

type BusinessInformationProps = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: Control<any>;
};

export default function BusinessInformationSection({
  control,
}: BusinessInformationProps) {
  return (
    <div>
      <p className="mb-4 text-xl font-bold">Business Information</p>

      {/* Business Name */}
      <FormField
        control={control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your business name"
                autoComplete="off"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Business Description */}
      <FormField
        control={control}
        name="businessDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Description</FormLabel>
            <FormControl>
              <Textarea
                autoComplete="off"
                placeholder="Describe your business"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Contact Email */}
      <FormField
        control={control}
        name="contactEmail"
        render={({ field }) => (
          <FormItem>
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

      {/* Google Place Id */}
      <FormField
        control={control}
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

      {/* Facebook Page Link, Facebook Page Id can be derived from this */}
      <FormField
        control={control}
        name="facebookPageLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Facebook Page Link</FormLabel>
            <FormControl>
              <Input autoComplete="off" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Instagram PAge Link */}
      <FormField
        control={control}
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

      {/* Whatsapp Link */}
      <FormField
        control={control}
        name="whatsappLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel>WhatsApp Link</FormLabel>
            <FormControl>
              <Input autoComplete="off" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Rating */}
      <FormField
        control={control}
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
    </div>
  );
}

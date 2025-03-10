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

type BusinessAddressProps = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: Control<any>;
};

export default function BusinessAddressSection({
  control,
}: BusinessAddressProps) {
  return (
    <div>
      <p className="mb-4 text-xl font-bold">Business Address</p>

      {/* Building Number */}
      <FormField
        control={control}
        name="buildingNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Building Number</FormLabel>
            <FormControl>
              <Input autoComplete="off" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Street Name */}
      <FormField
        control={control}
        name="streetName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street Name</FormLabel>
            <FormControl>
              <Input autoComplete="off" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Unit Number */}
      <FormField
        control={control}
        name="unitNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Unit Number</FormLabel>
            <FormControl>
              <Input autoComplete="off" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Postal Code */}
      <FormField
        control={control}
        name="postalCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal Code</FormLabel>
            <FormControl>
              <Input type="number" autoComplete="off" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Full Address */}
      <FormField
        control={control}
        name="fullAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Address</FormLabel>
            <FormControl>
              <Textarea
                autoComplete="off"
                placeholder="Put your full address here"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Longitude */}
      <FormField
        control={control}
        name="longitude"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Longitude</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="-180"
                max="180"
                step="1"
                autoComplete="off"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Latitude */}
      <FormField
        control={control}
        name="latitude"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Latitude</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="-90"
                max="90"
                step="1"
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

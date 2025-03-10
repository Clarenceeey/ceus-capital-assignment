import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Input } from "~/components/ui/input";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

// Define Props Type
type ServiceOfferingsProps = {
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
};

// List of available options
const levelTags = [
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Secondary 1",
  "Secondary 2",
  "Junior College 1",
  "Junior College 2",
] as const;

const subjectTags = [
  "Math",
  "English",
  "Additional Math",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "General Paper",
] as const;

const streamTags = ["G1", "G2", "G3", "Express", "NA", "NT"] as const;
const classSizeTags = ["Small Group", "Big Group", "1-to-1"] as const;
const deliveryModeTags = ["Onsite", "Online", "Hybrid"] as const;

export default function ServiceOfferingsSection({
  control,
  setValue,
  watch,
}: ServiceOfferingsProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Service Offerings</h2>

      {/* Service Name & Description */}
      <div className="flex w-full flex-row gap-8">
        <FormField
          control={control}
          name="serviceName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your service name"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Description */}
        <FormField
          control={control}
          name="serviceDescription"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Service Description</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Tags Section with Dropdown Menu */}
      <div className="mb-10 rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-bold">Tags</h2>

        <div className="flex w-full flex-row gap-8">
          {/* Level Selection */}
          <DropdownSelect
            control={control}
            name="level"
            label="Level"
            options={levelTags}
            className="flex-1"
            setValue={setValue}
            watch={watch}
          />

          {/* Subject Selection */}
          <DropdownSelect
            control={control}
            name="subject"
            label="Subject"
            options={subjectTags}
            className="flex-1"
            setValue={setValue}
            watch={watch}
          />
        </div>

        <div className="flex w-full flex-row gap-8">
          {/* Stream Selection */}
          <DropdownSelect
            control={control}
            name="stream"
            label="Stream"
            options={streamTags}
            className="flex-1"
            setValue={setValue}
            watch={watch}
          />

          {/* Class Size Selection */}
          <DropdownSelect
            control={control}
            name="classSize"
            label="Class Size"
            options={classSizeTags}
            className="flex-1"
            setValue={setValue}
            watch={watch}
          />
        </div>

        {/* Mode of Delivery Selection */}
        <DropdownSelect
          control={control}
          name="modeOfDelivery"
          label="Mode of Delivery"
          options={deliveryModeTags}
          setValue={setValue}
          watch={watch}
        />
      </div>

      {/* Pricing Section */}
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-bold">Pricing</h2>

        <div className="flex flex-row gap-8">
          {/* Price */}
          <FormField
            control={control}
            name="pricing.price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Currency */}
          <FormField
            control={control}
            name="pricing.currency"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

function DropdownSelect({
  control,
  name,
  label,
  options,
  className,
  setValue,
  watch,
}: {
  control: Control<any>;
  name: string;
  label: string;
  options: readonly string[];
  className?: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}) {
  return (
    <FormField
      control={control}
      name={`tags.${name}`}
      render={({ field }) => (
        <FormItem className={`mb-4 ${className}`}>
          <FormLabel>{label}</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                {field.value || `Select ${label}`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => {
                    setValue(`tags.${name}`, option);
                  }}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

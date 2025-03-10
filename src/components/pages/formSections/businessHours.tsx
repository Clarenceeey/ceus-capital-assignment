import {
  Control,
  UseFormSetValue,
  useFieldArray,
  UseFormWatch,
} from "react-hook-form";
import { Input } from "~/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Checkbox } from "~/components/ui/checkbox";

// Define Props Type
type BusinessHoursProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
};

// List of days
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function BusinessHoursSection({
  control,
  setValue,
  watch,
}: BusinessHoursProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "timeSlots",
  });

  const selectedDays = watch("timeSlots").flatMap((slot: any) => slot.days);
  const remainingDays = daysOfWeek.filter((day) => !selectedDays.includes(day));
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Business Hours</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="rounded-lg border p-4">
          <div className="flex gap-4">
            {/* Opening Time */}
            <FormField
              control={control}
              name={`timeSlots.${index}.openingTime`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opening Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Closing Time */}
            <FormField
              control={control}
              name={`timeSlots.${index}.closingTime`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Closing Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Days Selection */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {daysOfWeek.map((day) => (
              <FormField
                key={day}
                control={control}
                name={`timeSlots.${index}.days`}
                render={({ field }) => (
                  <FormItem key={day} className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        disabled={
                          selected.includes(day) && !field.value.includes(day)
                        }
                        checked={field.value.includes(day)}
                        onCheckedChange={(checked) => {
                          setSelected((prevSelected) => {
                            const updatedSelected = checked
                              ? [...prevSelected, day] // Add if checked
                              : prevSelected.filter((d) => d !== day); // Remove if unchecked
                            return updatedSelected;
                          });

                          const updatedDays = checked
                            ? [...field.value, day]
                            : field.value.filter((d) => d !== day);

                          setValue(`timeSlots.${index}.days`, updatedDays);

                          console.log(
                            "Updated Time Slots:",
                            watch("timeSlots"),
                          );
                        }}
                      />
                    </FormControl>
                    <FormLabel>{day}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Remove Time Slot Button */}
          {fields.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              className="mt-2"
              onClick={() => {
                console.log(field);
                const daysToRemove = watch(`timeSlots.${index}.days`);
                setSelected((prevSelected) =>
                  prevSelected.filter((d) => !daysToRemove.includes(d)),
                );

                remove(index);
              }}
            >
              Remove Time Slot
            </Button>
          )}
        </div>
      ))}

      {/* Add Time Slot Button */}
      {remainingDays.length !== 0 && (
        <Button
          type="button"
          className="mt-4"
          onClick={() => append({ openingTime: "", closingTime: "", days: [] })}
        >
          Add Another Time Slot
        </Button>
      )}
    </div>
  );
}

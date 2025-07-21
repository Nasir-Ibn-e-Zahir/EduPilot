"use client";

// Form shadcn ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
// zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// schema
import { ImageUploadSchema } from "@/lib/schemas";
//  shadcn-ui
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

interface Props {
  onImageUpload: (image: z.infer<typeof ImageUploadSchema>) => void;
}

const TYPES = ["Quiz", "Assignments", "Midterm", "Finalterm", "Notes","Presentations"] as const;

export default function ImageUpload({ onImageUpload }: Props) {
  //Form Data Validation
  const formData = useForm<z.infer<typeof ImageUploadSchema>>({
    resolver: zodResolver(ImageUploadSchema),
    defaultValues: {
      image: undefined,
      options: [],
    },
  });

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Form {...formData}>
        <form
          onSubmit={formData.handleSubmit(onImageUpload)}
          className="space-y-4"
        >
          <FormField
            control={formData.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formData.control}
            name="options"
            render={() => (
              <FormItem>
                <div className="flex flex-row gap-2">
                  {TYPES.map((type) => (
                    <FormField
                      key={type}
                      control={formData.control}
                      name="options"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={type}
                            className="flex flex-row items-center "
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(type)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, type]
                                    : field.value.filter(
                                        (item) => item !== type
                                      );

                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <span className="capitalize">{type}</span>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <button>submit</button>
        </form>
      </Form>
    </div>
  );
}

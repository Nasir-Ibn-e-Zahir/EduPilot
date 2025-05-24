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
import { Button } from "../ui/button";

// card shadcn-ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  onImageUpload: (image: z.infer<typeof ImageUploadSchema>) => void;
}

export default function ImageUpload({ onImageUpload }: Props) {
  //Form Data Validation
  const formData = useForm<z.infer<typeof ImageUploadSchema>>({
    resolver: zodResolver(ImageUploadSchema),
    defaultValues: {
      image: undefined,
    },
  });

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="w-[350px] shadow text-center">
        <CardHeader>
          <CardTitle className="text-2xl"> Image Upload Form </CardTitle>
          <CardDescription>
             
            Upload image and make your teaching smart!
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <CardFooter className="flex w-[300px]">
                <Button className="m-2 bg-green-600 hover:bg-green-700 flex-1">
                  Upload
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

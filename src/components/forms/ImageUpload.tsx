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
import { Button } from "../ui/button";
import { PaperclipIcon, SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Props {
  onImageUpload: (image: z.infer<typeof ImageUploadSchema>) => void;
}
type QuestionCounts = {
  mcqs: number;
  trueFalse: number;
  shortQ: number;
  longQ: number;
};

type QuizOptions = {
  difficulty: "easy" | "medium" | "hard";
  mcqs: number;
  trueFalse: number;
  shortQ: number;
  longQ: number;
};

const TYPES = [
  "Quiz",
  "Assignments",
  "Midterm",
  "Finalterm",
  "Notes",
  "Presentations",
] as const;
const ALL_TYPES = [...TYPES];

export default function ImageUpload({ onImageUpload }: Props) {
  //Form Data Validation
  const formData = useForm<z.infer<typeof ImageUploadSchema>>({
    resolver: zodResolver(ImageUploadSchema),
    defaultValues: {
      image: undefined,
      options: [],
      assignmentCount: undefined,
      presentationCount: undefined,
      quizDifficulty: undefined,
      mcqsCount: undefined,
      trueFalseCount: undefined,
      shortQCount: undefined,
      longQCount: undefined,
    },
  });

  const [openDialog, setOpenDialog] = useState<
    null | "assignments" | "presentations" | "quiz" | "midterm" | "finalterm"
  >(null);
  const [tempValue, setTempValue] = useState<number | string>("");

  useEffect(() => {
    if (openDialog === null) setTempValue("");
  }, [openDialog]);

  const handleDialogConfirm = () => {
    if (openDialog === "assignments") {
      formData.setValue("assignmentCount", Number(tempValue));
    }
    if (openDialog === "presentations") {
      formData.setValue("presentationCount", Number(tempValue));
    }
    if (openDialog === "quiz") {
      const temp = tempValue as unknown as QuizOptions;

      formData.setValue("quizDifficulty", temp.difficulty);
      formData.setValue("mcqsCount", temp.mcqs);
      formData.setValue("trueFalseCount", temp.trueFalse);
      formData.setValue("shortQCount", temp.shortQ);
      formData.setValue("longQCount", temp.longQ);
    }
    if (openDialog === "midterm") {
      const temp = tempValue as unknown as QuestionCounts;
      formData.setValue("midMcqsCount", temp.mcqs);
      formData.setValue("midTrueFalseCount", temp.trueFalse);
      formData.setValue("midShortQCount", temp.shortQ);
      formData.setValue("midLongQCount", temp.longQ);
    }

    if (openDialog === "finalterm") {
      const temp = tempValue as unknown as QuestionCounts;
      formData.setValue("finalMcqsCount", temp.mcqs);
      formData.setValue("finalTrueFalseCount", temp.trueFalse);
      formData.setValue("finalShortQCount", temp.shortQ);
      formData.setValue("finalLongQCount", temp.longQ);
    }
    setOpenDialog(null);
  };

  const handleDialogCancel = () => {
    // Uncheck the related checkbox
    const currentOptions = formData.getValues("options");
    const updatedOptions = currentOptions.filter((opt) => {
      if (openDialog === "assignments") return opt !== "Assignments";
      if (openDialog === "presentations") return opt !== "Presentations";
      if (openDialog === "quiz") return opt !== "Quiz";
      return true;
    });
    formData.setValue("options", updatedOptions);
    setOpenDialog(null);
  };

  return (
    <div>
      <Form {...formData}>
        <form
          onSubmit={formData.handleSubmit(onImageUpload)}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          {/* Upload Button */}
          <FormField
            control={formData.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-[50px] h-[50px]">
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                    <label
                      htmlFor="file-upload"
                      className="absolute inset-0 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 cursor-pointer border"
                    >
                      <PaperclipIcon className="w-6 h-6 text-muted-foreground" />
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Checkboxes */}
          <FormField
            control={formData.control}
            name="options"
            render={() => (
              <FormItem>
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Select All */}
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={
                          formData.watch("options").length === ALL_TYPES.length
                        }
                        className="border-2 border-gray-300"
                        onCheckedChange={(checked) => {
                          const newValue = checked ? ALL_TYPES : [];
                          formData.setValue("options", newValue);
                        }}
                      />
                    </FormControl>
                    <span>Select All</span>
                  </FormItem>

                  {/* Deselect All */}
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={formData.watch("options").length === 0}
                        onCheckedChange={() => {
                          formData.setValue("options", []);
                        }}
                      />
                    </FormControl>
                    <span>Deselect All</span>
                  </FormItem>
                  {TYPES.map((type) => (
                    <FormField
                      key={type}
                      control={formData.control}
                      name="options"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(type)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, type]
                                  : field.value.filter((item) => item !== type);
                                field.onChange(newValue);

                                // Open dialogs when checked
                                if (checked) {
                                  switch (type) {
                                    case "Assignments":
                                      setOpenDialog("assignments");
                                      break;
                                    case "Presentations":
                                      setOpenDialog("presentations");
                                      break;
                                    case "Quiz":
                                      setOpenDialog("quiz");
                                      break;
                                    case "Midterm":
                                      setOpenDialog("midterm");
                                      break;
                                    case "Finalterm":
                                      setOpenDialog("finalterm");
                                      break;
                                  }
                                }
                              }}
                            />
                          </FormControl>
                          <span className="capitalize">{type}</span>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="rounded-full p-3">
            <SendIcon className="w-5 h-5" />
          </Button>
        </form>
      </Form>
      <Dialog
        open={!!openDialog}
        onOpenChange={(v) => v || handleDialogCancel()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {openDialog === "quiz" ? "Select Quiz Difficulty" : "Enter Count"}
            </DialogTitle>
          </DialogHeader>

          {openDialog === "quiz" ||
          openDialog === "midterm" ||
          openDialog === "finalterm" ? (
            <div className="flex flex-col gap-4">
              {openDialog === "quiz" && (
                <>
                  {/* Difficulty for quiz only */}
                  <label className="font-medium">Select Difficulty</label>
                  <RadioGroup
                    defaultValue=""
                    onValueChange={(value) => {
                      setTempValue((prev: any) => ({
                        ...prev,
                        difficulty: value,
                      }));
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="easy" id="easy" />
                      <label htmlFor="easy">Easy</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <label htmlFor="medium">Medium</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hard" id="hard" />
                      <label htmlFor="hard">Hard</label>
                    </div>
                  </RadioGroup>
                </>
              )}

              {/* Shared counts for Quiz, Midterm, Finalterm */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="MCQs Count"
                  onChange={(e) =>
                    setTempValue((prev: any) => ({
                      ...prev,
                      mcqs: Number(e.target.value),
                    }))
                  }
                />
                <Input
                  type="number"
                  placeholder="True/False Count"
                  onChange={(e) =>
                    setTempValue((prev: any) => ({
                      ...prev,
                      trueFalse: Number(e.target.value),
                    }))
                  }
                />
                <Input
                  type="number"
                  placeholder="Short Qs Count"
                  onChange={(e) =>
                    setTempValue((prev: any) => ({
                      ...prev,
                      shortQ: Number(e.target.value),
                    }))
                  }
                />
                <Input
                  type="number"
                  placeholder="Long Qs Count"
                  onChange={(e) =>
                    setTempValue((prev: any) => ({
                      ...prev,
                      longQ: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          ) : (
            <Input
              type="number"
              placeholder="Enter count"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
          )}

          <DialogFooter>
            <Button onClick={handleDialogCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleDialogConfirm} disabled={!tempValue}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

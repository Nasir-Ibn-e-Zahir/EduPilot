import * as z from 'zod'


export const ImageUploadSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Please upload an image",
    }).optional(),
    prompt: z.string().optional(),
  options: z.array(
    z.enum([
      "Quiz",
      "Assignments",
      "Midterm",
      "Finalterm",
      "Notes",
      "Presentations",
    ])
  ),
  assignmentCount: z.number().min(1).optional(),
  presentationCount: z.number().min(1).optional(),

  // Quiz fields
  quizDifficulty: z.enum(["easy", "medium", "hard"]).optional(),
  mcqsCount: z.number().min(0).optional(),
  trueFalseCount: z.number().min(0).optional(),
  shortQCount: z.number().min(0).optional(),
  longQCount: z.number().min(0).optional(),

   // Midterm fields
  midMcqsCount: z.number().min(0).optional(),
  midTrueFalseCount: z.number().min(0).optional(),
  midShortQCount: z.number().min(0).optional(),
  midLongQCount: z.number().min(0).optional(),

  // Finalterm fields
  finalMcqsCount: z.number().min(0).optional(),
  finalTrueFalseCount: z.number().min(0).optional(),
  finalShortQCount: z.number().min(0).optional(),
  finalLongQCount: z.number().min(0).optional(),

  
})
 .refine(
    (data) => {
      const hasPrompt = !!data.prompt?.trim();
      const hasImage = data.image instanceof File;
      return !(hasPrompt && hasImage); // false if both present
    },
    {
      message: "Please provide either a prompt or an image — not both.",
      path: ["prompt"], // Attach the error to the prompt field
    }
  )
  .refine(
    (data) => {
      const hasPrompt = !!data.prompt?.trim();
      const hasImage = data.image instanceof File;
      return hasPrompt || hasImage; // true if at least one is present
    },
    {
      message: "Either a prompt or an image is required.",
      path: ["prompt"], // Attach the error to the prompt field
    }
  );




export const signupSchema = z.object({
    name: z.string().min(4,"Name should be at least 4 chracters long!")
    .max(30,"Name should not be exceed 30 chracters!"),
    email:z.string().email(),
    password:z.string().min(8,"Password should be at least 8 chracters!")
    .max(16,"Password should not be exceed from 16 chracters!")
    
})

export const signinSchema = z
  .object({
    // name: z.string().min(4, "Name should be at least 4 characters long!")
    //   .max(30, "Name should not exceed 30 characters!")
    //   .optional()
    //   .or(z.literal("")), // allow empty string

    identifier: z.string().min(4, "Enter at least 4 characters (name or email)."),
    password: z.string().min(8, "Password should be at least 8 characters!")
      .max(16, "Password should not exceed 16 characters!"),
  })
//   .refine(data => data.email || data.name, {
//     message: "Either name or email must be provided!",
//     path: ["email"], // can be ["name"] or [] depending on where you want the error to show


export const submissionSchema = z.object({
  id: z.string().uuid(),
  submissionName: z.string(),
  userid: z.string(),
  files: z.array(z.string()), 
})
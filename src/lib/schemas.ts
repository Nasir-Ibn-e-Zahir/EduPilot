import * as z from 'zod'
export const ImageUploadSchema = z.object({
    image: z.instanceof(File) .refine((file) => file instanceof File, 'Please upload a valid file') 
})

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

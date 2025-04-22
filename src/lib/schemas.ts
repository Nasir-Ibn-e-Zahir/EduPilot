import * as z from 'zod'
export const ImageUploadSchema = z.object({
    image: z.instanceof(File) .refine((file) => file instanceof File, 'Please upload a valid file') 
})
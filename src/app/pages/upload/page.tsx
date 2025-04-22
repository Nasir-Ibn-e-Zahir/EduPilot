"use client";
import ImageUpload from "@/components/forms/ImageUpload";

import { ImageUploadSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


import { useState } from "react";
import * as z from "zod";


export default function ImageUploadComponent() {
  const router = useRouter()
  const [upimgMessage,setUploadMessage] = useState()
  const onImageUpload = async (data: z.infer<typeof ImageUploadSchema>) => {
    //  Creates a form data object similar to what HTML forms send.
    //  Automatically sets the correct Content-Type to multipart/form-data.
    //  Without FormData, you can't send file data using fetch().
    const formdata = new FormData();
    //  Adds a new field to the FormData.
    formdata.append("image", data.image);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formdata,
    });
    if (!response.ok) {
      throw new Error("Failed to Upload Image!");
    }
     return response.json()
  };

  const mutation = useMutation({
    mutationKey: ["images"],
    mutationFn: onImageUpload,
    onSuccess: (data) => {
      setUploadMessage(data.message); // Show success message
      console.log(upimgMessage)
      
      // Optionally redirect:
      router.push("/"); // 👈 navigate after successful upload
    },
  });

  
  
  return (
    <ImageUpload onImageUpload={mutation.mutate} />
   );
}

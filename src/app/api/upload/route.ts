import { NextRequest, NextResponse } from "next/server";

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
   // req.formData catches the key value pairs ("image": Image-file) from formData
  const formData = await req.formData();
  // Extracts the image file from the formData Object
  const file = formData.get("image") as File;
  console.log(file)
  

  // Create new FormData to send to FastAPI
  const fastApiFormData = new FormData();
  fastApiFormData.append("file", file); // 'file' should match FastAPI param

  const response = await fetch("http://localhost:5000/extract-text", {
    method: "POST",
    body: fastApiFormData,
  });

   const data = await response.json()
   

  return NextResponse.json({
    message: "Text extracted successfully!",
    text: data,
  });

  
}

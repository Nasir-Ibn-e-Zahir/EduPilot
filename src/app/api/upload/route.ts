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

  return NextResponse.json({
    message: "Image uploaded successfully!",
    
  });
}

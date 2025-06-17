
import { db } from "@/lib/db";
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
  const userid = formData.get("userid") as string;
  // console.log(file)
  console.log("------------> ",userid)
  console.log(Object.keys(db));

  const submission = await db.submission.create({
    data:{
      userId: userid
    }
  })

  console.log("Submission id ---------------------------->",submission.id)
  

  // Create new FormData to send to FastAPI
  const fastApiFormData = new FormData();
  fastApiFormData.append("file", file); // 'file' should match FastAPI param
  fastApiFormData.append("userid", userid); // 'file' should match FastAPI param
  fastApiFormData.append("submissionId", submission.id); // 'file' should match FastAPI param
  


  const response = await fetch("http://localhost:5000/extract-text", {
    method: "POST",
    body: fastApiFormData,
  });

   const data = await response.json() 
   console.log(data)

  return NextResponse.json([
    "Message compiled successfully!"
  ]);

  
}

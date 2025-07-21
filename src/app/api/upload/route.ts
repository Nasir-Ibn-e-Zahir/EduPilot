
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
  

  


  const submission = await db.presentation.create({
    data:{
      userId: userid,
      name: 'Quiz'
    }
  })

  
  

  // Create new FormData to send to FastAPI
  const fastApiFormData = new FormData();
  fastApiFormData.append("file", file); // 'file' should match FastAPI param
  fastApiFormData.append("userid", userid); // 'file' should match FastAPI param
  fastApiFormData.append("submissionId", submission.id); // 'file' should match FastAPI param
  
  if(formData.get('Quiz')){
    fastApiFormData.append('features','Quiz')
  }      
  if(formData.get('Assignments')){
    fastApiFormData.append('features','Assignments')
  }      
  if(formData.get('Presentations')){
    fastApiFormData.append('features','Presentations')
  }      
  if(formData.get('Midterm')){
    fastApiFormData.append('features','Midterm')
  }      
  if(formData.get('Finalterm')){
    fastApiFormData.append('features','Finalterm')
  }      
  if(formData.get('Notes')){
    fastApiFormData.append('features','Notes')
  }      


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

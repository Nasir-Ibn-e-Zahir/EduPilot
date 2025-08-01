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

  const submission = await db.submission.create({
    data: {
      userId: userid,
      name: "submission",
    },
  });

  // Create new FormData to send to FastAPI
  const fastApiFormData = new FormData();
  fastApiFormData.append("file", file); // 'file' should match FastAPI param
  fastApiFormData.append("userid", userid); // 'file' should match FastAPI param
  fastApiFormData.append("submissionId", submission.id); // 'file' should match FastAPI param

  if (formData.get("Quiz")) {
    fastApiFormData.append("features", "Quiz");
 
    fastApiFormData.append('longQCount',formData.get("longQCount") as string)
    fastApiFormData.append('trueFalseCount',formData.get("trueFalseCount") as string)
    fastApiFormData.append('shortQCount',formData.get("shortQCount") as string)
    fastApiFormData.append('mcqsCount',formData.get("mcqsCount") as string)
    fastApiFormData.append('quizDifficulty',formData.get("quizDifficulty") as string)
  }
  if (formData.get("Assignments")) {
    fastApiFormData.append("features", "Assignments");
    fastApiFormData.append("assignmentCount",formData.get("assignmentCount") as string)
  }
  if (formData.get("Presentations")) {
    fastApiFormData.append("features", "Presentations");
    fastApiFormData.append("presentationCount",formData.get("presentationCount") as string)
  }
  if (formData.get("Midterm")) {
    fastApiFormData.append("features", "Midterm");
    fastApiFormData.append('midLongQCount',formData.get("midLongQCount") as string)
    fastApiFormData.append('midTrueFalseCount',formData.get("midTrueFalseCount") as string)
    fastApiFormData.append('midShortQCount',formData.get("midShortQCount") as string)
    fastApiFormData.append('midMcqsCount',formData.get("midMcqsCount") as string)
  }
  if (formData.get("Finalterm")) {
    fastApiFormData.append("features", "Finalterm");

    fastApiFormData.append('finalLongQCount',formData.get("finalLongQCount") as string)
    fastApiFormData.append('finalTrueFalseCount',formData.get("finalTrueFalseCount") as string)
    fastApiFormData.append('finalShortQCount',formData.get("finalShortQCount") as string)
    fastApiFormData.append('finalMcqsCount',formData.get("finalMcqsCount") as string)
  }
  if (formData.get("Notes")) {
    fastApiFormData.append("features", "Notes");
  }

  console.log('Route.ts------------------> ',fastApiFormData)

  const response = await fetch("http://localhost:5000/extract-text", {
    method: "POST",
    body: fastApiFormData,
  });

  const data = await response.json();
  console.log(data);
  
  await db.submission.update({
    where:{id:submission.id},
    data:{
      name:data.response
    }
  })
  return NextResponse.json(["Message compiled successfully!"]);
}

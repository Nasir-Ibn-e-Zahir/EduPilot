// app/api/user-submissions/route.ts (or similar)

import { db } from '@/lib/db'; // adjust your import path

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const submissions = await db.submission.findMany({
    where: { userId },
    
  });

  const submissionIds = submissions.map((s) =>{
    return {id:s.id,name:s.name}
  });

  
  
  // Now send these to FastAPI
  const fastApiRes = await fetch('http://localhost:8000/get-user-files', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ submissionIds }),
    
  });

  const result = await fastApiRes.json();

//  result.forEach(element => {
//     console.log(element.submissionId)
//   });
  console.log("Result------>",result)


  return Response.json(result);
}

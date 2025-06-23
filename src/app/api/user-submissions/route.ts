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
    select: { id: true },
  });

  const submissionIds = submissions.map((s) => s.id);

  // Now send these to FastAPI
  const fastApiRes = await fetch('http://localhost:8000/get-user-files', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ submissionIds }),
  });

  const result = await fastApiRes.json();
  return Response.json(result);
}

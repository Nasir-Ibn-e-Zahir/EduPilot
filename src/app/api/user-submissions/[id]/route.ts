// DELETE /api/user-submissions/[id]
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
 req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const submissionId = params.id;

    // 🔸 Step 1: Call FastAPI to delete folder
    const fastApiBaseUrl = process.env.FASTAPI_URL; // You can set this in .env file
    const fastApiResponse = await fetch(`${fastApiBaseUrl}/api/submissions/${submissionId}`, {
      method: 'DELETE',
    });

    if (!fastApiResponse.ok) {
      const errorText = await fastApiResponse.text();
      console.error('FastAPI folder deletion failed:', errorText);
    }

    // 🔸 Step 2: Delete from Prisma database
    await db.submission.delete({
      where: { id: submissionId },
    });

    return NextResponse.json({ message: 'Submission and folder deleted successfully' });
  } catch (error) {
    console.error('Delete failed:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

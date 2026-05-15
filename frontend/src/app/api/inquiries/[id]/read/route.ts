import { NextRequest } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { isAdmin, unauthorizedResponse } from '@/lib/admin-auth';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!isAdmin(req)) return unauthorizedResponse();

  const { id } = await params;
  const db     = getDb();

  await db.collection('inquiries').doc(id).update({ isRead: true });
  return Response.json({ ok: true });
}

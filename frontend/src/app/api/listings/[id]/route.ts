import { NextRequest } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { isAdmin, unauthorizedResponse } from '@/lib/admin-auth';
import { FieldValue } from 'firebase-admin/firestore';

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const db  = getDb();
  const doc = await db.collection('listings').doc(id).get();

  if (!doc.exists || !doc.data()?.isActive) {
    return Response.json({ error: 'Listing not found' }, { status: 404 });
  }

  doc.ref.update({ viewCount: FieldValue.increment(1) }).catch(() => {});
  return Response.json({ id: doc.id, ...doc.data() });
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!isAdmin(req)) return unauthorizedResponse();
  const { id } = await params;
  const data = await req.json();
  const db = getDb();

  await db.collection('listings').doc(id).update({
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  });

  const updated = await db.collection('listings').doc(id).get();
  return Response.json({ id: updated.id, ...updated.data() });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!isAdmin(req)) return unauthorizedResponse();
  const { id } = await params;
  const db = getDb();

  await db.collection('listings').doc(id).update({
    isActive:  false,
    updatedAt: FieldValue.serverTimestamp(),
  });

  return Response.json({ message: 'Listing deactivated' });
}

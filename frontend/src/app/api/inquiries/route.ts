import { NextRequest } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { isAdmin, unauthorizedResponse } from '@/lib/admin-auth';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.name || !data.email || !data.message) {
    return Response.json({ error: 'Name, email, and message are required' }, { status: 400 });
  }

  const db     = getDb();
  const docRef = await db.collection('inquiries').add({
    name:      data.name,
    email:     data.email,
    phone:     data.phone  || null,
    message:   data.message,
    listingId: data.listingId || null,
    isRead:    false,
    createdAt: FieldValue.serverTimestamp(),
  });

  const doc = await docRef.get();
  return Response.json({ id: docRef.id, ...doc.data() }, { status: 201 });
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return unauthorizedResponse();

  const db   = getDb();
  const snap = await db.collection('inquiries').get();

  const inquiries = await Promise.all(
    snap.docs.map(async (d) => {
      const inqData = d.data();
      let listing   = null;

      if (inqData.listingId) {
        const lDoc = await db.collection('listings').doc(inqData.listingId).get();
        if (lDoc.exists) {
          listing = { id: lDoc.id, title: lDoc.data()?.title, slug: lDoc.data()?.slug };
        }
      }

      return { id: d.id, ...inqData, listing };
    })
  );

  return Response.json(inquiries);
}

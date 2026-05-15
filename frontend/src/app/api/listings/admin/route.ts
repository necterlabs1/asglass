import { NextRequest } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { isAdmin, unauthorizedResponse } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return unauthorizedResponse();

  const db   = getDb();
  const snap = await db.collection('listings').get();

  const listings = await Promise.all(
    snap.docs.map(async (d) => {
      const inquirySnap = await db
        .collection('inquiries')
        .where('listingId', '==', d.id)
        .count()
        .get();
      return {
        id: d.id,
        ...d.data(),
        _count: { inquiries: inquirySnap.data().count },
      };
    })
  );

  return Response.json(listings);
}

import { NextRequest } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { isAdmin, unauthorizedResponse } from '@/lib/admin-auth';
import { FieldValue } from 'firebase-admin/firestore';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search   = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const featured = searchParams.get('featured') === 'true';
  const trending = searchParams.get('trending') === 'true';

  const db = getDb();
  // Fetch all active listings — filter/sort in memory to avoid composite index requirement
  const snap = await db.collection('listings').where('isActive', '==', true).get();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let listings: any[] = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));

  // Apply filters in memory
  if (category) listings = listings.filter(l => l.category === category);
  if (featured) listings = listings.filter(l => l.isFeatured === true);
  if (trending) listings = listings.filter(l => l.isTrending === true);
  if (search) {
    const s = search.toLowerCase();
    listings = listings.filter(l =>
      l.title?.toLowerCase().includes(s) ||
      l.location?.toLowerCase().includes(s) ||
      l.category?.toLowerCase().includes(s) ||
      l.description?.toLowerCase().includes(s)
    );
  }

  // Sort: featured first, then trending, then newest
  listings.sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
    if (a.isTrending !== b.isTrending) return a.isTrending ? -1 : 1;
    const aTime = a.createdAt?._seconds ?? 0;
    const bTime = b.createdAt?._seconds ?? 0;
    return bTime - aTime;
  });

  return Response.json(listings);
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return unauthorizedResponse();

  const data = await req.json();
  if (!data.title || !data.price) {
    return Response.json({ error: 'Title and price are required' }, { status: 400 });
  }

  const db = getDb();
  const slug = data.slug || `${data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;

  const docRef = await db.collection('listings').add({
    ...data,
    slug,
    images:     data.images     ?? [],
    isFeatured: data.isFeatured ?? false,
    isTrending: data.isTrending ?? false,
    isActive:   true,
    viewCount:  0,
    rating:     data.rating ?? 4.5,
    createdAt:  FieldValue.serverTimestamp(),
    updatedAt:  FieldValue.serverTimestamp(),
  });

  const doc = await docRef.get();
  return Response.json({ id: docRef.id, ...doc.data() }, { status: 201 });
}

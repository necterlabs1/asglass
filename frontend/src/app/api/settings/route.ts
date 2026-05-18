import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { isAdmin } from '@/lib/admin-auth';

export async function GET() {
  try {
    const doc = await getDb().collection('settings').doc('homeConfig').get();
    return NextResponse.json(doc.exists ? doc.data() : {});
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    await getDb().collection('settings').doc('homeConfig').set(body, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

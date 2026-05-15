import { NextRequest } from 'next/server';
import { isAdmin, unauthorizedResponse } from '@/lib/admin-auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return unauthorizedResponse();

  const formData = await req.formData();
  const file     = formData.get('file') as File | null;

  if (!file) {
    return Response.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowed.includes(file.type)) {
    return Response.json({ error: 'Only image files are allowed' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return Response.json({ error: 'File size must be under 10MB' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const url    = await uploadToCloudinary(buffer, file.name);

  return Response.json({ url });
}

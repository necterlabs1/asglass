import { NextRequest } from 'next/server';

export function isAdmin(req: NextRequest): boolean {
  const key = req.headers.get('x-admin-key');
  return Boolean(key && key === process.env.ADMIN_SECRET);
}

export function unauthorizedResponse(): Response {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

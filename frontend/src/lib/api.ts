// All API calls go to Next.js Route Handlers at /api (same origin)
const BASE = '/api';

function getAdminKey(): string {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('necterlabs_admin_key') || process.env.NEXT_PUBLIC_ADMIN_KEY || '';
  }
  return process.env.NEXT_PUBLIC_ADMIN_KEY || '';
}

function qs(params?: Record<string, string | boolean | undefined>): string {
  if (!params) return '';
  const filtered = Object.entries(params).filter(([, v]) => v !== undefined && v !== '');
  if (filtered.length === 0) return '';
  return '?' + filtered.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
}

async function adminFetch(method: string, path: string, body?: unknown, isFormData = false) {
  const headers: Record<string, string> = { 'x-admin-key': getAdminKey() };
  if (!isFormData && body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

// Firestore uses string document IDs
export type Listing = {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc?: string;
  location: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPct: number;
  duration?: string;
  groupSize?: string;
  rating: number;
  coverImage?: string;
  images: string[] | string; // Firestore: string[], legacy SQLite: JSON string
  isFeatured: boolean;
  isTrending: boolean;
  isActive: boolean;
  viewCount: number;
  createdAt: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  listingId?: string;
  isRead: boolean;
  createdAt: string;
  listing?: { id: string; title: string; slug: string } | null;
};

export const api = {
  // Public
  getListings: (params?: { search?: string; category?: string; featured?: string; trending?: string }): Promise<Listing[]> =>
    fetch(`${BASE}/listings${qs(params)}`).then(r => r.json()),

  getListing: (id: string): Promise<Listing> =>
    fetch(`${BASE}/listings/${id}`).then(r => r.json()),

  createInquiry: (data: Omit<Inquiry, 'id' | 'isRead' | 'createdAt' | 'listing'>) =>
    fetch(`${BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // Admin
  getAllListingsAdmin: (): Promise<(Listing & { _count: { inquiries: number } })[]> =>
    adminFetch('GET', '/listings/admin'),

  createListing: (data: Partial<Listing>) => adminFetch('POST', '/listings', data),

  updateListing: (id: string, data: Partial<Listing & { isActive: boolean }>) =>
    adminFetch('PUT', `/listings/${id}`, data),

  deleteListing: (id: string) => adminFetch('DELETE', `/listings/${id}`),

  getInquiries: (): Promise<Inquiry[]> => adminFetch('GET', '/inquiries'),

  markInquiryRead: (id: string) => adminFetch('PATCH', `/inquiries/${id}/read`),

  uploadImage: (file: File): Promise<{ url: string }> => {
    const fd = new FormData();
    fd.append('file', file);
    return adminFetch('POST', '/upload', fd, true);
  },
};

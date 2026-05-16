'use client';
import { useState, useEffect, useCallback } from 'react';
import { api, type Listing, type Inquiry } from '@/lib/api';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || 'burraa-admin-secret-2024';

type Tab = 'listings' | 'inquiries';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [keyError, setKeyError] = useState(false);
  const [tab, setTab] = useState<Tab>('listings');

  useEffect(() => {
    const stored = sessionStorage.getItem('necterlabs_admin_key');
    if (stored === ADMIN_KEY) setAuthed(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput === ADMIN_KEY) {
      sessionStorage.setItem('necterlabs_admin_key', keyInput);
      setAuthed(true);
    } else {
      setKeyError(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-10 max-w-sm w-full text-center">
          <h1 className="text-2xl font-extrabold text-[#ff6b6b] mb-1">necterlabs</h1>
          <p className="text-[#9a9a9a] text-sm mb-8">Admin Portal</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={keyInput}
              onChange={e => { setKeyInput(e.target.value); setKeyError(false); }}
              placeholder="Enter admin key"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff6b6b] transition-colors text-center"
              autoFocus
            />
            {keyError && <p className="text-red-400 text-sm">Invalid admin key</p>}
            <Button type="submit" className="w-full" size="lg">Access Admin</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold">Admin <span className="text-[#ff6b6b]">Dashboard</span></h1>
          <p className="text-[#9a9a9a] text-sm mt-1">Manage listings, images, and inquiries</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => { sessionStorage.removeItem('necterlabs_admin_key'); setAuthed(false); }}>
          Logout
        </Button>
      </div>

      <div className="flex gap-3 mb-8">
        {(['listings', 'inquiries'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${tab === t ? 'bg-[#ff6b6b] text-white' : 'glass text-[#9a9a9a] hover:text-white'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'listings' ? <ListingsTab /> : <InquiriesTab />}
    </div>
  );
}

function ListingsTab() {
  const [listings, setListings] = useState<(Listing & { _count?: { inquiries: number } })[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Listing | null>(null);
  const [form, setForm] = useState(defaultForm());
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ total: 0, active: 0, featured: 0 });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getAllListingsAdmin();
      setListings(data);
      setStats({ total: data.length, active: data.filter(l => l.isActive).length, featured: data.filter(l => l.isFeatured).length });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setEditing(null); setForm(defaultForm()); setImageFiles([]); setImagePreviews([]); setModalOpen(true); };
  const openEdit = (l: Listing) => {
    setEditing(l);
    setForm({ title: l.title, location: l.location, category: l.category, description: l.description, shortDesc: l.shortDesc || '', price: String(l.price), originalPrice: l.originalPrice ? String(l.originalPrice) : '', discountPct: String(l.discountPct), duration: l.duration || '', groupSize: l.groupSize || '', rating: String(l.rating), isFeatured: l.isFeatured, isTrending: l.isTrending });
    setImageFiles([]);
    setImagePreviews([]);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.location || !form.price) return;
    setSaving(true);
    try {
      // Upload all selected images to Cloudinary
      const uploadedUrls: string[] = [];
      for (const file of imageFiles) {
        const res = await api.uploadImage(file);
        uploadedUrls.push(res.url);
      }
      // First uploaded image = cover; rest = gallery
      const coverImage = uploadedUrls[0] || editing?.coverImage || '';
      const existingImages = Array.isArray(editing?.images) ? editing.images as string[] : [];
      const images = uploadedUrls.length > 1 ? uploadedUrls.slice(1) : existingImages;

      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        discountPct: Number(form.discountPct),
        rating: Number(form.rating),
        ...(coverImage && { coverImage }),
        images,
      };
      if (editing) await api.updateListing(editing.id, payload);
      else await api.createListing(payload);
      setModalOpen(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const toggleFlag = async (l: Listing, flag: 'isFeatured' | 'isTrending' | 'isActive') => {
    await api.updateListing(l.id, { [flag]: !l[flag] });
    setListings(prev => prev.map(p => p.id === l.id ? { ...p, [flag]: !p[flag] } : p));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deactivate this listing?')) return;
    await api.deleteListing(id);
    load();
  };

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[['Total', stats.total, '#ff6b6b'], ['Active', stats.active, '#00d2d3'], ['Featured', stats.featured, '#ffd700']].map(([l, v, c]) => (
          <div key={l as string} className="glass rounded-2xl p-5">
            <p className="text-xs text-[#9a9a9a] uppercase tracking-wider mb-1">{l}</p>
            <p className="text-3xl font-extrabold" style={{ color: c as string }}>{v}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">All Listings</h2>
        <Button size="sm" onClick={openCreate}>+ Add Listing</Button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-[#9a9a9a] text-xs uppercase">
                <th className="text-left px-5 py-3">Title</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Category</th>
                <th className="text-right px-5 py-3">Price</th>
                <th className="text-center px-5 py-3 hidden sm:table-cell">Featured</th>
                <th className="text-center px-5 py-3 hidden sm:table-cell">Trending</th>
                <th className="text-center px-5 py-3 hidden sm:table-cell">Active</th>
                <th className="text-center px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map(l => (
                <tr key={l.id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-medium max-w-[200px] truncate">{l.title}</div>
                    <div className="text-xs text-[#9a9a9a]">{l.location}</div>
                  </td>
                  <td className="px-5 py-3 text-[#9a9a9a] hidden md:table-cell">{l.category}</td>
                  <td className="px-5 py-3 text-right text-[#ff6b6b] font-semibold">₹{l.price.toLocaleString('en-IN')}</td>
                  {(['isFeatured', 'isTrending', 'isActive'] as const).map(flag => (
                    <td key={flag} className="px-5 py-3 text-center hidden sm:table-cell">
                      <button onClick={() => toggleFlag(l, flag)} className="text-lg">
                        {l[flag] ? '✅' : '⬜'}
                      </button>
                    </td>
                  ))}
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(l)} className="text-[#9a9a9a] hover:text-[#00d2d3] transition-colors p-1">✏️</button>
                      <button onClick={() => handleDelete(l.id)} className="text-[#9a9a9a] hover:text-red-400 transition-colors p-1">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {listings.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-[#9a9a9a]">No listings yet. Create your first one!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Listing' : 'New Listing'} size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Title *" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <F label="Location *" value={form.location} onChange={v => setForm(f => ({ ...f, location: v }))} />
          <div>
            <label className="text-xs text-[#9a9a9a] block mb-1">Category *</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#ff6b6b]">
              {['Adventures', 'Yachts', 'Bike Tours', 'Scuba Diving', 'Resorts', 'Events'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <F label="Price (₹) *" type="number" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} />
          <F label="Original Price (₹)" type="number" value={form.originalPrice} onChange={v => setForm(f => ({ ...f, originalPrice: v }))} />
          <F label="Duration" value={form.duration} onChange={v => setForm(f => ({ ...f, duration: v }))} placeholder="e.g. 3 hours" />
          <F label="Group Size" value={form.groupSize} onChange={v => setForm(f => ({ ...f, groupSize: v }))} placeholder="e.g. 2-12 pax" />
          <F label="Rating" type="number" value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
          <div className="sm:col-span-2">
            <label className="text-xs text-[#9a9a9a] block mb-1">Short Description</label>
            <input value={form.shortDesc} onChange={e => setForm(f => ({ ...f, shortDesc: e.target.value }))}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#ff6b6b]" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-[#9a9a9a] block mb-1">Description *</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#ff6b6b] resize-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-[#9a9a9a] block mb-2">
              Photos — select up to 5 (first = cover photo, rest = gallery)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={e => {
                const files = Array.from(e.target.files || []).slice(0, 5);
                setImageFiles(files);
                setImagePreviews(files.map(f => URL.createObjectURL(f)));
              }}
              className="text-sm text-[#9a9a9a] file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#ff6b6b] file:text-white file:text-sm file:font-medium cursor-pointer"
            />
            {/* New photo previews */}
            {imagePreviews.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`preview ${i}`} className="w-16 h-16 object-cover rounded-lg border border-[#2a2a2a]" />
                    {i === 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#ff6b6b] text-white text-[8px] px-1 rounded">COVER</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Existing cover image */}
            {!imagePreviews.length && editing?.coverImage && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="relative">
                  <img src={editing.coverImage} alt="current cover" className="w-16 h-16 object-cover rounded-lg border border-[#2a2a2a]" />
                  <span className="absolute -top-1 -right-1 bg-[#9a9a9a] text-white text-[8px] px-1 rounded">COVER</span>
                </div>
                {Array.isArray(editing.images) && (editing.images as string[]).map((img, i) => (
                  <img key={i} src={img} alt={`gallery ${i}`} className="w-16 h-16 object-cover rounded-lg border border-[#2a2a2a]" />
                ))}
              </div>
            )}
          </div>
          <div className="sm:col-span-2 flex flex-wrap gap-5">
            {[['isFeatured', 'Featured'], ['isTrending', 'Trending']] .map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form[key as 'isFeatured' | 'isTrending']}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                  className="w-4 h-4 accent-[#ff6b6b]" />
                {label}
              </label>
            ))}
          </div>
          <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} loading={saving}>{editing ? 'Update' : 'Create'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function InquiriesTab() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setInquiries(await api.getInquiries()); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const markRead = async (id: string) => {
    await api.markInquiryRead(id);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, isRead: true } : i));
  };

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>;

  const unread = inquiries.filter(i => !i.isRead).length;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-bold text-lg">All Inquiries</h2>
        {unread > 0 && <span className="bg-[#ff6b6b] text-white text-xs font-semibold px-2 py-0.5 rounded-full">{unread} unread</span>}
      </div>
      <div className="space-y-3">
        {inquiries.map(inq => (
          <div key={inq.id} className={`glass rounded-2xl p-5 border ${inq.isRead ? 'border-[#2a2a2a]' : 'border-[#ff6b6b]/40'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className="font-semibold">{inq.name}</span>
                  <span className="text-[#9a9a9a] text-sm">{inq.email}</span>
                  {inq.phone && <span className="text-[#9a9a9a] text-sm">{inq.phone}</span>}
                  {!inq.isRead && <span className="text-xs bg-[#ff6b6b] text-white px-2 py-0.5 rounded-full">New</span>}
                </div>
                {inq.listing && (
                  <p className="text-xs text-[#9a9a9a] mb-2">Re: {inq.listing.title}</p>
                )}
                <p className="text-sm text-[#f5f5f5] leading-relaxed">{inq.message}</p>
                <p className="text-xs text-[#9a9a9a] mt-2">{new Date(inq.createdAt).toLocaleString()}</p>
              </div>
              {!inq.isRead && (
                <Button variant="ghost" size="sm" onClick={() => markRead(inq.id)}>Mark Read</Button>
              )}
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <div className="text-center py-16 text-[#9a9a9a]">No inquiries yet.</div>
        )}
      </div>
    </div>
  );
}

function F({ label, value, onChange, type = 'text', placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs text-[#9a9a9a] block mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#ff6b6b] transition-colors" />
    </div>
  );
}

function defaultForm() {
  return { title: '', location: '', category: 'Adventures', description: '', shortDesc: '', price: '', originalPrice: '', discountPct: '0', duration: '', groupSize: '', rating: '4.5', isFeatured: false, isTrending: false };
}

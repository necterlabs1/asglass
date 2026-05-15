'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import Button from '../ui/Button';

interface Props {
  listingId?: string;
  listingTitle?: string;
}

export default function InquiryForm({ listingId, listingTitle }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: listingTitle ? `Hi! I am interested in "${listingTitle}". Please share more details.` : '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      await api.createInquiry({ ...form, listingId });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-900/30 border border-green-700 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-3">✅</div>
        <h3 className="font-bold text-lg mb-1">Inquiry Sent!</h3>
        <p className="text-[#9a9a9a] text-sm">We will get back to you within 24 hours.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-[#ff6b6b] hover:underline">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Your name" required />
        <Field label="Email *" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="you@email.com" required />
      </div>
      <Field label="Phone" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} placeholder="+91 98765 43210" />
      <div>
        <label className="text-xs text-[#9a9a9a] block mb-1">Message *</label>
        <textarea
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          rows={4}
          required
          placeholder="Tell us about your requirements..."
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff6b6b] transition-colors resize-none placeholder-[#555]"
        />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      )}
      <Button type="submit" loading={status === 'loading'} size="lg" className="w-full">
        Send Inquiry
      </Button>
    </form>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder = '', required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs text-[#9a9a9a] block mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff6b6b] transition-colors placeholder-[#555]"
      />
    </div>
  );
}

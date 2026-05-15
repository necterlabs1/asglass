'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const CITIES = [
  { name: 'Goa',               img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&q=80' },
  { name: 'Jammu & Kashmir',   img: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=200&q=80' },
  { name: 'Himachal Pradesh',  img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=200&q=80' },
  { name: 'Ladakh',            img: 'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=200&q=80' },
  { name: 'Kerala',            img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=200&q=80' },
  { name: 'Rajasthan',         img: 'https://images.unsplash.com/photo-1477587458883-47145ed94f4e?w=200&q=80' },
  { name: 'Uttarakhand',       img: 'https://images.unsplash.com/photo-1532978379173-523e16f371f9?w=200&q=80' },
  { name: 'Northeast',         img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=200&q=80' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
  selected: string;
}

export default function LocationSelector({ isOpen, onClose, onSelect, selected }: Props) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = CITIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#111111] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto z-10 pb-6">
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-3 flex-1 bg-[#1a1a1a] rounded-xl px-4 py-2.5">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#9a9a9a" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search locations"
              className="bg-transparent flex-1 text-sm text-white outline-none placeholder-[#9a9a9a]"
              autoFocus
            />
          </div>
          <button onClick={onClose} className="ml-3 text-[#9a9a9a] hover:text-white text-xl p-1">✕</button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 px-5">
          {filtered.map(city => (
            <button
              key={city.name}
              onClick={() => { onSelect(city.name); onClose(); }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-all ${selected === city.name ? 'border-[#ff4b2b]' : 'border-transparent group-hover:border-[#ff4b2b]/50'}`}>
                <Image
                  src={city.img}
                  alt={city.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <span className="text-xs text-center text-[#f5f5f5] leading-tight">{city.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 mx-5 border border-[#2a2a2a] rounded-xl">
          <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#9a9a9a] uppercase tracking-wider">
            VIEW OTHER CITIES
            <span className="text-[#9a9a9a]">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}

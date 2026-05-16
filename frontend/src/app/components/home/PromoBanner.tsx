'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BANNERS = [
  {
    img:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    title: 'BIKE TOURS',
    sub:   'STARTING @ ₹15,499/-',
    href:  '/listings?category=Bike+Tours',
  },
  {
    img:   'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80',
    title: 'SCUBA DIVING',
    sub:   'STARTING @ ₹2,999/-',
    href:  '/listings?category=Adventures',
  },
  {
    img:   'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=900&q=80',
    title: 'YACHT CRUISES',
    sub:   'STARTING @ ₹14,499/-',
    href:  '/listings?category=Yachts',
  },
];

export default function PromoBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % BANNERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-3 px-4 sm:px-6 max-w-screen-xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden h-44 sm:h-64 md:h-72">
        {BANNERS.map((b, i) => (
          <Link
            key={b.title}
            href={b.href}
            className={`absolute inset-0 transition-opacity duration-500 ${i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <Image src={b.img} alt={b.title} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute bottom-6 left-5 sm:left-8">
              <p className="text-white font-black text-3xl sm:text-5xl md:text-6xl leading-none tracking-tight drop-shadow-lg">
                {b.title}
              </p>
              <p className="text-[#ffd700] font-bold text-base sm:text-xl mt-1 drop-shadow-lg">
                {b.sub}
              </p>
            </div>
          </Link>
        ))}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === active ? 'bg-white w-4' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

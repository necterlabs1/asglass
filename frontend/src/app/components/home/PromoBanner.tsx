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

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % BANNERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-3 px-4 sm:px-6 max-w-screen-xl mx-auto">
      {/* Outer container clips the sliding track */}
      <div className="rounded-2xl overflow-hidden h-44 sm:h-64 md:h-72">

        {/* Sliding track — moves left by 100% per step */}
        <div
          className="flex h-full"
          style={{
            width: `${BANNERS.length * 100}%`,
            transform: `translateX(-${(active * 100) / BANNERS.length}%)`,
            transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {BANNERS.map((b) => (
            <Link
              key={b.title}
              href={b.href}
              className="relative flex-shrink-0 h-full"
              style={{ width: `${100 / BANNERS.length}%` }}
            >
              <Image
                src={b.img}
                alt={b.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/35" />

              {/* Text overlay */}
              <div className="absolute bottom-6 left-5 sm:left-8">
                <p className="text-white font-black text-3xl sm:text-5xl md:text-6xl leading-none tracking-tight drop-shadow-lg">
                  {b.title}
                </p>
                <p className="text-[#ffd700] font-bold text-base sm:text-xl mt-1 drop-shadow-lg">
                  {b.sub}
                </p>
              </div>

              {/* Dot indicators — inside each slide so they show above overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {BANNERS.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.preventDefault(); setActive(i); }}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? 'bg-white w-4' : 'bg-white/50 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

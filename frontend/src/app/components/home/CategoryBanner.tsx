'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Activities card — 2 images scroll
const ACTIVITY_IMGS = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
];

// Holiday Packages card — 3 images scroll
const PACKAGE_IMGS = [
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&q=80',
];

function SlideCard({
  label,
  href,
  images,
  textColor = 'text-white',
  delay = 0,
}: {
  label: string;
  href: string;
  images: string[];
  textColor?: string;
  delay?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Offset start time by delay so the two cards don't sync
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        setActive(prev => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [images.length, delay]);

  return (
    <Link
      href={href}
      className="relative rounded-2xl overflow-hidden h-36 sm:h-44 block"
    >
      {/* Sliding track */}
      <div
        className="flex h-full"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${(active * 100) / images.length}%)`,
          transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 h-full"
            style={{ width: `${100 / images.length}%` }}
          >
            <Image src={src} alt={`${label} ${i + 1}`} fill className="object-cover" unoptimized />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Label */}
      <div className="absolute bottom-3 left-4">
        <p className={`font-extrabold text-lg sm:text-2xl leading-tight ${textColor} drop-shadow-lg`}>
          {label}
        </p>
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 flex gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={`block h-1 rounded-full transition-all duration-300 ${
                i === active ? 'bg-white w-3' : 'bg-white/40 w-1'
              }`}
            />
          ))}
        </div>
      )}
    </Link>
  );
}

export default function CategoryBanner() {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 sm:px-6 mt-3 max-w-screen-xl mx-auto">
      <SlideCard
        label="Activities"
        href="/listings"
        images={ACTIVITY_IMGS}
        textColor="text-white"
        delay={0}
      />
      <SlideCard
        label="Holiday Packages"
        href="/listings?category=Packages"
        images={PACKAGE_IMGS}
        textColor="text-white"
        delay={1500}
      />
    </div>
  );
}

'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type HeroSlide = {
  img: string;
  eyebrow: string;
  title: string;
  sub: string;
  price: string;
  cta: string;
  href: string;
  accent: string;
};

export default function HeroBanner({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  if (!slides.length) return null;

  const next = useCallback(() => setActive(p => (p + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setActive(p => (p - 1 + slides.length) % slides.length), [slides.length]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height: 'clamp(260px, 58vw, 560px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (delta > 50) next();
        else if (delta < -50) prev();
      }}
    >
      {/* Sliding track */}
      <div
        className="flex h-full"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(active * 100) / slides.length}%)`,
          transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 h-full"
            style={{ width: `${100 / slides.length}%` }}
          >
            <Image
              src={s.img}
              alt={s.title}
              fill
              className="object-cover"
              priority={i === 0}
              unoptimized
            />

            {/* Deep gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.10) 100%)',
              }}
            />

            {/* Colour accent glow */}
            <div
              className="absolute bottom-0 left-0 w-64 h-32 opacity-20 blur-3xl"
              style={{ background: s.accent }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end px-5 sm:px-10 pb-10 sm:pb-12">
              {/* Eyebrow pill */}
              <span
                className="inline-flex items-center gap-1.5 self-start px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3"
                style={{ background: s.accent, color: '#000' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-black/40 inline-block" />
                {s.eyebrow}
              </span>

              {/* Main title */}
              <h2
                className="text-white font-black leading-none tracking-tight drop-shadow-xl"
                style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)' }}
              >
                {s.title}
              </h2>

              {/* Subtitle */}
              <p className="text-white/80 text-sm sm:text-lg mt-1 sm:mt-2 font-medium drop-shadow">
                {s.sub}
              </p>

              {/* Price + CTA row */}
              <div className="flex items-center gap-3 sm:gap-5 mt-3 sm:mt-5">
                <span
                  className="text-base sm:text-2xl font-extrabold"
                  style={{ color: s.accent }}
                >
                  {s.price}
                </span>
                <Link
                  href={s.href}
                  className="px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
                  style={{ background: s.accent }}
                >
                  {s.cta} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows (desktop) */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center transition-colors z-10 text-xl"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center transition-colors z-10 text-xl"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? '2rem' : '0.375rem',
              background: i === active ? slides[active].accent : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>

      {/* Slide counter top-right */}
      <div className="absolute top-3 right-4 text-white/60 text-xs font-semibold tracking-widest z-10 select-none">
        {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
}

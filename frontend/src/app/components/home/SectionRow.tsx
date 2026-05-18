'use client';
import Link from 'next/link';
import { useRef } from 'react';

interface Props {
  title: string;
  viewAllHref?: string;
  children: React.ReactNode;
}

export default function SectionRow({ title, viewAllHref, children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 240 : -240, behavior: 'smooth' });
  };

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="px-4 sm:px-6 max-w-screen-xl mx-auto mb-4 flex items-center justify-between">
        <p className="section-title flex-1 text-sm">{title}</p>
        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
          {/* Scroll arrows — desktop only */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="hidden sm:flex w-7 h-7 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#ff6b6b] text-[#9a9a9a] hover:text-white items-center justify-center transition-colors text-base leading-none"
          >
            ‹
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="hidden sm:flex w-7 h-7 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#ff6b6b] text-[#9a9a9a] hover:text-white items-center justify-center transition-colors text-base leading-none"
          >
            ›
          </button>
          {viewAllHref && (
            <Link href={viewAllHref} className="text-xs text-[#ff4b2b] hover:underline">
              View All
            </Link>
          )}
        </div>
      </div>

      {/* Scrollable card row */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-4 sm:px-6 pb-2"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {children}
        {/* Trailing spacer keeps last card away from screen edge */}
        <div className="flex-shrink-0 w-2" aria-hidden />
      </div>
    </section>
  );
}

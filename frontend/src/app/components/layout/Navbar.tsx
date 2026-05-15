'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LocationSelector from './LocationSelector';

export default function Navbar() {
  const [locOpen, setLocOpen] = useState(false);
  const [city, setCity] = useState('Goa');
  const [searchVal, setSearchVal] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) router.push(`/listings?search=${encodeURIComponent(searchVal.trim())}`);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        {/* Main bar */}
        <div className="px-4 sm:px-6 h-14 sm:h-16 flex items-center gap-3 max-w-screen-xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex flex-col leading-none mr-1">
            <span className="text-[#ff4b2b] font-black text-2xl leading-none">
              <em className="not-italic font-black">n</em>
              <span className="text-white">ecterlabs</span>
            </span>
            <span className="text-[#9a9a9a] text-[9px] font-medium tracking-wide hidden sm:block">India's Go Out App</span>
          </Link>

          {/* City selector */}
          <button
            onClick={() => setLocOpen(true)}
            className="flex-shrink-0 flex flex-col items-start leading-none px-2"
          >
            <span className="text-[#ff4b2b] italic text-[10px] font-medium">Explore in</span>
            <span className="flex items-center gap-1 text-white font-bold text-sm">
              {city}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="mt-0.5">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </span>
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-full px-4 py-2.5 border border-[#2a2a2a] focus-within:border-[#ff4b2b] transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#ff4b2b" strokeWidth={2.5} className="flex-shrink-0">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <div className="flex items-center gap-1 flex-1 overflow-hidden">
                <span className="text-[#9a9a9a] text-sm whitespace-nowrap">Search for</span>
                <div className="relative overflow-hidden h-5 flex-1">
                  <span className="search-word text-sm">activities</span>
                  <span className="search-word text-sm opacity-0">experiences</span>
                  <span className="search-word text-sm opacity-0">adventures</span>
                </div>
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                className="sr-only"
                aria-label="Search"
              />
            </div>
          </form>

          {/* User icon */}
          <Link href="/admin" className="flex-shrink-0 w-9 h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#9a9a9a] hover:text-white hover:border-[#ff4b2b] transition-colors">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>
        </div>
      </nav>

      <LocationSelector
        isOpen={locOpen}
        onClose={() => setLocOpen(false)}
        onSelect={setCity}
        selected={city}
      />
    </>
  );
}

'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [searchVal, setSearchVal] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) router.push(`/listings?search=${encodeURIComponent(searchVal.trim())}`);
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-[#1a1a1a]">
      <div className="px-3 sm:px-6 h-12 sm:h-14 flex items-center gap-2 sm:gap-3 max-w-screen-xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex flex-col leading-none mr-1">
          <span className="text-[#ff4b2b] font-black text-xl leading-none">
            <em className="not-italic font-black">n</em>
            <span className="text-white">ecterlabs</span>
          </span>
          <span className="text-[#9a9a9a] text-[8px] font-medium tracking-wide hidden sm:block">
            India&apos;s Go Out App
          </span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-full px-3 sm:px-4 py-2 border border-[#2a2a2a] focus-within:border-[#ff4b2b] transition-colors">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ff4b2b" strokeWidth={2.5} className="flex-shrink-0">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
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

        {/* User icon → Admin */}
        <Link
          href="/admin"
          className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#9a9a9a] hover:text-white hover:border-[#ff4b2b] transition-colors"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </Link>
      </div>
    </nav>
  );
}

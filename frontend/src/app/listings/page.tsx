'use client';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api, type Listing } from '@/lib/api';
import ListingCard from '../components/listings/ListingCard';
import Spinner from '../components/ui/Spinner';

const CATEGORIES = ['All', 'Adventures', 'Yachts', 'Bike Tours', 'Scuba Diving', 'Resorts'];

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Spinner size="lg" /></div>}>
      <ListingsContent />
    </Suspense>
  );
}

function ListingsContent() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');

  const load = useCallback(async (searchVal: string, catVal: string) => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (searchVal) params.search = searchVal;
      if (catVal && catVal !== 'All') params.category = catVal;
      if (searchParams.get('featured') === 'true') params.featured = 'true';
      if (searchParams.get('trending') === 'true') params.trending = 'true';
      const data = await api.getListings(params);
      setListings(data);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => load(search, category), 300);
    return () => clearTimeout(t);
  }, [search, category, load]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-2">All <span className="text-[#ff6b6b]">Activities</span></h1>
      <p className="text-[#9a9a9a] text-sm mb-8">
        {listings.length} experience{listings.length !== 1 ? 's' : ''} available
      </p>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9a9a]">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search activities, locations..."
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-[#ff6b6b] transition-colors placeholder-[#555]"
          />
        </div>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="bg-[#111111] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff6b6b] transition-colors"
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === c
                ? 'bg-[#ff6b6b] text-white'
                : 'glass text-[#9a9a9a] hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : listings.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-[#9a9a9a]">No activities found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {listings.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  );
}

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/lib/api';
import DetailActions from './DetailActions';

const FALLBACK = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80';

const MOCK_REVIEWS = [
  { initial: 'R', name: 'Ritesh',  rating: 4, text: 'We went for my daughter\'s birthday and it was a huge hit! The kids loved it...', time: '3 months ago' },
  { initial: 'K', name: 'Katrina', rating: 5, text: 'Awesome fun. Never did this before, total adrenaline rush. Trainers were great...', time: '4 months ago' },
  { initial: 'M', name: 'Meera',   rating: 5, text: 'Truly thrilling experience. One Zero One Wake Park has extraordinary equipment...', time: '4 months ago' },
  { initial: 'V', name: 'Vikram',  rating: 5, text: 'Bhai, this is a must-try! This place is superb. The instructors are amazing...', time: '5 months ago' },
];

const AVATAR_COLORS = ['#ff4b2b', '#7c3aed', '#0891b2', '#059669', '#d97706'];

const QUICK_ANSWERS = [
  { icon: '👥', label: 'Group Friendly', value: 'Yes' },
  { icon: '📷', label: 'Photography',    value: 'Allowed' },
  { icon: '🌐', label: 'Language',       value: 'English, Hindi' },
  { icon: '🍽️', label: 'Food Included',  value: 'No' },
  { icon: '😊', label: 'Child Friendly', value: 'Yes, 12+' },
];

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let listing;
  try {
    listing = await api.getListing(id);
  } catch {
    notFound();
  }
  if (!listing || !listing.isActive) notFound();

  // images can be a real array (Firestore) or JSON string (legacy)
  const images: string[] = (() => {
    if (Array.isArray(listing.images)) return listing.images as string[];
    try { return JSON.parse((listing.images as string) || '[]'); } catch { return []; }
  })();
  // Cloudinary images are full https:// URLs; legacy local images started with /uploads/
  const coverSrc = listing.coverImage
    ? (listing.coverImage.startsWith('http') ? listing.coverImage : FALLBACK)
    : FALLBACK;
  const popularCount = Math.floor(listing.viewCount / 5) + 40;
  const reviewCount  = listing.viewCount > 50 ? listing.viewCount * 3 : 245;

  return (
    <div className="pb-24 bg-[#0a0a0a]">
      {/* ── Title + CTAs ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{listing.title}</h1>
          <div className="flex items-center gap-3 flex-shrink-0">
            <DetailActions listingId={listing.id} listingTitle={listing.title} />
          </div>
        </div>

        {/* Rating + popularity */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <span className="flex items-center gap-1.5 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {listing.rating.toFixed(1)}
          </span>
          <span className="text-[#9a9a9a] text-sm">{reviewCount} Verified Reviews</span>
          <span className="flex items-center gap-1.5 text-green-500 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Popular! {popularCount}+ people booked this week
          </span>
        </div>

        {/* Wishlist + Share */}
        <div className="flex items-center gap-5 mt-3">
          <button className="flex items-center gap-1.5 text-[#9a9a9a] hover:text-white text-sm transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Add to Wishlist
          </button>
          <button className="flex items-center gap-1.5 text-[#9a9a9a] hover:text-white text-sm transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* ── Image Grid (burraa.com style: 1 large left + 2 small stacked right) ── */}
      <div className="max-w-screen-xl mx-auto px-0 sm:px-6 mt-4">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: images.length > 0 ? '2fr 1fr' : '1fr',
            height: '280px',
          }}
        >
          {/* Main cover image */}
          <div className={`relative overflow-hidden ${images.length > 0 ? 'rounded-l-none sm:rounded-l-2xl' : 'rounded-none sm:rounded-2xl'}`}>
            <Image
              src={coverSrc}
              alt={listing.title}
              fill
              className="object-cover"
              unoptimized={!listing.coverImage || !coverSrc.startsWith('http')}
              priority
            />
          </div>

          {/* Side images (only if gallery exists) */}
          {images.length > 0 && (
            <div className="flex flex-col gap-1">
              {/* Top small image */}
              <div className="relative flex-1 overflow-hidden rounded-tr-none sm:rounded-tr-2xl">
                <Image
                  src={images[0]}
                  alt="gallery 1"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {/* Bottom small image with photo count overlay */}
              <div className="relative flex-1 overflow-hidden rounded-br-none sm:rounded-br-2xl">
                <Image
                  src={images[1] || coverSrc}
                  alt="gallery 2"
                  fill
                  className="object-cover brightness-75"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="flex items-center gap-1.5 text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    {images.length + 1} Photos
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Reviews ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-8">
        <h2 className="flex items-center gap-2 font-bold text-base mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a9a9a" strokeWidth={1.5}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Reviews
        </h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {MOCK_REVIEWS.map((r, i) => (
            <div key={r.name} className="flex-shrink-0 w-52 bg-[#111111] rounded-2xl p-4 border border-[#2a2a2a]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  >
                    {r.initial}
                  </div>
                  <span className="text-sm font-semibold">{r.name}</span>
                </div>
                <span className="text-xs bg-green-700/80 text-white px-1.5 py-0.5 rounded font-bold">
                  {r.rating} ★
                </span>
              </div>
              <p className="text-[#9a9a9a] text-xs leading-relaxed line-clamp-3">{r.text}</p>
              <p className="text-[#555] text-xs mt-2">⏱ {r.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Select Package ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-8">
        <h2 className="font-bold text-base mb-4">Select Package</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {[
            { name: listing.duration || '2 Hour Experience', price: listing.price, original: listing.originalPrice, pct: listing.discountPct },
            ...(listing.originalPrice ? [{ name: 'Extended Package', price: Math.round(listing.price * 1.6), original: Math.round((listing.originalPrice || listing.price) * 1.6), pct: listing.discountPct }] : []),
          ].map((pkg, i) => (
            <div key={i} className="flex-shrink-0 w-44 bg-[#111111] border border-[#2a2a2a] rounded-2xl p-4">
              <p className="text-sm font-semibold text-white mb-2">{pkg.name}</p>
              <p className="text-[#ff4b2b] font-extrabold text-xl">₹{pkg.price.toLocaleString('en-IN')}</p>
              {pkg.original && (
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[#9a9a9a] line-through text-xs">₹{pkg.original.toLocaleString('en-IN')}</span>
                  <span className="text-green-500 text-xs font-semibold">▼ {pkg.pct}% OFF</span>
                </div>
              )}
              <button className="mt-3 w-full bg-[#ff4b2b] hover:bg-[#e03e24] text-white text-sm font-bold py-2 rounded-xl transition-colors">
                Select
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Overview Tabs + Description ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex gap-5 overflow-x-auto scrollbar-hide border-b border-[#2a2a2a] pb-0 mb-5">
          {['Overview', "What's The Plan?"].map((tab, i) => (
            <button
              key={tab}
              className={`text-sm font-semibold pb-3 flex-shrink-0 transition-colors ${
                i === 0
                  ? 'text-[#ff4b2b] border-b-2 border-[#ff4b2b]'
                  : 'text-[#9a9a9a] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <p className="text-[#9a9a9a] text-sm leading-relaxed">{listing.description}</p>
        {listing.groupSize && (
          <p className="mt-4 text-sm">
            <span className="font-semibold text-white">Capacity:</span>
            <span className="text-[#9a9a9a] ml-2">{listing.groupSize}</span>
          </p>
        )}
      </div>

      {/* ── Location ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-8">
        <h2 className="font-bold text-base mb-4">Location</h2>
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#ff4b2b] text-sm font-semibold mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Get Directions
            </div>
            <p className="text-[#9a9a9a] text-xs">{listing.location}, Goa, India</p>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(listing.location + ' Goa India')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#2a2a2a]"
          >
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(listing.location + ' Goa')}&zoom=13&size=100x100&maptype=roadmap&key=`}
              alt="map"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff4b2b">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* ── Quick Answers ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-8">
        <h2 className="font-bold text-base mb-4">Quick Answers</h2>
        <div className="flex flex-col gap-2">
          {QUICK_ANSWERS.map(({ icon, label, value }) => (
            <div key={label} className="bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-[#9a9a9a]">
                <span className="text-[#ff4b2b]">{icon}</span>
                {label}
              </span>
              <span className="text-sm text-white font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fixed Bottom Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-[#1a1a1a] px-4 py-3 flex gap-3">
        <a
          href={`https://wa.me/917744836155?text=${encodeURIComponent('Hi! I want to know more about ' + listing.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] hover:bg-[#22c55e] text-white font-bold py-3.5 rounded-2xl text-center text-base transition-colors"
        >
          Chat
        </a>
        <Link
          href="/contact"
          className="flex-1 bg-[#ff4b2b] hover:bg-[#e03e24] text-white font-bold py-3.5 rounded-2xl text-center text-base transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

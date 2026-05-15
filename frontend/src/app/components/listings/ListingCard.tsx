import Link from 'next/link';
import Image from 'next/image';
import type { Listing } from '@/lib/api';

const FALLBACK_IMAGES: Record<string, string> = {
  Adventures:    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
  Yachts:        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80',
  'Bike Tours':  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  'Scuba Diving':'https://images.unsplash.com/photo-1682687221248-3116ba6ab483?w=600&q=80',
  default:       'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
};

interface Props {
  listing: Listing;
  /** compact = smaller width for horizontal scroll rows */
  compact?: boolean;
}

export default function ListingCard({ listing, compact = false }: Props) {
  // Cloudinary images are full https:// URLs; legacy local paths start with /uploads/
  const imgSrc = listing.coverImage && listing.coverImage.startsWith('http')
    ? listing.coverImage
    : (FALLBACK_IMAGES[listing.category] || FALLBACK_IMAGES.default);

  const flatOff = listing.originalPrice && listing.discountPct > 0
    ? Math.round(listing.originalPrice - listing.price)
    : 0;

  const cardW = compact ? 'w-44 sm:w-52 flex-shrink-0' : 'w-full';

  return (
    <Link
      href={`/listings/${listing.id}`}
      className={`${cardW} block bg-[#111111] rounded-2xl overflow-hidden group`}
    >
      {/* Image */}
      <div className="relative" style={{ height: compact ? '200px' : '220px' }}>
        <Image
          src={imgSrc}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 44vw, 220px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized={!listing.coverImage || !listing.coverImage.startsWith('http')}
        />
        {/* Dark gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Category name + location overlaid */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
          <p className="card-overlay-category">{listing.category.toUpperCase()}</p>
          <p className="card-overlay-location">{listing.location}</p>
        </div>

        {/* Flat off badge — bottom left */}
        {flatOff > 0 && (
          <div className="absolute bottom-3 left-3 z-10 translate-y-[-48px]">
            <span className="flat-off-badge">₹{flatOff.toLocaleString('en-IN')} FLAT OFF</span>
          </div>
        )}

        {/* Star badge — bottom right */}
        <div className="absolute bottom-3 right-3">
          <span className="star-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {listing.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Info below image */}
      <div className="p-3">
        <h3 className="font-bold text-sm text-white line-clamp-2 leading-snug mb-1.5">{listing.title}</h3>
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-white font-extrabold text-base">
            ₹ {listing.price.toLocaleString('en-IN')}
          </span>
          <span className="text-[#9a9a9a] text-xs">onwards</span>
        </div>
        {listing.originalPrice && listing.discountPct > 0 && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[#9a9a9a] line-through text-xs">
              ₹{listing.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-green-500 text-xs font-semibold flex items-center gap-0.5">
              ▼ {listing.discountPct}% OFF
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

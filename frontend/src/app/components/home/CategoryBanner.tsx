import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    label: 'Activities',
    href:  '/listings',
    img:   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    style: 'text-black',
  },
  {
    label: 'Holiday Packages',
    href:  '/listings?category=Packages',
    img:   'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
    style: 'text-white',
  },
];

export default function CategoryBanner() {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 sm:px-6 mt-3 max-w-screen-xl mx-auto">
      {CATEGORIES.map(({ label, href, img, style }) => (
        <Link
          key={label}
          href={href}
          className="relative rounded-2xl overflow-hidden h-36 sm:h-44 block group"
        >
          <Image
            src={img}
            alt={label}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute bottom-3 left-4">
            <p className={`font-extrabold text-lg sm:text-2xl leading-tight ${style} drop-shadow-lg`}>
              {label}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

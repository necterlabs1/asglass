import { api, type Listing } from '@/lib/api';
import ListingCard from './components/listings/ListingCard';
import CategoryBanner from './components/home/CategoryBanner';
import PromoBanner from './components/home/PromoBanner';
import SectionRow from './components/home/SectionRow';
import WhyBurraa from './components/home/WhyBurraa';

async function getData() {
  try {
    const [yachts, adventures, trending, featured] = await Promise.all([
      api.getListings({ category: 'Yachts' }),
      api.getListings({ category: 'Adventures' }),
      api.getListings({ trending: 'true' }),
      api.getListings({ featured: 'true' }),
    ]);
    return { yachts, adventures, trending, featured };
  } catch {
    return { yachts: [], adventures: [], trending: [], featured: [] };
  }
}

export default async function HomePage() {
  const { yachts, adventures, trending, featured } = await getData();

  return (
    <div className="pb-6">
      {/* 2-col Category Cards */}
      <CategoryBanner />

      {/* Promo Banner with auto-rotate */}
      <PromoBanner />

      {/* Yachts Section */}
      {yachts.length > 0 && (
        <SectionRow title="NECTERLABS RECOMMENDED YACHTS" viewAllHref="/listings?category=Yachts">
          {yachts.map((l: Listing) => <ListingCard key={l.id} listing={l} compact />)}
        </SectionRow>
      )}

      {/* Adventures Section */}
      {adventures.length > 0 && (
        <SectionRow title="MUST DO ADVENTURES IN GOA" viewAllHref="/listings?category=Adventures">
          {adventures.map((l: Listing) => <ListingCard key={l.id} listing={l} compact />)}
        </SectionRow>
      )}

      {/* Trending Section */}
      {trending.length > 0 && (
        <SectionRow title="TRENDING THIS WEEK" viewAllHref="/listings?trending=true">
          {trending.map((l: Listing) => <ListingCard key={l.id} listing={l} compact />)}
        </SectionRow>
      )}

      {/* Featured Section */}
      {featured.length > 0 && (
        <SectionRow title="PREMIUM WATER SPORTS IN GOA" viewAllHref="/listings?featured=true">
          {featured.map((l: Listing) => <ListingCard key={l.id} listing={l} compact />)}
        </SectionRow>
      )}

      {/* Why Burraa */}
      <WhyBurraa />
    </div>
  );
}

import { getDb } from '@/lib/firebase-admin';
import ListingCard from './components/listings/ListingCard';
import CategoryBanner from './components/home/CategoryBanner';
import PromoBanner from './components/home/PromoBanner';
import SectionRow from './components/home/SectionRow';
import WhyBurraa from './components/home/WhyBurraa';

async function getData() {
  try {
    const db   = getDb();
    const snap = await db.collection('listings').where('isActive', '==', true).get();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const all: any[] = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    return {
      yachts:     all.filter(l => l.category === 'Yachts'),
      adventures: all.filter(l => l.category === 'Adventures'),
      trending:   all.filter(l => l.isTrending),
      featured:   all.filter(l => l.isFeatured),
    };
  } catch (e) {
    console.error('Firestore fetch error:', e);
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
          {yachts.map(// eslint-disable-next-line @typescript-eslint/no-explicit-any
(l: any) => <ListingCard key={l.id} listing={l} compact />)}
        </SectionRow>
      )}

      {/* Adventures Section */}
      {adventures.length > 0 && (
        <SectionRow title="MUST DO ADVENTURES IN GOA" viewAllHref="/listings?category=Adventures">
          {adventures.map(// eslint-disable-next-line @typescript-eslint/no-explicit-any
(l: any) => <ListingCard key={l.id} listing={l} compact />)}
        </SectionRow>
      )}

      {/* Trending Section */}
      {trending.length > 0 && (
        <SectionRow title="TRENDING THIS WEEK" viewAllHref="/listings?trending=true">
          {trending.map(// eslint-disable-next-line @typescript-eslint/no-explicit-any
(l: any) => <ListingCard key={l.id} listing={l} compact />)}
        </SectionRow>
      )}

      {/* Featured Section */}
      {featured.length > 0 && (
        <SectionRow title="PREMIUM WATER SPORTS IN GOA" viewAllHref="/listings?featured=true">
          {featured.map(// eslint-disable-next-line @typescript-eslint/no-explicit-any
(l: any) => <ListingCard key={l.id} listing={l} compact />)}
        </SectionRow>
      )}

      {/* Why Burraa */}
      <WhyBurraa />
    </div>
  );
}

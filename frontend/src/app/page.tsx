import { getDb } from '@/lib/firebase-admin';
import ListingCard from './components/listings/ListingCard';
import HeroBanner, { type HeroSlide } from './components/home/HeroBanner';
import SectionRow from './components/home/SectionRow';
import WhyBurraa from './components/home/WhyBurraa';

const ACCENTS = ['#f59e0b', '#22d3ee', '#a78bfa', '#34d399', '#f472b6'];

async function getData() {
  try {
    const db = getDb();
    const [snap, cfgDoc] = await Promise.all([
      db.collection('listings').where('isActive', '==', true).get(),
      db.collection('settings').doc('homeConfig').get(),
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const all: any[] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    const cfg = cfgDoc.exists ? (cfgDoc.data() ?? {}) : {};

    return {
      yachts:     all.filter(l => l.category === 'Yachts'),
      adventures: all.filter(l => l.category === 'Adventures'),
      trending:   all.filter(l => l.isTrending),
      featured:   all.filter(l => l.isFeatured),
      cfg,
    };
  } catch (e) {
    console.error('Firestore fetch error:', e);
    return { yachts: [], adventures: [], trending: [], featured: [], cfg: {} };
  }
}

export default async function HomePage() {
  const { yachts, adventures, trending, featured, cfg } = await getData();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroSlides: HeroSlide[] = featured.map((l: any, i: number) => ({
    img:     l.coverImage || l.images?.[0] || '',
    eyebrow: (l.category || 'FEATURED').toUpperCase(),
    title:   (l.title || '').toUpperCase(),
    sub:     l.shortDesc || (l.description || '').slice(0, 70) || '',
    price:   `Starting ₹${Number(l.price).toLocaleString('en-IN')}`,
    cta:     'Book Now',
    href:    `/listings/${l.id}`,
    accent:  ACCENTS[i % ACCENTS.length],
  }));

  return (
    <div className="pb-6">
      {/* Full-width premium hero slider — shows real featured listings */}
      <HeroBanner slides={heroSlides} />

      {/* Yachts Section */}
      {cfg.showYachts !== false && yachts.length > 0 && (
        <SectionRow title="NECTERLABS RECOMMENDED YACHTS" viewAllHref="/listings?category=Yachts">
          {yachts.map(// eslint-disable-next-line @typescript-eslint/no-explicit-any
(l: any) => <ListingCard key={l.id} listing={l} compact />)}
        </SectionRow>
      )}

      {/* Adventures Section */}
      {cfg.showAdventures !== false && adventures.length > 0 && (
        <SectionRow title="MUST DO ADVENTURES IN GOA" viewAllHref="/listings?category=Adventures">
          {adventures.map(// eslint-disable-next-line @typescript-eslint/no-explicit-any
(l: any) => <ListingCard key={l.id} listing={l} compact />)}
        </SectionRow>
      )}

      {/* Trending Section */}
      {cfg.showTrending !== false && trending.length > 0 && (
        <SectionRow title="TRENDING THIS WEEK" viewAllHref="/listings?trending=true">
          {trending.map(// eslint-disable-next-line @typescript-eslint/no-explicit-any
(l: any) => <ListingCard key={l.id} listing={l} compact />)}
        </SectionRow>
      )}

      {/* Featured Section */}
      {cfg.showFeatured !== false && featured.length > 0 && (
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

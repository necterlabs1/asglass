import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const listings = [
  {
    title: 'Bungee Jumping at Sal',
    slug: 'bungee-jumping-sal',
    description:
      'Experience the ultimate adrenaline rush with a 55m bungee jump over the lush Sal river valley in Goa. Professional instructors, top safety equipment, and an unforgettable free-fall experience await you.',
    shortDesc: 'Ultimate 55m bungee jump over Sal river valley with professional crew.',
    location: 'Sal, Goa',
    category: 'Adventures',
    price: 2699,
    originalPrice: 3799,
    discountPct: 29,
    duration: '2-3 hours',
    groupSize: '1-10 pax',
    rating: 4.1,
    coverImage: null,
    images: JSON.stringify([]),
    isFeatured: true,
    isTrending: true,
  },
  {
    title: 'Premium Scuba Diving at Calangute',
    slug: 'scuba-diving-calangute',
    description:
      'Dive into the crystal-clear waters of Calangute and explore vibrant coral reefs and marine life. Guided by certified PADI instructors, this experience is perfect for both beginners and experienced divers.',
    shortDesc: 'PADI-guided scuba diving in crystal-clear Calangute waters.',
    location: 'Calangute, Goa',
    category: 'Adventures',
    price: 3199,
    originalPrice: 3999,
    discountPct: 20,
    duration: '3-4 hours',
    groupSize: '2-8 pax',
    rating: 4.0,
    coverImage: null,
    images: JSON.stringify([]),
    isFeatured: true,
    isTrending: true,
  },
  {
    title: 'Majestic II Yacht Experience',
    slug: 'majestic-ii-yacht-goa',
    description:
      'Cruise the iconic Mandovi River aboard the Gulf Craft 36ft Majestic II motor yacht. Spacious and luxurious, accommodating up to 12 guests — perfect for group parties, celebrations, and pre-wedding shoots.',
    shortDesc: 'Luxury 36ft motor yacht on the Mandovi River for up to 12 guests.',
    location: 'Mandovi River, Goa',
    category: 'Yachts',
    price: 14499,
    originalPrice: 15999,
    discountPct: 9,
    duration: '2 hours',
    groupSize: 'Max 12 pax',
    rating: 4.7,
    coverImage: null,
    images: JSON.stringify([]),
    isFeatured: true,
    isTrending: false,
  },
  {
    title: 'Goa Bike Tour — North Goa Circuit',
    slug: 'goa-bike-tour-north',
    description:
      'Explore the scenic bylanes of North Goa on a guided motorcycle tour. Visit hidden beaches, spice plantations, and colonial Portuguese architecture. All bikes are well-maintained Royal Enfields.',
    shortDesc: 'Guided Royal Enfield motorcycle tour through North Goa hidden gems.',
    location: 'North Goa',
    category: 'Bike Tours',
    price: 2999,
    originalPrice: 3499,
    discountPct: 14,
    duration: '6 hours',
    groupSize: '2-12 pax',
    rating: 4.5,
    coverImage: null,
    images: JSON.stringify([]),
    isFeatured: false,
    isTrending: true,
  },
  {
    title: 'Kayaking at a Private Island',
    slug: 'kayaking-private-island',
    description:
      'Paddle through the serene backwaters to a hidden private island near Chorao. Experience lush mangrove forests, spot exotic birds, and enjoy a peaceful escape from the tourist crowds.',
    shortDesc: 'Guided kayaking through mangroves to a private island near Chorao.',
    location: 'Chorao Island, Goa',
    category: 'Adventures',
    price: 2099,
    originalPrice: 2499,
    discountPct: 16,
    duration: '3 hours',
    groupSize: '2-10 pax',
    rating: 4.6,
    coverImage: null,
    images: JSON.stringify([]),
    isFeatured: false,
    isTrending: true,
  },
];

async function main() {
  console.log('Seeding database...');
  for (const listing of listings) {
    await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: {},
      create: listing,
    });
  }
  console.log(`Seeded ${listings.length} listings.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

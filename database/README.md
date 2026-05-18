# Database — Burraa MVP

Using **SQLite** (via Prisma) for localhost MVP.
File location: `backend/prisma/dev.db`

## Upgrade to PostgreSQL later
1. Change `provider = "sqlite"` → `provider = "postgresql"` in `schema.prisma`
2. Change `DATABASE_URL` in `backend/.env` to your PostgreSQL connection string
3. Remove `@db.Text` / `@db.VarChar` annotations (not needed for SQLite, needed for PG)
4. Run `npx prisma migrate dev --name postgres-migration`

## ERD

Listing
  id, title, slug, description, shortDesc, location, category,
  price, originalPrice, discountPct, duration, groupSize,
  rating, coverImage, images (JSON), isFeatured, isTrending,
  isActive, viewCount, createdAt, updatedAt

Inquiry
  id, name, email, phone, message, listingId (FK → Listing),
  isRead, createdAt

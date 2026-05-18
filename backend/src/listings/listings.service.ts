import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

function buildSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    search?: string;
    category?: string;
    featured?: string;
    trending?: string;
  }) {
    return this.prisma.listing.findMany({
      where: {
        isActive: true,
        ...(query.category && { category: query.category }),
        ...(query.featured === 'true' && { isFeatured: true }),
        ...(query.trending === 'true' && { isTrending: true }),
        ...(query.search && {
          OR: [
            { title: { contains: query.search } },
            { location: { contains: query.search } },
            { category: { contains: query.search } },
            { description: { contains: query.search } },
          ],
        }),
      },
      orderBy: [{ isFeatured: 'desc' }, { isTrending: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: number) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new NotFoundException(`Listing #${id} not found`);
    // Increment view count (fire and forget)
    this.prisma.listing.update({ where: { id }, data: { viewCount: { increment: 1 } } }).catch(() => {});
    return listing;
  }

  async create(dto: CreateListingDto) {
    const slug = dto.slug || buildSlug(dto.title) + '-' + Date.now();
    return this.prisma.listing.create({
      data: {
        ...dto,
        slug,
        images: dto.images || '[]',
        isFeatured: dto.isFeatured ?? false,
        isTrending: dto.isTrending ?? false,
      },
    });
  }

  async update(id: number, dto: UpdateListingDto) {
    await this.findOne(id);
    return this.prisma.listing.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.listing.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async findAllAdmin() {
    return this.prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { inquiries: true } } },
    });
  }
}

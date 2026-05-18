import {
  Controller, Get, Post, Put, Delete,
  Param, Query, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { AdminGuard } from '../common/admin.guard';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('featured') featured?: string,
    @Query('trending') trending?: string,
  ) {
    return this.listingsService.findAll({ search, category, featured, trending });
  }

  @Get('admin/all')
  @UseGuards(AdminGuard)
  findAllAdmin() {
    return this.listingsService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.listingsService.findOne(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() dto: CreateListingDto) {
    return this.listingsService.create(dto);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateListingDto) {
    return this.listingsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.listingsService.remove(id);
  }
}

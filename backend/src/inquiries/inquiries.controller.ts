import { Controller, Post, Get, Patch, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { AdminGuard } from '../common/admin.guard';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  create(@Body() dto: CreateInquiryDto) {
    return this.inquiriesService.create(dto);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.inquiriesService.findAll();
  }

  @Patch(':id/read')
  @UseGuards(AdminGuard)
  markRead(@Param('id', ParseIntPipe) id: number) {
    return this.inquiriesService.markRead(id);
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateListingDto } from './create-listing.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateListingDto extends PartialType(CreateListingDto) {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;
}

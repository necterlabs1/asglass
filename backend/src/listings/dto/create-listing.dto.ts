import { IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateListingDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  shortDesc?: string;

  @IsString()
  location: string;

  @IsString()
  category: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  originalPrice?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discountPct?: number;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  groupSize?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  rating?: number;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsString()
  @IsOptional()
  images?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isFeatured?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isTrending?: boolean;
}

import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInquiryDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  message: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  listingId?: number;
}

import { IsString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  shippingName: string;

  @IsString()
  shippingLine1: string;

  @IsOptional()
  @IsString()
  shippingLine2?: string;

  @IsString()
  shippingCity: string;

  @IsString()
  shippingZip: string;

  @IsString()
  shippingCountry: string;
}
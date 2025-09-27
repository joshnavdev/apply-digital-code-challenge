import { ProductQuery } from '../../../domain/dtos/productQuery';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductQueryDto implements ProductQuery {
  @ApiPropertyOptional({ description: 'SKU exact match', example: 'DESK-12345' })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional({ description: 'Name contains (case-insensitive)', example: 'Standing Desk' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Brand filter', example: 'IKEA' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ description: 'Model filter', example: 'BEKANT' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ description: 'Category filter', example: 'desks' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Color filter', example: 'black' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ description: 'Currency code (ISO 4217)', example: 'USD' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ description: 'Minimum price (inclusive)', example: 100, minimum: 0, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Maximum price (inclusive)', example: 500, minimum: 0, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Page size', example: 5, minimum: 1, default: 5, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize: number = 5;

  @ApiPropertyOptional({ description: 'Page number (1-based)', example: 1, minimum: 1, default: 1, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ description: 'Minimum stock (inclusive)', example: 0, minimum: 0, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  minStock: number;
}

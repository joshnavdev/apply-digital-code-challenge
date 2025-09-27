import { IsBoolean, IsISO8601, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ReportQuery } from '../../../domain/dtos/reportQuery';

export class ReportQueryDto implements ReportQuery {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (value === '1' || value === 1) return true;
    if (value === '0' || value === 0) return false;
    if (typeof value === 'string') return value.toLowerCase() === 'true';

    return value as boolean;
  })
  withPrice?: boolean;

  @IsOptional()
  @IsISO8601()
  from?: string;

  @IsOptional()
  @IsISO8601()
  to?: string;
}

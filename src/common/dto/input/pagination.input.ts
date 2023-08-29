import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationInput {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit?: number;

  @Type(() => Number)
  @IsOptional()
  @Min(0)
  offset?: number;
}

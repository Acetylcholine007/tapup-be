import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationInput {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  offset?: number;
}

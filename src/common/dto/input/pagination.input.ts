import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationInput {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  offset?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBusinessCardP31NInput {
  @ApiProperty()
  @IsOptional()
  @IsString()
  dayTextColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  timeTextColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardBackgroundColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  overallBackgroundColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  coverBackgroundColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  borderColor?: string;
}

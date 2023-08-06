import { AmenityPersonalizationEntity } from '@entities/amenity-p13n.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAmenityP13NInput
  implements Partial<Omit<AmenityPersonalizationEntity, 'id' | 'amenity'>>
{
  @ApiProperty()
  @IsOptional()
  @IsString()
  primaryBackgroundColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondaryBackgroundColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  primaryTextColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondaryTextColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  borderColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  borderRadius?: string;
}

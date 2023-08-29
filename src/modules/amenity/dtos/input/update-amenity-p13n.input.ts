import { AmenityPersonalizationEntity } from '@entities/amenity-p13n.entity';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAmenityP13NInput
  implements Partial<Omit<AmenityPersonalizationEntity, 'id' | 'amenity'>>
{
  @IsOptional()
  @IsString()
  primaryBackgroundColor?: string;

  @IsOptional()
  @IsString()
  secondaryBackgroundColor?: string;

  @IsOptional()
  @IsString()
  primaryTextColor?: string;

  @IsOptional()
  @IsString()
  secondaryTextColor?: string;

  @IsOptional()
  @IsString()
  borderColor?: string;

  @IsOptional()
  @IsString()
  borderRadius?: string;
}

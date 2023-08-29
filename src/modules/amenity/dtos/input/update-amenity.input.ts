import { AmenityEntity } from '@entities/amenity.entity';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAmenityP13NInput } from './create-amenity-p13n.input';

export class UpdateAmenityInput
  implements Partial<Omit<AmenityEntity, 'id' | 'personalization'>>
{
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  cardPhoto?: string;

  @IsOptional()
  @Type(() => CreateAmenityP13NInput)
  @ValidateNested()
  personalization?: CreateAmenityP13NInput;
}

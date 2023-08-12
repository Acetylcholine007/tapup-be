import { AmenityEntity } from '@entities/amenity.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAmenityP13NInput } from './create-amenity-p13n.input';

export class UpdateAmenityInput
  implements Partial<Omit<AmenityEntity, 'id' | 'personalization'>>
{
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardPhoto?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => CreateAmenityP13NInput)
  @ValidateNested()
  personalization?: CreateAmenityP13NInput;
}

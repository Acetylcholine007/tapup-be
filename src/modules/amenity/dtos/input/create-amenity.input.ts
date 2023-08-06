import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UpdateAmenityInput } from './update-amenity.input';

export class CreateAmenityInput extends UpdateAmenityInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  businessCardId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateDependentAmenityInput } from './create-dependent-amenity.input';

export class CreateAmenityInput extends CreateDependentAmenityInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  businessCardId: string;
}

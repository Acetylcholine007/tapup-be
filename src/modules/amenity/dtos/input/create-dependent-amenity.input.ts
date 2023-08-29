import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateAmenityInput } from './update-amenity.input';

export class CreateDependentAmenityInput extends UpdateAmenityInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

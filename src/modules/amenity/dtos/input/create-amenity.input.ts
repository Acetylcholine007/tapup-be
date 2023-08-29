import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateDependentAmenityInput } from './create-dependent-amenity.input';

export class CreateAmenityInput extends CreateDependentAmenityInput {
  @IsNotEmpty()
  @IsUUID()
  businessCardId: string;
}

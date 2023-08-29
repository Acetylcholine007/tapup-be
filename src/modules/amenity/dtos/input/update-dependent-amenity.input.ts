import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UpdateAmenityInput } from './update-amenity.input';

export class UpdateDependentAmenityInput extends UpdateAmenityInput {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

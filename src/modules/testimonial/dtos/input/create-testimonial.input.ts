import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { UpdateTestimonialInput } from './update-testimonial.input';

export class CreateTestimonialInput extends UpdateTestimonialInput {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  businessCardId: string;
}

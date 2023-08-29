import { TestimonialEntity } from '@entities/testimonial.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTestimonialInput
  implements Partial<Omit<TestimonialEntity, 'id' | 'user' | 'businessCard'>>
{
  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

import { TestimonialEntity } from '@entities/testimonial.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTestimonialInput
  implements Partial<Omit<TestimonialEntity, 'id' | 'user' | 'businessCard'>>
{
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}

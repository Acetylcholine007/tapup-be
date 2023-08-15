import { TestimonialEntity } from '@entities/testimonial.entity';
import { BusinessCardModule } from '@modules/business-card/business-card.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialController } from './controllers/testimonial.controller';
import { TestimonialService } from './services/testimonial.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestimonialEntity]), BusinessCardModule],
  controllers: [TestimonialController],
  providers: [TestimonialService],
})
export class TestimonialModule {}

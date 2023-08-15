import { PaginationInput } from '@common/dto/input/pagination.input';
import { TestimonialEntity } from '@entities/testimonial.entity';
import { UserEntity } from '@entities/user.entity';
import { BusinessCardService } from '@modules/business-card/services/business-card.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestimonialInput } from '../dtos/input/create-testimonial.input';
import { UpdateTestimonialInput } from '../dtos/input/update-testimonial.input';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectRepository(TestimonialEntity)
    private readonly testimonialRepository: Repository<TestimonialEntity>,
    private readonly businessCardService: BusinessCardService
  ) {}

  async getTestimonials(paginationQuery: PaginationInput) {
    const { offset, limit } = paginationQuery;
    return this.testimonialRepository.find({
      skip: offset,
      take: limit,
      relations: { businessCard: true, user: true },
    });
  }

  async getBusinessCardTestimonials(businessCardId: string) {
    return this.testimonialRepository.find({
      where: { businessCard: { id: businessCardId } },
      relations: { businessCard: true, user: true },
    });
  }

  async getTestimonial(query: string, target: keyof TestimonialEntity = 'id') {
    const testimonial = await this.testimonialRepository.findOne({
      where: { [target]: query },
      relations: { businessCard: true, user: true },
    });
    if (!testimonial)
      throw new NotFoundException(
        `Testimonial with ${target} of ${query} not found`
      );
    return testimonial;
  }

  async createTestimonial(
    user: UserEntity,
    createTestimonialInput: CreateTestimonialInput
  ) {
    const { businessCardId, ...restAmenityInput } = createTestimonialInput;

    const businessCard = await this.businessCardService.getBusinessCard(
      businessCardId
    );

    const testimonial = this.testimonialRepository.create({
      ...restAmenityInput,
      businessCard,
      user,
    });

    businessCard.testimonials.push(testimonial);

    return this.testimonialRepository.save(testimonial);
  }

  async updateTestimonial(
    testimonialId: string,
    updateTestimonialInput: UpdateTestimonialInput
  ) {
    const testimonial = await this.getTestimonial(testimonialId);

    Object.assign(testimonial, updateTestimonialInput);
    return this.testimonialRepository.save(testimonial);
  }

  async deleteTestimonial(testimonialId: string) {
    const testimonial = await this.getTestimonial(testimonialId);
    return this.testimonialRepository.remove(testimonial);
  }
}

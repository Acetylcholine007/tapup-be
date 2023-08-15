import { CurrentUser } from '@common/decorators/current-user.decorator';
import { PaginationInput } from '@common/dto/input/pagination.input';
import { UserEntity } from '@entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTestimonialInput } from '../dtos/input/create-testimonial.input';
import { UpdateTestimonialInput } from '../dtos/input/update-testimonial.input';
import { TestimonialService } from '../services/testimonial.service';

@ApiTags('Testimonials')
@ApiBearerAuth()
@Controller('testimonials')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Get()
  getTestimonials(@Query() paginationQuery: PaginationInput) {
    return this.testimonialService.getTestimonials(paginationQuery);
  }

  @Get('/business-card/:businessCardId')
  getBusinessCardTestimonials(@Param('businessCardId') businessCardId: string) {
    return this.testimonialService.getBusinessCardTestimonials(businessCardId);
  }

  @Get('/:testimonialId')
  getTestimonial(@Param('testimonialId') testimonialId: string) {
    return this.testimonialService.getTestimonial(testimonialId);
  }

  @Post()
  createTestimonial(
    @CurrentUser() user: UserEntity,
    @Body() createTestimonialInput: CreateTestimonialInput
  ) {
    return this.testimonialService.createTestimonial(
      user,
      createTestimonialInput
    );
  }

  @Patch('/:testimonialId')
  updateTestimonial(
    @Param('testimonialId') testimonialId: string,
    @Body() updateTestimonialInput: UpdateTestimonialInput
  ) {
    return this.testimonialService.updateTestimonial(
      testimonialId,
      updateTestimonialInput
    );
  }

  @Delete('/:testimonialId')
  deleteTestimonial(@Param('testimonialId') testimonialId: string) {
    return this.testimonialService.deleteTestimonial(testimonialId);
  }
}

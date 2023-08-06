import { CurrentUser } from '@common/decorators/current-user.decorator';
import { PaginationInput } from '@common/dto/input/pagination.input';
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
import { CreateAmenityInput } from '../dtos/input/create-amenity.input';
import { UpdateAmenityP13NInput } from '../dtos/input/update-amenity-p13n.input';
import { UpdateAmenityInput } from '../dtos/input/update-amenity.input';
import { AmenityService } from '../services/amenity.service';

@ApiTags('Amenities')
@ApiBearerAuth()
@Controller('amenities')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Get()
  getAmenities(@Query() paginationQuery: PaginationInput) {
    return this.amenityService.getAmenities(paginationQuery);
  }

  @Get('/mine')
  getMyAmenities(@CurrentUser('id') userId: string) {
    return this.amenityService.getMyAmenities(userId);
  }

  @Get('/:amenityId')
  getAmenity(@Param('amenityId') amenityId: string) {
    return this.amenityService.getAmenity(amenityId);
  }

  @Post()
  createAmenity(@Body() createAmenityInput: CreateAmenityInput) {
    return this.amenityService.createAmenity(createAmenityInput);
  }

  @Patch('/personalization/:amenityId')
  updateAmenityP13N(
    @Param('amenityId') amenityId: string,
    @Body() updateAmenityP13NInput: UpdateAmenityP13NInput
  ) {
    return this.amenityService.updateAmenityP13n(
      amenityId,
      updateAmenityP13NInput
    );
  }

  @Patch('/:amenityId')
  updateAmenity(
    @Param('amenityId') amenityId: string,
    @Body() updateAmenityInput: UpdateAmenityInput
  ) {
    return this.amenityService.updateAmenity(amenityId, updateAmenityInput);
  }

  @Delete('/:amenityId')
  deleteAmenity(@Param('amenityId') amenityId: string) {
    return this.amenityService.deleteAmenity(amenityId);
  }
}

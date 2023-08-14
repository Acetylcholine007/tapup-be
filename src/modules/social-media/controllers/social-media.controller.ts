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
import { CreateSocialMediaInput } from '../dtos/input/create-social-media.input';
import { SetSocialMediaMappingInput } from '../dtos/input/set-social-media-mapping.input';
import { UpdateSocialMediaInput } from '../dtos/input/update-social-media.input';
import { SocialMediaService } from '../services/social-media.service';

@ApiTags('Social Media')
@ApiBearerAuth()
@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Get()
  getAllSocialMedia(@Query() paginationQuery: PaginationInput) {
    return this.socialMediaService.getAllSocialMedia(paginationQuery);
  }

  @Get('/:socialMediaId')
  getSocialMedia(@Param('socialMediaId') socialMediaId: string) {
    return this.socialMediaService.getSocialMedia(socialMediaId);
  }

  @Post()
  createSocialMedia(@Body() createSocialMediaInput: CreateSocialMediaInput) {
    return this.socialMediaService.createSocialMedia(createSocialMediaInput);
  }

  @Patch('/business-card/:businessCardId')
  updateBusinessCardSocialMedia(
    @Param('businessCardId') businessCardId: string,
    @Body() socialMediaLinks: SetSocialMediaMappingInput
  ) {
    return this.socialMediaService.setSocialMediaMapping(
      businessCardId,
      socialMediaLinks.links
    );
  }

  @Patch('/:socialMediaId')
  updateSocialMedia(
    @Param('socialMediaId') socialMediaId: string,
    @Body() updateSocialMediaInput: UpdateSocialMediaInput
  ) {
    return this.socialMediaService.updateSocialMedia(
      socialMediaId,
      updateSocialMediaInput
    );
  }

  @Delete('/:socialMediaId')
  deleteAmenity(@Param('socialMediaId') socialMediaId: string) {
    return this.socialMediaService.deleteSocialMedia(socialMediaId);
  }
}

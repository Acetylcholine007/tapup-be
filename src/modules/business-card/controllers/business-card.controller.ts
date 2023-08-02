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
import { CreateBusinessCardInput } from '../dtos/input/create-business-card.input';
import { UpdateBusinessCardP31NInput } from '../dtos/input/update-business-card-p13n.input';
import { UpdateBusinessCardInput } from '../dtos/input/update-business-card.input';
import { BusinessCardService } from '../services/business-card.service';

@ApiTags('Business Card')
@ApiBearerAuth()
@Controller('business-card')
export class BusinessCardController {
  constructor(private readonly businessCardService: BusinessCardService) {}

  @Get()
  getBusinessCards(@Query() paginationQuery: PaginationInput) {
    return this.businessCardService.getBusinessCards(paginationQuery);
  }

  @Get('/mine')
  getMyBusinessCards(@CurrentUser('id') userId: string) {
    return this.businessCardService.getMyBusinessCards(userId);
  }

  @Get('/:businessCardId')
  getBusinessCard(@Param('businessCardId') businessCardId: string) {
    return this.businessCardService.getBusinessCard(businessCardId);
  }

  @Post()
  createBusinessCard(
    @CurrentUser() user: UserEntity,
    @Body() createBusinessCardInput: CreateBusinessCardInput
  ) {
    return this.businessCardService.createBusinessCard(
      user,
      createBusinessCardInput
    );
  }

  @Patch('/personalization/:businessCardId')
  updateBusinessCardP13N(
    @Param('businessCardId') businessCardId: string,
    @Body() updateBusinessCardP13NInput: UpdateBusinessCardP31NInput
  ) {
    return this.businessCardService.updateBusinessCardP13n(
      businessCardId,
      updateBusinessCardP13NInput
    );
  }

  @Patch('/:businessCardId')
  updateBusinessCard(
    @Param('businessCardId') businessCardId: string,
    @Body() updateBusinessCardInput: UpdateBusinessCardInput
  ) {
    return this.businessCardService.updateBusinessCard(
      businessCardId,
      updateBusinessCardInput
    );
  }

  @Delete('/:businessCardId')
  deleteBusinessCard(@Param('businessCardId') businessCardId: string) {
    return this.businessCardService.deleteBusinessCard(businessCardId);
  }
}

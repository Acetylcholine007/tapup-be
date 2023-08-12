import { BusinessCardEntity } from '@entities/business-card.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { BusinessHoursInput } from './business-hours.input';
import { UpdateBusinessCardInput } from './update-business-card.input';

export class CreateBusinessCardInput
  extends UpdateBusinessCardInput
  implements
    Omit<
      BusinessCardEntity,
      'id' | 'user' | 'amenities' | 'company' | 'personalization'
    >
{
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => BusinessHoursInput)
  @ValidateNested()
  businessHours: BusinessHoursInput;
}

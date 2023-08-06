import { BusinessCardEntity } from '@entities/business-card.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { BusinessHoursInput } from './business-hours.input';
import { CreateBusinessCardP13NInput } from './create-business-card-p13n.input';

export class UpdateBusinessCardInput
  implements
    Omit<
      Partial<BusinessCardEntity>,
      'id' | 'user' | 'amenities' | 'personalization'
    >
{
  @ApiProperty()
  @IsOptional()
  @Type(() => BusinessHoursInput)
  @ValidateNested()
  businessHours?: BusinessHoursInput;

  @ApiProperty()
  @IsOptional()
  @IsString()
  backgroundUrl?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  telNo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  viber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  whatsUp?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  skype?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => CreateBusinessCardP13NInput)
  @ValidateNested()
  personalization?: CreateBusinessCardP13NInput;
}

import { BusinessCardEntity } from '@entities/business-card.entity';
import { CreateCompanyInput } from '@modules/company/dtos/inputs/create-company.input';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { BusinessHoursInput } from './business-hours.input';
import { CreateBusinessCardP13NInput } from './create-business-card-p13n.input';

export class UpdateBusinessCardInput
  implements
    Omit<
      Partial<BusinessCardEntity>,
      'id' | 'user' | 'amenities' | 'company' | 'personalization'
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
  @IsUUID()
  companyId?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => CreateCompanyInput)
  @ValidateNested()
  company?: CreateCompanyInput;

  @ApiProperty()
  @IsOptional()
  @Type(() => CreateBusinessCardP13NInput)
  @ValidateNested()
  personalization?: CreateBusinessCardP13NInput;
}

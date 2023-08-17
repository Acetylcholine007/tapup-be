import { BusinessCardEntity } from '@entities/business-card.entity';
import { UpdateDependentAmenityInput } from '@modules/amenity/dtos/input/update-dependent-amenity.input';
import { CreateCompanyInput } from '@modules/company/dtos/inputs/create-company.input';
import { SocialMediaLinkInput } from '@modules/social-media/dtos/input/social-media-link.input';
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

  @ApiProperty({ type: [UpdateDependentAmenityInput] })
  @IsOptional()
  @Type(() => UpdateDependentAmenityInput)
  @ValidateNested()
  amenities?: UpdateDependentAmenityInput[];

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  companyId?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => CreateCompanyInput)
  @ValidateNested()
  company?: CreateCompanyInput;

  @ApiProperty({ type: [SocialMediaLinkInput] })
  @IsOptional()
  @Type(() => SocialMediaLinkInput)
  @ValidateNested()
  socialMedia?: SocialMediaLinkInput[];

  @ApiProperty()
  @IsOptional()
  @Type(() => CreateBusinessCardP13NInput)
  @ValidateNested()
  personalization?: CreateBusinessCardP13NInput;
}

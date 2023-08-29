import { BusinessCardEntity } from '@entities/business-card.entity';
import { UpdateDependentAmenityInput } from '@modules/amenity/dtos/input/update-dependent-amenity.input';
import { CreateCompanyInput } from '@modules/company/dtos/inputs/create-company.input';
import { SocialMediaLinkInput } from '@modules/social-media/dtos/input/social-media-link.input';
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
  @IsOptional()
  @Type(() => BusinessHoursInput)
  @ValidateNested()
  businessHours?: BusinessHoursInput;

  @IsOptional()
  @IsString()
  backgroundUrl?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  telNo?: string;

  @IsOptional()
  @IsString()
  phoneNo?: string;

  @IsOptional()
  @IsString()
  viber?: string;

  @IsOptional()
  @IsString()
  whatsUp?: string;

  @IsOptional()
  @IsString()
  skype?: string;

  @IsOptional()
  @IsString()
  telegram?: string;

  @IsOptional()
  @Type(() => UpdateDependentAmenityInput)
  @ValidateNested()
  amenities?: UpdateDependentAmenityInput[];

  @IsOptional()
  @IsUUID()
  companyId?: string;

  @IsOptional()
  @Type(() => CreateCompanyInput)
  @ValidateNested()
  company?: CreateCompanyInput;

  @IsOptional()
  @Type(() => SocialMediaLinkInput)
  @ValidateNested()
  socialMedia?: SocialMediaLinkInput[];

  @IsOptional()
  @Type(() => CreateBusinessCardP13NInput)
  @ValidateNested()
  personalization?: CreateBusinessCardP13NInput;
}

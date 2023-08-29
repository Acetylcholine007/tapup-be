import { BusinessCardPersonalizationEntity } from '@entities/business-card-p13n.entity';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBusinessCardP13NInput
  implements Omit<BusinessCardPersonalizationEntity, 'id' | 'businessCard'>
{
  @IsOptional()
  @IsString()
  dayTextColor?: string;

  @IsOptional()
  @IsString()
  timeTextColor?: string;

  @IsOptional()
  @IsString()
  cardBackgroundColor?: string;

  @IsOptional()
  @IsString()
  overallBackgroundColor?: string;

  @IsOptional()
  @IsString()
  coverBackgroundColor?: string;

  @IsOptional()
  @IsString()
  borderColor?: string;

  @IsOptional()
  @IsString()
  companyTextColor?: string;

  @IsOptional()
  @IsString()
  testimonialBackgroundColor?: string;

  @IsOptional()
  @IsString()
  testimonialTextColor?: string;

  @IsOptional()
  @IsString()
  testimonialBorderRadius?: string;

  @IsOptional()
  @IsString()
  testimonialBorderColor?: string;
}

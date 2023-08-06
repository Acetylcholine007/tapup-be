import { BusinessCardPersonalizationEntity } from '@entities/business-card-p13n.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBusinessCardP13NInput
  implements Omit<BusinessCardPersonalizationEntity, 'id' | 'businessCard'>
{
  @ApiProperty()
  @IsOptional()
  @IsString()
  dayTextColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  timeTextColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardBackgroundColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  overallBackgroundColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  coverBackgroundColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  borderColor?: string;
}

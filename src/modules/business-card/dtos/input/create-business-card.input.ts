import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BusinessHoursInput } from './business-hours.input';
import { CreateBusinessCardP31NInput } from './create-business-card-p13n.input';

export class CreateBusinessCardInput {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => BusinessHoursInput)
  @ValidateNested()
  businessHours: BusinessHoursInput;

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
  @Type(() => CreateBusinessCardP31NInput)
  @ValidateNested()
  personalization?: CreateBusinessCardP31NInput;
}

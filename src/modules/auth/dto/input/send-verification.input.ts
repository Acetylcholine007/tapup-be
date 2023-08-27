import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class SendVerificationInput {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  destination?: string;
}

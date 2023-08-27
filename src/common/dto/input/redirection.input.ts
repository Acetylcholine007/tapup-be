import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class RedirectionInput {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  destination?: string;
}

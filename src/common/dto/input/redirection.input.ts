import { IsOptional, IsString, IsUrl } from 'class-validator';

export class RedirectionInput {
  @IsOptional()
  @IsString()
  @IsUrl()
  destination?: string;
}

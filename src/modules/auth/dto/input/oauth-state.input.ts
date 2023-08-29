import { IsOptional, IsString, IsUrl } from 'class-validator';

export class OAuthStateInput {
  @IsOptional()
  @IsString()
  @IsUrl()
  destination?: string;
}

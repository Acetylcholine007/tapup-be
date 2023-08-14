import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsUrl } from 'class-validator';

export class SocialMediaLinkInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  socialMediaId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  link: string;
}

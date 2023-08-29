import { IsNotEmpty, IsUUID, IsUrl } from 'class-validator';

export class SocialMediaLinkInput {
  @IsNotEmpty()
  @IsUUID()
  socialMediaId: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;
}

import { SocialMediaEntity } from '@entities/social-media.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSocialMediaInput
  implements Partial<Omit<SocialMediaEntity, 'id' | 'socialMediaMappings'>>
{
  @IsNotEmpty()
  @IsString()
  name: string;
}

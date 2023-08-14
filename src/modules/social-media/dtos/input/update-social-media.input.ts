import { SocialMediaEntity } from '@entities/social-media.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSocialMediaInput
  implements Partial<Omit<SocialMediaEntity, 'id' | 'socialMediaMappings'>>
{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

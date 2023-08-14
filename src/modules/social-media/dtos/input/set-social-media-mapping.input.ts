import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { SocialMediaLinkInput } from './social-media-link.input';

export class SetSocialMediaMappingInput {
  @ApiProperty({ type: [SocialMediaLinkInput] })
  @Type(() => SocialMediaLinkInput)
  @ValidateNested()
  links: SocialMediaLinkInput[];
}

import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { SocialMediaLinkInput } from './social-media-link.input';

export class SetSocialMediaMappingInput {
  @Type(() => SocialMediaLinkInput)
  @ValidateNested()
  links: SocialMediaLinkInput[];
}

import { BusinessCardEntity } from '@entities/business-card.entity';
import { SocialMediaMappingEntity } from '@entities/social-media-mapping.entity';
import { SocialMediaEntity } from '@entities/social-media.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMediaController } from './controllers/social-media.controller';
import { SocialMediaService } from './services/social-media.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SocialMediaEntity,
      SocialMediaMappingEntity,
      BusinessCardEntity,
    ]),
  ],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
  exports: [SocialMediaService],
})
export class SocialMediaModule {}

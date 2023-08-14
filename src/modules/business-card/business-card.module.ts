import { BusinessCardPersonalizationEntity } from '@entities/business-card-p13n.entity';
import { BusinessCardEntity } from '@entities/business-card.entity';
import { CompanyModule } from '@modules/company/company.module';
import { SocialMediaModule } from '@modules/social-media/social-media.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCardController } from './controllers/business-card.controller';
import { BusinessCardService } from './services/business-card.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BusinessCardEntity,
      BusinessCardPersonalizationEntity,
    ]),
    CompanyModule,
    SocialMediaModule,
  ],
  controllers: [BusinessCardController],
  providers: [BusinessCardService],
  exports: [BusinessCardService],
})
export class BusinessCardModule {}

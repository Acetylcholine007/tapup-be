import { BusinessCardPersonalizationEntity } from '@entities/business-card-p13n.entity';
import { BusinessCardEntity } from '@entities/business-card.entity';
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
  ],
  controllers: [BusinessCardController],
  providers: [BusinessCardService],
  exports: [BusinessCardService],
})
export class BusinessCardModule {}

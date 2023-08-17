import { AmenityPersonalizationEntity } from '@entities/amenity-p13n.entity';
import { AmenityEntity } from '@entities/amenity.entity';
import { BusinessCardEntity } from '@entities/business-card.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenityController } from './controllers/amenity.controller';
import { AmenityService } from './services/amenity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AmenityEntity,
      AmenityPersonalizationEntity,
      BusinessCardEntity,
    ]),
  ],
  controllers: [AmenityController],
  providers: [AmenityService],
  exports: [AmenityService],
})
export class AmenityModule {}

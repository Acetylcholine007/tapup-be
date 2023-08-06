import { AmenityPersonalizationEntity } from '@entities/amenity-p13n.entity';
import { AmenityEntity } from '@entities/amenity.entity';
import { BusinessCardModule } from '@modules/business-card/business-card.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenityController } from './controllers/amenity.controller';
import { AmenityService } from './services/amenity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AmenityEntity, AmenityPersonalizationEntity]),
    BusinessCardModule,
  ],
  controllers: [AmenityController],
  providers: [AmenityService],
})
export class AmenityModule {}

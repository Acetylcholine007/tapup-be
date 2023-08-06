import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AmenityPersonalizationEntity } from './amenity-p13n.entity';
import { BusinessCardEntity } from './business-card.entity';

@Entity('amenity')
export class AmenityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  cardPhoto?: string;

  @ManyToOne(
    () => BusinessCardEntity,
    (businessCard) => businessCard.amenities,
    {
      onDelete: 'CASCADE',
    }
  )
  businessCard: BusinessCardEntity;

  @OneToOne(
    () => AmenityPersonalizationEntity,
    (personalization) => personalization.amenity,
    {
      cascade: true,
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn()
  personalization?: AmenityPersonalizationEntity;
}

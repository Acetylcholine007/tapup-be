import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AmenityEntity } from './amenity.entity';

@Entity('amenity_p13n')
export class AmenityPersonalizationEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  primaryBackgroundColor?: string;

  @Column({ nullable: true })
  secondaryBackgroundColor?: string;

  @Column({ nullable: true })
  primaryTextColor?: string;

  @Column({ nullable: true })
  secondaryTextColor?: string;

  @Column({ nullable: true })
  borderColor?: string;

  @Column({ nullable: true })
  borderRadius?: string;

  @OneToOne(() => AmenityEntity, (amenity) => amenity.personalization)
  amenity: AmenityEntity;
}

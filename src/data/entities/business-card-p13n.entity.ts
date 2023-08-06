import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessCardEntity } from './business-card.entity';

@Entity('business_card_p13n')
export class BusinessCardPersonalizationEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  dayTextColor?: string;

  @Column({ nullable: true })
  timeTextColor?: string;

  @Column({ nullable: true })
  cardBackgroundColor?: string;

  @Column({ nullable: true })
  overallBackgroundColor?: string;

  @Column({ nullable: true })
  coverBackgroundColor?: string;

  @Column({ nullable: true })
  borderRadius?: string;

  @Column({ nullable: true })
  borderColor?: string;

  @OneToOne(
    () => BusinessCardEntity,
    (businessCard) => businessCard.personalization
  )
  businessCard: BusinessCardEntity;
}
